import React from "react"
import styles from './style.module.css'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react'


export default function Photos(props) {

    const newNameInput = useRef();
    const [Dropdown, setDropdown]  = useState("");

    function DeleteRequest() {

        const authUsername = 'admin'
        const authPassword = 'admin123'
      
        const token = Buffer.from(`${authUsername}:${authPassword}`, 'utf8').toString('base64')

        const options = {
            mode: 'cors',
            params: { "id": props.data.id },
            headers: {"Authorization": `Basic ${token}`}
        }

        axios.delete('http://localhost:3001/', options)
            .then(response => {
                if (response.data.success === true) {
                    props.resend(true)
                }
                else {
                    console.log({ success: false })
                }
            })
    }

    function openImage() {
        props.setIsOpen(<div onClick={closeImage} className={styles.imageContainer} >
            <img className={styles.imageContainerInner} src={"http://localhost:3001/image/"+props.data.Link} width="80%" height="auto"></img>
        </div>)
    }

    function closeImage() {
        props.setIsOpen(<div></div>)
    }

    function SubmitEdit() {
        const authUsername = 'admin'
        const authPassword = 'admin123'
      
        const token = Buffer.from(`${authUsername}:${authPassword}`, 'utf8').toString('base64')


        console.log(newNameInput.current.value)

        class PutData {
            constructor(NewTitle, id) {
                this.NewTitle = NewTitle;
                this.id = id
            }
        }

        const data = new PutData(newNameInput.current.value, props.data.id);

        const options = {
            mode: 'cors',
            headers: {"Authorization": `Basic ${token}`}
        }

        axios.put('http://localhost:3001/',data ,options)
        .then (response => {
            if (response.data.success === true) {
                closeImage();
                props.resend(true);
            }
            else {
                alert("ERROR: Can't rename image")
            }
        })

    }

    function Rename() {
        props.setIsOpen(<div  className={styles.imageContainer} >
            <div className={styles.menuContainer} >
                <h3>Enter a new title:</h3>
                <input ref={newNameInput} ></input>
                <button onClick={SubmitEdit}>Rename</button>
                <button onClick={closeImage}>Close</button>
            </div>
        </div>)
    }

    function Download() {
        const url = `http://localhost:3001/download/${props.data.Link}`
        
        window.open(url, '_blank').focus();
    }

    function handleDropdown() {
        if (Dropdown === "") {
            setDropdown(<div>
                <button className={styles.DropdownButton} onClick={Share} >Share</button>
                <button className={styles.DropdownButton} onClick={Download} >Download</button>
            </div>)
        }
        else {
            setDropdown("")
        }
    }

    function Share() {
        const link = "http://localhost:3001/image/"+props.data.Link
        navigator.clipboard.writeText(link);
        setDropdown("")
    }

    return (
        <div className={styles.container} >
            <br />
            <p className={styles.date}>{props.data.Date}</p>
            <img className={styles.photo} src={"http://localhost:3001/image/"+props.data.Link} width="60%" height="auto"></img>
            <br />
            <h1>{props.data.Title}</h1>
            <div className={styles.buttonContainer}>
                <button onClick={openImage} className={styles.openImageButton}>Open Image</button>
                <br />
                <button className={styles.openImageButton} onClick={Rename} >Rename</button>
                <br></br>
                <br />
                <button className={styles.deleteButton} onClick={DeleteRequest} >Delete</button>
                <button className={styles.openImageButton} onClick={handleDropdown}>More</button>
                {Dropdown}  
            </div>
        </div>
    )
}