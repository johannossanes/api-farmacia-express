import express from 'express'
import clienteRouter from './routes/cliente'
import medicamentosRouter from './routes/medicamentos'
import vendaRouter from './routes/venda'
import itemVendaRouter from './routes/itemVenda'

const app = express()
const port = 3000 

app.get('/', (req, res) => {
    res.send('API Farmacia')
})

app.use(express.json())

app.use('/cliente', clienteRouter)

app.use('/medicamentos', medicamentosRouter )

app.use('/venda', vendaRouter)

app.use('/item-venda', itemVendaRouter)
app.listen(port, () => {
    console.log(`App rordando na port ${port}`)
})