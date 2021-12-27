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
            <input placeholder="Header:" ref={header} />
            <input placeholder="Link:" ref={link} />
            <button onClick={Send} >Add</button>
        </div>
    )
}