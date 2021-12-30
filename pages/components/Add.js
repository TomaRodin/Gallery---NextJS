import styles from './style.module.css'
import { useRef } from 'react'
import React from 'react'
import {useState} from 'react'
import axios from 'axios'


const Form = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [header, setHeader] = useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', header)
      try {
        const response =  axios({
          method: "post",
          mode: 'cors',
          url: "http://localhost:3001/add",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch(error) {
        console.log(error)
      }
    }
  
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
    }

    const handleChange = (event) => {
        setHeader(event.target.value)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} ></input>
        <input type="file" name="upload_file" onChange={handleFileSelect}/>
        <input type="submit" value="Upload File" />
      </form>
    )
  };
  
  export default Form;