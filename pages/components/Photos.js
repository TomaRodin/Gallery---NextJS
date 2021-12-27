import React from "react"
import styles from './style.module.css'
import axios from 'axios'

export default function Photos(props) {

    function DeleteRequest() {
        console.log(props.data.id)
        
        const options = {
            mode: 'cors',
            params: {"id":  props.data.id}
        }

        axios.delete('http://localhost:3001/', options)
        .then(response => {
            if (response.data.success === true) {
                props.resend(true)
            }
            else {
                console.log({success:false})
            }
        })
    }

    return (
        <div className={styles.container} >
            <br />
            <img className={styles.photo} src={props.data.Link} width="60%" height="auto"></img>
            <br />
            <h1>{props.data.Title}</h1>
            <div className={styles.buttonContainer}>
                <button className={styles.openImageButton}>Open Image</button>
                <br />
                <button className={styles.deleteButton} onClick={DeleteRequest} >Delete</button> 
            </div>

        </div>
    )
}