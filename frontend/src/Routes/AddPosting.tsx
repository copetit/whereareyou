import React from 'react';
import { uploadFiles } from '../Api';

function AddPosting() {
  let fileOne: File;
  let fileTwo: File;
  let fileThree: File;
  let fileFour: File;
  let fileFive: File;

  const fileOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileOne = event.currentTarget.files[0]);
  };
  const fileTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileTwo = event.currentTarget.files[0]);
  };
  const fileThreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileThree = event.currentTarget.files[0]);
  };
  const fileFourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileFour = event.currentTarget.files[0]);
  };
  const fileFiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileFive = event.currentTarget.files[0]);
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
      <input type="file" onChange={(event) => fileOneChange(event)}></input>
      <input type="file" onChange={(event) => fileTwoChange(event)}></input>
      <input type="file" onChange={(event) => fileThreeChange(event)}></input>
      <input type="file" onChange={(event) => fileFourChange(event)}></input>
      <input type="file" onChange={(event) => fileFiveChange(event)}></input>
      <button
        className="btn btn-blue"
        type="submit"
        onClick={() => submitFiles()}
      >
        Upload Files
      </button>
    </div>
  );
}

export default AddPosting;
