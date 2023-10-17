import logo from "./logo.svg";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageToBase64Converter from "./ImageUplaoder";

function App() {
  const [allPeople, setAllPEople] = useState([]);
  const [responseStatus, setResponseStatus] = useState(null);
  const [person, setPerson] = useState({
    FirstName: "",
    LastName: "",
    Image: "",
  });
  const [base64Image, setBase64Image] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgresponseStatus, setImgResponseStatus] = useState(null);

  const onChangeHandler = (eve) => {
    const { id, value } = eve?.target;
    setPerson({
      ...person,
      [id]: value,
    });
  };
  const submitHandler = () => {
    axios.post("http://localhost:3006/add", person).then((response) => {
      console.log("submitHandler->", response);
      // alert(response?.data);
      setResponseStatus(response?.data);
    });
  };
  const deleteHandler = async () => {
    console.log("SamssssPerson--->", person);
    axios
      .delete(`http://localhost:3006/delete`, { data: person })
      .then((response) => {
        console.log("editHandlerResp->", response);
        // alert(response?.data);
        setResponseStatus(response?.data);
      });
  };
  const updateHandler = async () => {
    console.log("SamssssPerson--->", person);
    axios.put(`http://localhost:3006/update`, person).then((response) => {
      console.log("editHandlerResp->", response);
      // alert(response?.data);
      setResponseStatus(response?.data);
    });
  };
  useEffect(() => {
    axios.get("http://localhost:3006/").then(function (response) {
      // handle success
      console.log("response", response.data);
      setAllPEople(response.data);
    });
  }, [responseStatus]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // Extract the Base64 data
        setPerson({ ...person, Image: base64 });
        // axios.post("http://localhost:3006/add", base64).then((response) => {
        //   console.log("base64submitHandler->", response);
        //   // alert(response?.data);
        //   setImgResponseStatus(response?.data);

        // });
      };

      reader.readAsDataURL(file);
    }
  };
  const createTable = () => {
    const TBLData = {
      TableName: "Sample4",
    };
    axios.post("http://localhost:3006/create", TBLData).then((response) => {
      console.log("submitHandler->", response);
      // alert(response?.data);
      setResponseStatus(response?.data);
    });
  };

  const newtableData = () => {
    const TBLData = {
      TableName: "Sample2",
      FirstName: "Govind2222",
      LastName: "V",
      Image: "Sam",
    };
    axios
      .post("http://localhost:3006/newtable/add", person)
      .then((response) => {
        console.log("submitHandler->", response);
        // alert(response?.data);
        setResponseStatus(response?.data);
      });
  };
  const sam = () => {
    const TBLData = {
      TableName: "Samsss",
      Fields: [
        "FirstName varchar(255)",
        "LastNameSSS varchar(255)",
        "Image varchar(max)",
      ],
    };
    axios.post("http://localhost:3006/sam", TBLData).then((response) => {
      console.log("submitHandler->", response);
      // alert(response?.data);
      setResponseStatus(response?.data);
    });
  };
  console.log("person", person);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {responseStatus && <div>{responseStatus}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <TextField
          className="mui_textBox"
          id="FirstName"
          label="FirstName"
          variant="standard"
          value={person.FirstName}
          onChange={(eve) => onChangeHandler(eve)}
        />
        <TextField
          className="mui_textBox"
          id="LastName"
          label="LastName"
          variant="standard"
          value={person.LastName}
          onChange={(eve) => onChangeHandler(eve)}
        />
      </div>
      <div>
        <Button variant="contained" onClick={() => submitHandler()}>
          ADD
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={() => updateHandler()}>
          Update
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={() => deleteHandler()}>
          Delete
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={() => deleteHandler()}>
          Upload a image{" "}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="Samsss"
          />
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={() => createTable()}>
          Create Table in DB newtableData
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={() => newtableData()}>
          NewtableData
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={() => sam()}>
          Sam
        </Button>
      </div>
      <div>
        {allPeople &&
          allPeople.map((people, index) => {
            return (
              <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                {index + 1} <div>{people?.FirstName}</div>
                <div>{people?.LastName}</div>
                {people?.Image && (
                  <img
                    src={`data:image/jpeg;base64,${people?.Image}`}
                    alt="Base64 Image"
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
