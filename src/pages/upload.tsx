import { NextPage } from "next";
import Router from "next/router";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Title from "../components/title";
import { UploadPageProps } from "../types";

const Upload: NextPage<UploadPageProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>();
  const [hashTags, setHashTags] = useState("");
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState("");
  const [isUploading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getHashTagList = () => {
    const hashTagList = hashTags.split(",").map((hashTag) => {
      const hashTagStartsWithHash = hashTag.trim().startsWith("#");
      const trimmedHashTag = hashTag.trim();
      if (hashTagStartsWithHash) {
        return trimmedHashTag;
      } else {
        return "#" + trimmedHashTag;
      }
    });
    return hashTagList;
  };

  const uploadPhoto = async (uploadUrl: string) => {
    const form = new FormData();
    form.append("file", file);
    await fetch(uploadUrl, {
      method: "POST",
      body: form,
    });
  };
  const uploadPost = async (id: string) => {
    const hashTagList = getHashTagList();
    await fetch("/api/upload-post", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        hashTagList,
        id,
      }),
    });
  };
  const goHome = () => Router.push("/");
  const handleUpload: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (previewPhotoUrl === "") {
      return setErrorMessage("Please Select a Photo.");
    }
    setIsLoading(true);
    const { uploadURL, id } = await (await fetch("/api/upload-url")).json();
    await uploadPhoto(uploadURL);
    await uploadPost(id);
    await goHome();
    setIsLoading(false);
  };
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setTitle(event.target.value);
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setDescription(event.target.value);
  const handlePhotoChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const previewUrl = URL.createObjectURL(files[0]);
      setPreviewPhotoUrl(previewUrl);
      setFile(files[0]);
      setErrorMessage("");
    }
  };
  const handleHashTagsChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setHashTags(event.target.value);
  return (
    <div>
      <Title title="Upload" />
      <form
        className={previewPhotoUrl === "" ? "form mt-60" : "form mt-20"}
        onSubmit={handleUpload}
      >
        {previewPhotoUrl !== "" ? <img src={previewPhotoUrl} className="mx-3 rounded"></img> : null}
        {errorMessage !== "" ? <span className="error">{errorMessage}</span> : null}
        <input
          type="text"
          placeholder="Title."
          className="input"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea
          placeholder="Description."
          className="input resize-none h-40"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <input
          type="text"
          placeholder="Hashtags. (Separated by a comma.)"
          className="input"
          value={hashTags}
          onChange={handleHashTagsChange}
        />
        <label htmlFor="photo" className="input">
          Click here to choose a photo.
        </label>
        <input type="file" id="photo" className="fileInput" onChange={handlePhotoChange} />
        <button type="submit" className="continue-button">
          {isUploading ? (
            <div className="h-5 m-auto flex flex-row justify-center">
              <div>
                <div className="w-5 h-5 rounded-lg bg-white animate-ping absolute"></div>
                <div className="w-5 h-5 rounded-lg bg-white relative opacity-20"></div>
              </div>
              <span className="ml-3">Uploading...</span>
            </div>
          ) : (
            <span>Upload</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Upload;
