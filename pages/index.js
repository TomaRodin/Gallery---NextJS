import styles from '../styles/Home.module.css'
import Add from './components/Add'
import Photos from './components/Photos'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Home() {

  const [array, setArray] = useState([]);

  useEffect(() =>{
    const options = {
      headers: {'Content-Type': 'application/json'},
      mode: 'cors'
  }

  axios.get('http://localhost:3001/', options)
  .then((response) => {
    console.log(response)
    setArray(response.data)
  })
  }, []);

  return (
    <div>
      <h1>Gallery:</h1>
      <Add />
    
      {array.map(photos => {
        return (
        <Photos data={photos} />
        )
      })}
    </div>
  )
}
