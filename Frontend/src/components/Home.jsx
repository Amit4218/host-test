import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Upload from "../utils/Upload";

function Home() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) return;

    Upload(image);

    fileInputRef.current.value = "";
    setImage(null);
  };

  const notify = () => {
    toast("Uploaded successfully");
  };

  return (
    <>
      <div className="mt-10 text-center text-4xl font-mono font-semibold">
        <h1>Upload Images</h1>
        <hr className="mt-3 border-purple-500 w-1/4 mx-auto" />
      </div>

      <div className="absolute z-10 -mt-10 ml-10">
        <a
          href="/info"
          className="bg-blue-500 px-4 py-2 rounded-sm hover:bg-blue-600 transition"
        >
          Info List
        </a>
      </div>

      <div className="flex justify-center mt-16 px-4">
        <form
          onSubmit={submitHandler}
          className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-xl"
        >
          <label
            htmlFor="multiple_files"
            className="block text-lg font-medium text-white mb-3"
          >
            Upload Image
          </label>

          <input
            id="multiple_files"
            name="image"
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
            ref={fileInputRef}
            className="block w-full text-sm text-white border border-gray-500 rounded-lg cursor-pointer bg-zinc-700 focus:outline-none hover:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition"
          />

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition"
              onClick={notify}
            >
              Submit
            </button>
            <ToastContainer autoClose={1000} theme="dark" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Home;
