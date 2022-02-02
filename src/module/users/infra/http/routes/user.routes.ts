import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const userRoutes = Router()
const prisma = new PrismaClient()

userRoutes.post('/',
    async (req, res) => {
        const {name, email, password} = req.body

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password,
                access: false
            }
        }).catch((err) => {
            res.status(500).json({err, message: 'User was not created.'})
        })

        // @ts-ignore
        const userResp = {
            name,
            email,
        }

        res.status(200).json({userResp, message: 'User created!'})
    })

userRoutes.get('/',
    async (req, res) => {
        const users = await prisma.users.findMany()
            const filteredUsers = users.map((user) => {
                return filterUserObj(user)
            })
        res.status(200).json({users: filteredUsers})
    })

userRoutes.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await prisma.users.findUnique({ where: { id } })
    const filteredUser = filterUserObj(user)

    res.status(200).json({ user: filteredUser })
})

function filterUserObj(user: any) {
    return {
        email: user.email,
        name: user.name,
        access: user.access,
        createdAt: user.createdAt,
        editedAt: user.editedAt,
        id: user.id
    }
}

export default userRoutes