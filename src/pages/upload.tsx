import { NextPage } from "next";
import { useState } from "react";
import Title from "../components/title";

const Upload: NextPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleUpload = () => {
    fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
    });
  };
  const handleTitleChange = (event: any) => setTitle(event.target.value);
  const handleDescriptionChange = (event: any) => setDescription(event.target.value);
  return (
    <div>
      <Title title="Upload" />
      <form className="form" onSubmit={handleUpload}>
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
