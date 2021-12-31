import React from "react"
import styles from './style.module.css'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react'

export default function Photos(props) {

    const newNameInput = useRef();

    function DeleteRequest() {

        const options = {
            mode: 'cors',
            params: { "id": props.data.id }
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

    function openIamge() {
        props.setIsOpen(<div onClick={closeImage} className={styles.imageContainer} >
            <img className={styles.imageContainerInner} src={"http://localhost:3001/image/"+props.data.Link} width="80%" height="auto"></img>
        </div>)
    }

    function closeImage() {
        props.setIsOpen(<div></div>)
    }

    function SubmitEdit() {
        console.log(newNameInput.current.value)
        const data = {
            "NewTitle": newNameInput.current.value,
            "id": props.data.id
        }

        const options = {
            mode: 'cors',
            data: data
        }

        axios.put('http://localhost:3001/', options)
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

    return (
        <div className={styles.container} >
            <br />
            <img className={styles.photo} src={"http://localhost:3001/image/"+props.data.Link} width="60%" height="auto"></img>
            <br />
            <h1>{props.data.Title}</h1>
            <div className={styles.buttonContainer}>
                <button onClick={openIamge} className={styles.openImageButton}>Open Image</button>
                <br />
                <button className={styles.openImageButton} onClick={Rename} >Rename</button>
                <br></br>
                <button className={styles.deleteButton} onClick={DeleteRequest} >Delete</button>
            </div>
        </div>
    )
}