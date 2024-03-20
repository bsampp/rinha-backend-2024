import Fastify from 'fastify'
import { z } from 'zod';
import { sql } from './server/postgres';
import validateData from './utils/validate';

const app = Fastify();

app.get('/clientes', async (req, reply) => {
  const result = await sql/*sql*/`
    SELECT * FROM users;
  `;

  return result;
});

app.post('/clientes/:id/transacoes', async (req, reply) => {
  const transactionSchema = z.object({
    user_id: z.number().int(),
    amount: z.number().int(),
    type: z.string().length(1),
    description: z.string().max(10).min(1)
  });
  
  async function getUserData(userId: number) {
    const userData = await sql/*sql*/`
      SELECT balance, limit_in_cents
      FROM users
      WHERE id = ${userId};
    `;
    return userData[0];
  }

  const { user_id, amount, type, description } = transactionSchema.parse(req.body);

  

  const { balance, limit_in_cents } = await getUserData(user_id);

  validateData(user_id, amount, type, description, balance, limit_in_cents, reply);

  await sql/*sql*/`
    INSERT INTO transactions (user_id, amount, type_transaction, description_transaction, created_at)
    VALUES (${user_id}, ${amount}, ${type}, ${description}, NOW());
  `;

  await sql/*sql*/`
    UPDATE users
    SET balance = balance + ${amount}
    WHERE id = ${user_id};
  `;

  const updatedData = await getUserData(user_id);

  return reply.code(200).send({ message: "OK", saldo: updatedData.balance, limite: updatedData.limit_in_cents });
});

app.listen({
  port: 3000,
  }).then(() => {
    console.log('Server running on port 3000');
});

