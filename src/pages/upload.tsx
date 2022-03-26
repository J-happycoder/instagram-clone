import { NextPage } from "next";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Title from "../components/title";

const Upload: NextPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const uploadPost: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
    });
  };
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setTitle(event.target.value);
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    setDescription(event.target.value);
  return (
    <div>
      <Title title="Upload" />
      <form className="form" onSubmit={uploadPost}>
        <input
          type="text"
          placeholder="Title."
          className="input"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Description."
          className="input resize-none h-40"
          value={description}
          onChange={handleDescriptionChange}
        />
        <input type="submit" value="Upload" className="continue-button" />
      </form>
    </div>
  );
};

export default Upload;
