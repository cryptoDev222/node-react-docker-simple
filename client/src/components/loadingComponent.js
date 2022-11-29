'use Strict';
import React from 'react'
import styles from './loadingComponent.module.css'
import logo from '../logo.svg'

const LoadingComponent = () => {
  const [LoadingText, setText] = React.useState('.')

  const anim = () => {
    if(LoadingText.length > 2)
      setText('.')
    else
      setText(LoadingText + '.')
  }

  let animInter = setInterval(anim, 600)

  React.useEffect(() => {
    return () => {
      clearInterval(animInter)
    }
  })

  return (
    <div className={styles.container}>
      <img src={logo} className="App-logo" alt="logo" style={{height: "90px"}} />
      <h2>Loading{LoadingText}</h2>
    </div>
  )
}

export default LoadingComponent