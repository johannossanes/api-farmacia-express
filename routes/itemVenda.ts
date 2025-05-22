import { PrismaClient } from '@prisma/client'
import { Router } from "express"
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const itemVendaSchema = z.object({
    vendaId: z.number().int(),
    produtoId: z.number().int(),
    quantidade: z.number().int().positive(),
    preco: z.number().positive()

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

    const dadoVenda = await prisma.venda.findUnique({
        where: {id: vendaId}
    })

    const dadoProduto = await prisma.medicamento.findUnique({
        where: {id: produtoId}
    })

    if (!dadoVenda){
        res.status(404).json({ error: "Venda não encontrada."})
        return
    }

    if (!dadoProduto){
        res.status(404).json({ error: "Produto não encontrado."})
        return
    }

    if (quantidade > dadoProduto?.quantidade){
        res.status(400).json({ error: "Estoque insuficiente."})
        return
    }

    try{
        
        const [itemVenda, produto] = await prisma.$transaction([
            prisma.itemVenda.create({
                data: { vendaId, produtoId, quantidade, preco }
            }),
            prisma.medicamento.update({
                where: { id: produtoId},
                data: { quantidade: { decrement: quantidade}}
                
            })
        ])
        res.status(201).json({ itemVenda, produto })

    } catch (error) {
        res.status(400).json({ error: error})
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