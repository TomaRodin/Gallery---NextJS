import React from "react"
import styles from './style.module.css'
import axios from 'axios'

export default function Photos(props) {

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
            <img className={styles.imageContainerInner} src={props.data.Link} width="80%" height="auto"></img>
        </div>)
    }

    function closeImage() {
        props.setIsOpen(<div></div>)
    }

    return (
        <div className={styles.container} >
            <br />
            <img className={styles.photo} src={props.data.Link} width="60%" height="auto"></img>
            <br />
            <h1>{props.data.Title}</h1>
            <div className={styles.buttonContainer}>
                <button onClick={openIamge} className={styles.openImageButton}>Open Image</button>
                <br />
                <button className={styles.deleteButton} onClick={DeleteRequest} >Delete</button>
            </div>
        </div>
    )
}