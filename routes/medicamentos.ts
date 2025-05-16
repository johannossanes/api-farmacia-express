import { PrismaClient } from '@prisma/client'
import { Router } from "express"
import { z } from 'zod'


const prisma = new PrismaClient()

const router = Router()

const medicamentoSchema = z.object({
    nome: z.string().min(5, {
        message: "Nome deve possuir no minimo 5 caracteres"
    }),
    laboratorio: z.string().min(5, {
        message: "Laboratorio deve possuir no minimo 5 caracteres"
    }),
    preco: z.number().min(1, {
        message: "Preço deve ser maior que 1"
    }),
    controlado: z.boolean(),
    quantidade: z.number(),
    quantMinima: z.number()
})

router.get('/', async (req, res) => {


    try {
        const medicamento = await prisma.medicamento.findMany()
        res.status(200).json(medicamento)
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

router.post('/', async (req, res) => {

    const valida = medicamentoSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ error: valida.error})
        return
    }

    const { nome, laboratorio, preco, controlado, quantidade, quantMinima } = valida.data

    try {
        const medicamento = await prisma.medicamento.create({
            data: { nome, laboratorio, preco, controlado, quantidade, quantMinima }
        })
        res.status(201).json(medicamento)

    } catch (error) {
        res.status(400).json({ error: error })
        return
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    const valida = medicamentoSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ error: valida.error})
        return
    }

    const { nome, laboratorio, preco, controlado, quantidade, quantMinima } = valida.data

    try {
        const medicamento = await prisma.medicamento.update({
            where: { id: Number(id) },
            data: { nome, laboratorio, preco, controlado, quantidade, quantMinima }
        })
        res.status(200).json(medicamento)

    } catch (error) {
        res.status(400).json({ error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const medicamento = await prisma.medicamento.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(medicamento)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

export default router 