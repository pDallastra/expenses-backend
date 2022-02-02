import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const categoriesRoutes = Router()
const prisma = new PrismaClient()

categoriesRoutes.post('/',
    async (req, res) => {
        const { title } = req.body
        const reference = await prisma.categories.create({
            data: {
                title
            }
        }).catch((err) => {
            res.status(500).json({err, message: 'Category was not created.'})
        })

        res.status(200).json({reference, message: 'Category created!'})
    })

categoriesRoutes.get('/',
    async (req, res) => {
        const categories = await prisma.categories.findMany()
        res.status(200).json({categories})
    })

categoriesRoutes.get('/:id',
    async (req, res) => {
        const categories = await prisma.categories.findUnique({ where: { id: req.params.id }}).catch((err) => {
            res.status(500).json({err, message: 'Category not found'})
        })
        res.status(200).json({categories})
    })

categoriesRoutes.delete('/:id',
    async (req, res) => {
        await prisma.categories.delete({ where: { id: req.params.id }})
            .catch((err) => res.status(500)
                .json({err, message: 'Category not deleted. Check reference and try again.'}))
        res.sendStatus(200)
    })

export default categoriesRoutes