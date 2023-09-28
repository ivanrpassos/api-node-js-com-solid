import { registerService } from '@/services/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = bodySchema.parse(req.body)

  try {
    await registerService({
      name,
      email,
      password,
    })
  } catch (err) {
    return rep.status(409).send()
  }

  return rep.status(201).send()
}
