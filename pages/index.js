import styles from './components/style.module.css'
import Add from './components/Add'
import Photos from './components/Photos'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {

  const [array, setArray] = useState([]);
  const [req, setReq] = useState(false);
  const [isopen, setIsOpen] = useState(<div></div>);

  useEffect(() => {
    const authUsername = 'admin'
    const authPassword = 'admin123'
  
    const token = Buffer.from(`${authUsername}:${authPassword}`, 'utf8').toString('base64')

    const options = {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${token}`},
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
      <div className={styles.photosContainer}>
        {array.map(photos => {
          return (

            <Photos setIsOpen={setIsOpen} resend={setReq} data={photos} />

          )
        })}
      </div>


      <div>
        {isopen}
      </div>
    </div>
  )
}
