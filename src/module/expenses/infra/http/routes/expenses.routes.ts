import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import dayjs from "dayjs";

const expensesRoutes = Router()
const prisma = new PrismaClient()

expensesRoutes.post('/',
    async (req, res) => {
        const { title, where, date, amount, payment, category_id, user_id, reference_id } = req.body
        const formattedDate = dayjs(date).toDate()
        const expenses = await prisma.expenses.create({
            data: {
                title,
                date: formattedDate,
                where,
                amount,
                payment,
                category_id,
                user_id,
                reference_id
            }
        }).catch((err) => {
            res.status(500).json({err, message: 'Expense was not created.'})
        })

        res.status(200).json({expenses, message: 'Expense created!'})
    })

expensesRoutes.get('/', async (req, res) => {
    const expenses = await prisma.expenses.findMany()
    res.status(200).json({expenses})
})

expensesRoutes.get('/:id',
    async (req, res) => {
        const expenses = await prisma.expenses.findMany({ where: { reference_id: req.params.id }})
            .catch((err) => {
                res.status(500).json({err, message: 'Budget Not Found'})
            })
        res.status(200).json({expenses})
    })

expensesRoutes.delete('/:id',
    async (req, res) => {
        await prisma.expenses.delete({ where: { id: req.params.id }})
            .catch((err) => res.status(500)
                .json({err, message: 'Budget not deleted. Check reference and try again.'}))
        res.sendStatus(200)
    })

export default expensesRoutes