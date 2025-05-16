import { PrismaClient } from '@prisma/client'
import { Router } from "express"
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const itemVendaSchema = z.object({
    vendaId: z.number().int(),
    produtoId: z.number().int(),
    quantidade: z.number().int(),
    preco: z.number()

})

router.get('/', async (req, res) => {


    try {
        const itemVenda = await prisma.itemVenda.findMany()
        res.status(200).json(itemVenda)
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

router.post('/', async (req, res) => {

    const valida = itemVendaSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ error: valida.error})
        return
    }

    const { vendaId, produtoId, quantidade, preco } = valida.data

    try {
        const itemVenda = await prisma.itemVenda.create({
            data: { vendaId, produtoId, quantidade, preco }
        })
        res.status(201).json(itemVenda)

    } catch (error) {
        res.status(400).json({ error: error })
        return
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    const valida = itemVendaSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ error: valida.error})
        return
    }

    const { quantidade, preco} = valida.data

    try {
        const venda = await prisma.itemVenda.update({
            where: { id: Number(id) },
            data: { quantidade, preco }
        })
        res.status(200).json(venda)

    } catch (error) {
        res.status(400).json({ error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const itemVenda = await prisma.itemVenda.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(itemVenda)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

export default router 