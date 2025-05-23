import { PrismaClient } from '@prisma/client'
import { Router } from "express"
import { z } from 'zod'
import nodemailer from 'nodemailer'


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

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: " ",
    pass: " ",
  },
});



async function enviaEmail(email: string, venda: any, cliente: any, itens: any[]) {
    const linhas = itens.map(item => `
    <tr>
      <td>${item.produto.nome}</td>
      <td>${item.quantidade}</td>
      <td>R$ ${Number(item.preco).toFixed(2)}</td>
    </tr>
    `).join('')

    const table = `
      <h1>Nota Fiscal da Compra</h1>
      <p><strong>Cliente:</strong> ${cliente.nome}</p>
      <p><strong>Data da Venda:</strong> ${new Date(venda.data).toLocaleDateString()}</p>
      <p><strong>Total:</strong> R$ ${venda.total.toFixed(2)}</p>

      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          ${linhas}
        </tbody>
      </table>
    `

  const info = await transporter.sendMail({
    from: 'Farmacia Avenida <farmaciaavenida@gmail.email>',
    to: email,
    subject: "Nota da Compra",
    text: "Obrigado por comprar conosco!", // plain‑text body
    html: table // HTML body
  });
}

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

        const cliente = await prisma.cliente.findUnique({
            where: {id: clienteId}
        })

        const itens = await prisma.itemVenda.findMany({
            where: { vendaId: venda.id },
            include: { produto: true }
        })

        if (cliente && cliente.email){
            await enviaEmail(cliente.email, venda, cliente, itens)
        }


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
        const venda = await prisma.venda.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(venda)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

export default router 