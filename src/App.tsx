import React, { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { dummyGet, dummyPost } from "./api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function App() {
  const [fileToUploadName, setFileToUploadName] = useState<string>("");
  const [selectedFileToUpload, setSelectedFileToUpload] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [fileToRetriveName, setFileToRetrieveName] = useState<string>("");

  // check si il y a toutes les infos necessaires
  const isFormComplete: boolean =
    fileToUploadName !== "" && selectedFileToUpload !== "";

  const handleSubmit = () => {
    if (isFormComplete) {
      dummyPost({ name: fileToUploadName, file: selectedFileToUpload });
    }
  };

  const handleNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFileToUploadName(e.target.value);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      let uploadedFile = fileList[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        setSelectedFileToUpload(reader.result);
        setSelectedFileName(uploadedFile.name);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleFileToRetrieveChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFileToRetrieveName(e.target.value);

  const handleFileRetriveSubmit = () => {
    if (fileToRetriveName) {
      dummyGet(fileToUploadName);
    }
  };

  return (
    <div className="App">
      <h1>Transcript this !</h1>
      <div className={"forms"}>
        <div className={"upload-form"}>
          <h2>Upload that file ! :D</h2>
          <div className={"name-field"}>
            <TextField
              label={"Nom"}
              variant={"standard"}
              value={fileToUploadName}
              onChange={handleNameFieldChange}
            />
          </div>
          <div className={"fileupload"}>
            <Button
              component={"label"}
              role={undefined}
              variant={"contained"}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type={"file"} onChange={handleFileChange} />
            </Button>
          </div>
          {selectedFileName && (
            <div>
              <b>{selectedFileName}</b> is ready to be uploaded !
            </div>
          )}
          <div className={"submit-btn"}>
            <Button
              variant={"contained"}
              onClick={handleSubmit}
              disabled={!isFormComplete}
            >
              Let's gooooo !
            </Button>
          </div>
        </div>
        <div className="retrieve-form">
          <h2>Retrieve that file ! :D</h2>
          <TextField
            label={"File to retrieve"}
            variant={"standard"}
            value={fileToRetriveName}
            onChange={handleFileToRetrieveChange}
          />
          <Button
            variant={"outlined"}
            disabled={fileToRetriveName === ""}
            onClick={handleFileRetriveSubmit}
          >
            GO !
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
