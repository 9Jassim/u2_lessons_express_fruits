const express = require('express')
const fruits = require('./fruits')
const PORT = process.env.PORT || 3000

const app = express()

//Define route and middleware
app.get('/ping', (req, res) => {
  res.json('pong')
})

app.get('/fruits', (req, res) => {
  res.send(fruits)
})

app.get('/greet/:name', (req, res) => {
  res.send(`Hello there, ${req.params.name}`)
})

app.get('/five', (req, res) => {
  const arr = [1, 2, 3, 4, 5]
  res.send(arr)
})

app.get('/evens/:n', (req, res) => {
  const evens = []
  if (parseInt(req.params.n)) {
    for (let i = 2; i <= parseInt(req.params.n); i++) {
      if (i % 2 === 0) {
        evens.push(i)
      }
    }
    res.send(evens)
  } else {
    res.send('Not a number')
  }
})

app.get('/namelength/:name', (req, res) => {
  const firstName = req.params.name
  res.send(`Length = ${firstName.length}`)
})

app.get('/fruits/sort', (req, res) => {
  fruits.sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
  // console.log(sorted)
  res.send(fruits)
})

app.get('/fruits/:name', (req, res) => {
  const fruit = fruits.find((fruit) => {
    return fruit.name.toUpperCase() === req.params.name.toUpperCase()
  })
  res.send(fruit)
})

app.listen(PORT, () => {
  console.log(`serving fruits on port: ${PORT}`)
})
