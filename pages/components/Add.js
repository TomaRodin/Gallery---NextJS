import styles from './style.module.css'
import {useRef} from 'react'

export default function Add(props) {

    const header = useRef();
    const link = useRef();

    function Send() {

        const data = {
            "Title": header.current.value,
            "Link": link.current.value
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
            mode: 'cors'
        }

        fetch('http://localhost:3001/add', options)
        
        props.resend(true)
    } 

    return (
        <div>
            <input className={styles.inputAdd} placeholder="Header:" ref={header} />
            <input className={styles.inputAdd} placeholder="Link:" ref={link} />
            <br />
            <button className={styles.buttonAdd} onClick={Send} >Add</button>
        </div>
    )
}