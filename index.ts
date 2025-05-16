import express from 'express'
const app = express()
const port = 3000 

app.get('/', (req, res) => {
    res.send('API Farmacia')
})

app.listen(port, () => {
    console.log(`App rordando na port ${port}`)
})