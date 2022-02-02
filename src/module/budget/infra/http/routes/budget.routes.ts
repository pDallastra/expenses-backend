import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const budgetRoutes = Router()
const prisma = new PrismaClient()

budgetRoutes.post('/',
    async (req, res) => {
        const { amount, category_id, reference_id } = req.body
        const budget = await prisma.budget.create({
            data: {
                amount,
                category_id,
                reference_id
            }
        }).catch((err) => {
            res.status(500).json({err, message: 'Budget was not created.'})
        })

        res.status(200).json({budget, message: 'Budget created!'})
    })

budgetRoutes.get('/',
    async (req, res) => {
        const budget = await prisma.budget.findMany()
        res.status(200).json({budget})
    })

budgetRoutes.get('/:id',
    async (req, res) => {
        const budget = await prisma.budget.findUnique({ where: { id: req.params.id }})
            .catch((err) => {
                res.status(500).json({err, message: 'Budget Not Found'})
        })
        res.status(200).json({budget})
    })

budgetRoutes.delete('/:id',
    async (req, res) => {
        await prisma.budget.delete({ where: { id: req.params.id }})
            .catch((err) => res.status(500)
                .json({err, message: 'Budget not deleted. Check reference and try again.'}))
        res.sendStatus(200)
    })

export default budgetRoutes