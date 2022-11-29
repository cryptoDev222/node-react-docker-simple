'use strict'

const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3600
const HOST = '0.0.0.0'

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build')

// redis initialize
const redis = require('redis')
const redisClient = redis.createClient(6379, 'redis')
redisClient.on("error", function (err) {
  console.log(" Error " + err)
})
redisClient.on("connection", function () {
  console.log("Successfully Connected!!")
})

redisClient.set("experience", JSON.stringify([
  {
  dateFrom: "2018.05.01",
  dateTo: "2018.07.14",
  company: "Freelancer",
  role: "Junior Developer",
  description: `I am a full stack developer with 10 years of web development and 8 years of Mobile development.
    I previously worked as a full-stack web and mobile developer for 7 years for a pharmaceutical company and restructured 
    their website into an up-to-code modern online encyclopedia.`
  },
  {
    dateFrom: "2018.05.01",
    dateTo: "2018.07.14",
    company: "Freelancer",
    role: "Junior Developer",
    description: `I am a full stack developer with 10 years of web development and 8 years of Mobile development.
      I previously worked as a full-stack web and mobile developer for 7 years for a pharmaceutical company and restructured 
      their website into an up-to-code modern online encyclopedia.`
    },
    {
      dateFrom: "2018.05.01",
      dateTo: "2018.07.14",
      company: "Freelancer",
      role: "Junior Developer",
      description: `I am a full stack developer with 10 years of web development and 8 years of Mobile development.
        I previously worked as a full-stack web and mobile developer for 7 years for a pharmaceutical company and restructured 
        their website into an up-to-code modern online encyclopedia.`
    }
]))

redisClient.set("education", JSON.stringify([
  {
  yearFrom: "2015",
  yearTo: "2017",
  school: "Kyoto University",
  skills: [
    "Web development",
    "Computer Engineering"
  ]
  },
  {
    yearFrom: "2015",
    yearTo: "2017",
    school: "Kyoto University",
    skills: [
      "Web development",
      "Computer Engineering"
    ]
    },
    {
      yearFrom: "2015",
      yearTo: "2017",
      school: "Kyoto University",
      skills: [
        "Web development",
        "Computer Engineering"
      ]
    },
    {
      yearFrom: "2015",
      yearTo: "2017",
      school: "Kyoto University",
      skills: [
        "Web development",
        "Computer Engineering"
      ]
    }
]))

// ///////////////////
// App
const app = express()

// APIS
app.get('/experience', (req, res) => {
  redisClient.get("experience", function(err, reply) {
    res.json(JSON.parse(reply))
  })
})

app.get('/education', (req, res) => {
  redisClient.get("education", (err, reply) => {
    res.json(JSON.parse(reply))
  })
})

app.get('/randomNumber', (req, res) => {
  let data = { num: Math.ceil( 10 * Math.random() ) }
  res.json(data)
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.send("Hello World!")
})

app.listen(PORT, HOST)
console.log(`Running on ${PORT} ports!!`)
