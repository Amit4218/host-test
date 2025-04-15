import sendData from "./api";

const Upload = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  data.append("cloud name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
    const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_UPLOAD_URL, {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    // console.log("Uploaded Image URL:", result.secure_url);

    const url = result.url;
    // console.log(url);

    sendData(url);
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

export default Upload;
