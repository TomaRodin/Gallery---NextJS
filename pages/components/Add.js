import styles from './style.module.css'
import { useRef, useState} from 'react'
import axios from 'axios'

export default function Add(props) {

    const header = useRef();
    const link = useRef();
    const [isSuccess, setIsSuccess] = useState()

    function Send() {

        const data = {
            "Title": header.current.value,
            "Link": link.current.value
        }

        const options = {
            Title: header.current.value,
            Link: link.current.value,
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        }

        axios.post('http://localhost:3001/add', options)
        .then(response => {
            if (response.data.success === false) {
                setIsSuccess(<h3>ERROR: Can't upload image</h3>)
            }
            else if (response.data.success === true) {
                props.resend(true)
            }
        })
    }

    return (
        <div>
            <input className={styles.inputAdd} placeholder="Header:" ref={header} />
            <input className={styles.inputAdd} placeholder="Link:" ref={link} />
            <br />
            <button className={styles.buttonAdd} onClick={Send} >Add</button>
            {isSuccess}
        </div>
    )
}