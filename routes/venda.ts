import { PrismaClient } from '@prisma/client'
import { Router } from "express"
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const vendaSchema = z.object({
    clienteId: z.number(),
    data: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Informe uma data válida no formato YYYY-MM-DD"
    })
    .transform(val => new Date(val)),
    total: z.number()
})

router.get('/', async (req, res) => {


    try {
        const venda = await prisma.venda.findMany()
        res.status(200).json(venda)
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

router.post('/', async (req, res) => {

    const valida = vendaSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ error: valida.error})
        return
    }

    const { clienteId, data, total } = valida.data

    try {
        const venda = await prisma.venda.create({
            data: { clienteId, data, total }
        })
        res.status(201).json(venda)

    } catch (error) {
        res.status(400).json({ error: error })
        return
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    const valida = vendaSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ error: valida.error})
        return
    }

    const { clienteId, data, total } = valida.data

    try {
        const venda = await prisma.venda.update({
            where: { id: Number(id) },
            data: { clienteId, data, total }
        })
        res.status(200).json(venda)

    } catch (error) {
        res.status(400).json({ error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const cliente = await prisma.cliente.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(cliente)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

export default router 