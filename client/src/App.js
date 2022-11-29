import React, { Component } from 'react'

import './App.scss'

import LoadingComponent from './components/loadingComponent'
import Header from './components/header'
import Footer from './components/footer'
import Card from './components/card'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loadingComponent: (<LoadingComponent />),
      activeTab: 'experience',
      currentData: { message: "Hello World!" },
    }
  }

  componentDidMount() {
    this.callApi(this.state.activeTab)
      .then(res => this.setState({ currentData: res }))
      .catch(console.error)

    const self = this
    setTimeout(() => self.setState({ loadingComponent: <></> }), 3000)
  }

  callApi = async (url) => {
    const resp = await fetch('/' + url)

    window._resp = resp

    let text = await resp.text()

    let data = null
    try {
      data = JSON.parse(text) // cannot call both .json and .text - await resp.json()
      this.setState({ currentData: data })
    } catch (e) {
      console.log(`Invalid json\n${e}`)
    }

    if (resp.status !== 200) {
      throw Error(data ? data.message : 'No data')
    }

    return data
  }

  handleClick = (path) => {
    this.setState({ activeTab: path })
    this.callApi(path)
  }

  render() {

    const getSkills = (cData) => {
      return cData.skills.map((data, key) => {
        return <li key={key}>{data}</li>
      })
    }

    const getContent = (data) => {
      let cData = data
      if (this.state.activeTab === 'experience') {
        content = (
          <>
            <h2>{cData.dateFrom + " ~ " + cData.dateTo}</h2>
            <h2>{cData.company}</h2>
            <h2>{cData.role}</h2>
            <p style={{wordBreak: 'break-word', whiteSpace: 'break-spaces'}}>{cData.description}</p>
          </>
        )
      }
      else {
        content = (
          <>
            <h2>{cData.yearFrom + " ~ " + cData.yearTo}</h2>
            <h2>{cData.school}</h2>
            <h2>{cData.role}</h2>
            {typeof cData.skills === 'object' ? <ul className="skills">{getSkills(cData)}</ul> : cData.skills}
          </>
        )
      }
      return content
    }

    const getAllCards = () => {
      let cData = this.state.currentData
      if(typeof cData == 'object' && cData.hasOwnProperty('length'))
        return cData.map((data, key) => {
          return (<Card key={key}>{getContent(data)}</Card>)
        })
      else return (<Card>{getContent(cData)}</Card>)
    }

    const getNumber = () => {
      return (
        <>
          <h1 className="numberShow">{this.state.currentData.num}</h1>
          <button onClick={() => this.callApi('randomnumber')} className="mybtn">Reload</button>
        </>
      )
    }

    let content = ""
    if (this.state.activeTab === "experience" || this.state.activeTab === "education") {
      content = (getAllCards())
    } else {
      content = getNumber()
    }

    return (
      <div className="App">
        {this.state.loadingComponent}
        <Header />
        <div className="container">
          <ul className="myTab">
            <li
              className={this.state.activeTab === "experience" ? "active" : ""}
              onClick={() => this.handleClick("experience")}
            >
              Experience
            </li>
            <li
              className={this.state.activeTab === "education" ? "active" : ""}
              onClick={() => this.handleClick("education")}
            >
              Education
            </li>
            <li
              className={this.state.activeTab === "randomnumber" ? "active" : ""}
              onClick={() => this.handleClick("randomnumber")}
            >
              Random Number
            </li>
          </ul>
          <div className="contentWrapper">
            {content}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
