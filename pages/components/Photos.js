import React from "react"
import styles from './style.module.css'

export default function Photos(props) {
    return (
        
        <div className={styles.container} >
            <br />
            <img className={styles.photo} src={props.data.Link} width="400px" height="auto"></img>
            <br />
            <h1>{props.data.Title}</h1>
            <a href={props.data.Link}>Open Image</a>
        </div>
    )
}