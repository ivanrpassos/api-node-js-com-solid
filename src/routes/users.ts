import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function UsersRoute(app: FastifyInstance) {
  app.post('/users', async (req, res) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = bodySchema.parse(req.body)

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    })

    return res.status(201).send()
  })
}
