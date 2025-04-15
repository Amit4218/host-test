import axios from "axios";
import React, { useEffect, useState } from "react";

function Info() {
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URI}/info`);
        // console.log(res.data);
        setCardInfo(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const download = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URI}/download`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "contacts.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-900 text-white p-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold font-mono mt-6">Images Info</h1>
          <hr className="mt-4 border-purple-500 w-1/4 mx-auto" />
        </header>

        <div className="flex justify-start mt-6 space-x-4">
          <a
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Uploads
          </a>
          <a
            onClick={download}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Download all
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardInfo.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 border border-purple-500 rounded-lg p-4 shadow-lg"
            >
              <div className="h-40 w-full overflow-hidden rounded-md mb-3">
                <img
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {user.designation}
                </p>
                <p>
                  <span className="font-semibold">Company:</span>{" "}
                  {user.companyName}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {user.address}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-semibold">Website:</span> {user.website}
                </p>
                <div>
                  <span className="font-semibold">Phone No:</span>
                  <ul className="list-disc list-inside pl-4">
                    {user.phoneNumbers.map((phone, index) => (
                      <li key={index}>{phone}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Info;
