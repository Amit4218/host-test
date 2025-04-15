import axios from "axios";

const sendData = async (url) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URI}/gemenai?url=${url}`
    );

    console.log(res);

    console.log("Data sent successful");
  } catch (error) {
    console.log("Error sending data", error);
  }
};

export default sendData;
