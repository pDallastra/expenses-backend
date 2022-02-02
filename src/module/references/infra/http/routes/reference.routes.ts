import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

const referenceRoutes = Router()
const prisma = new PrismaClient()

referenceRoutes.post('/:user_id',
    async (req, res) => {
        const { month } = req.body
        const { user_id }  = req.params
        const reference = await prisma.references.create({
            data: {
                month: dayjs(month).toDate(),
                user_id
            }
        }).catch((err) => {
            res.status(500).json({err, message: 'Reference was not created.'})
        })

        res.status(200).json({reference, message: 'Reference created!'})
    })

referenceRoutes.get('/',
    async (req, res) => {
        const references = await prisma.references.findMany()
        res.status(200).json({references})
    })

referenceRoutes.get('/:id',
    async (req, res) => {
        const references = await prisma.references.findMany({where: { user_id: req.params.id}})
        res.status(200).json({references})
    })

referenceRoutes.delete('/:id',
    async (req, res) => {
        await prisma.reference.delete({ where: { id: req.params.id }})
            .catch((err) => res.status(500)
                .json({err, message: 'Reference not deleted. Check reference and try again.'}))
        res.sendStatus(200)
    })

export default referenceRoutes