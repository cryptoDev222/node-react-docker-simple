import React from 'react'
import styles from './footer.module.css'

const Footer = () => {

  let currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate())

  const [myDate, setDate] = React.useState(currentDate)

  const dateCheck = () => {
    currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate())
    setDate(currentDate)
  }

  setInterval(dateCheck, 60000)

  return (
    <div className={styles.footer}>
      <h1>{myDate}</h1>
      <p>Built with React.JS</p>
    </div>
  )
}

export default Footer