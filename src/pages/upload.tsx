import { NextPage } from "next";
import { FormEvent, FormEventHandler } from "react";

const Upload: NextPage = () => {
  const handleUpload: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    const form: EventTarget = event.target;
    const titleInput: HTMLInputElement = form.children[0];
    const descriptionInput: HTMLInputElement = form.children[1];
    const title: string = titleInput.value;
    const description: string = descriptionInput.value;
  };
  return (
    <div>
      <form onSubmit={handleUpload} className="flex flex-col w-3/6">
        <input
          type="text"
          placeholder="Title"
          className="bg-black text-white focus:outline-none m-5 p-5"
        />
        <textarea
          placeholder="Description"
          className="h-80 resize-none bg-black text-white focus:outline-none m-5 p-5"
        />
        <input
          type="submit"
          value="Upload"
          className="bg-black text-white cursor-pointer m-5 p-5"
        />
      </form>
    </div>
  );
};

export default Upload;
