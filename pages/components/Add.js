import styles from './style.module.css'
import { useRef } from 'react'
import React from 'react'
import {useState} from 'react'
import axios from 'axios'


const Form = (props) => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [header, setHeader] = useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', header)

      const authUsername = 'admin'
      const authPassword = 'admin123'
    
      const token = Buffer.from(`${authUsername}:${authPassword}`, 'utf8').toString('base64')

      try {
        const response =  axios({
          method: "post",
          mode: 'cors',
          url: "http://localhost:3001/add",
          data: formData,
          headers: { "Content-Type": "multipart/form-data", "Authorization": `Basic ${token}` },
        });
      } catch(error) {
        console.log(error)
      }
      document.getElementById('form').reset();
      props.resend(true)
    }
  
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
    }

    const handleChange = (event) => {
        setHeader(event.target.value)
    }
  
    return (
      <form id="form" onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Title:" ></input>
        <input type="file" name="upload_file" onChange={handleFileSelect} accept="image/png, image/gif, image/jpeg" />
        <input type="submit" value="Upload File" />
      </form>
    )
  };
  
  export default Form;