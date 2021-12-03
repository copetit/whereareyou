import React from 'react';
import { uploadFiles } from '../Api';

function AddPosting() {
  let fileOne: File;
  let fileTwo: File;
  let fileThree: File;
  let fileFour: File;
  let fileFive: File;

  const fileOneChange = (event: any) => {
    fileOne = event.target.files[0];
  };
  const fileTwoChange = (event: any) => {
    fileTwo = event.target.files[0];
  };
  const fileThreeChange = (event: any) => {
    fileThree = event.target.files[0];
  };
  const fileFourChange = (event: any) => {
    fileFour = event.target.files[0];
  };
  const fileFiveChange = (event: any) => {
    fileFive = event.target.files[0];
  };

  async function submitFiles() {
    let data = new FormData();
    data.append('files', fileOne);
    data.append('files', fileTwo);
    data.append('files', fileThree);
    data.append('files', fileFour);
    data.append('files', fileFive);
    try {
      await uploadFiles(data).then((res) => console.log('Uploaded Files !'));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/mvp.css"></link>
      <input type="file" onChange={(event) => fileOneChange(event)}></input>
      <input type="file" onChange={(event) => fileTwoChange(event)}></input>
      <input type="file" onChange={(event) => fileThreeChange(event)}></input>
      <input type="file" onChange={(event) => fileFourChange(event)}></input>
      <input type="file" onChange={(event) => fileFiveChange(event)}></input>
      <button type="submit" onClick={() => submitFiles()}>
        Upload Files
      </button>
    </div>
  );
}

export default AddPosting;
