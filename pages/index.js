import styles from '../styles/Home.module.css'
import Add from './components/Add'
import Photos from './components/Photos'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Home() {

  const [array, setArray] = useState([]);
  const [req, setReq] = useState(false)

  useEffect(() =>{
    const options = {
      headers: {'Content-Type': 'application/json'},
      mode: 'cors'
  }

  axios.get('http://localhost:3001/', options)
  .then((response) => {
    console.log(response.data)
    setArray(response.data.reverse())
    setReq(false)
  })
  }, [req]);

  return (
    <div>
      <h1>Gallery:</h1>
      <Add resend={setReq} />
    
      {array.map(photos => {
        return (
        <Photos resend={setReq} data={photos} />
        )
      })}
    </div>
  )
}
