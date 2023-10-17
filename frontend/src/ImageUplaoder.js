import axios from "axios";
import React, { useState } from "react";

function ImageToBase64Converter() {
  const [base64Image, setBase64Image] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // Extract the Base64 data
        setBase64Image(base64);

        axios.post("http://localhost:3006/add", base64).then((response) => {
          console.log("base64submitHandler->", response);
          // alert(response?.data);
          setResponseStatus(response?.data);
        });
      };

      reader.readAsDataURL(file);
    }
  };
  console.log("SamBase64--->", base64Image,responseStatus);
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {base64Image && (
        <img src={`data:image/jpeg;base64,${base64Image}`} alt="Base64 Image" />
      )}
    </div>
  );
}

export default ImageToBase64Converter;
