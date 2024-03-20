import { FastifyReply } from "fastify";

function validateData(user_id: number, amount: number, type: string, description: string, balance: number, limit_in_cents: number, reply: FastifyReply) {
    if (balance + amount > limit_in_cents || balance + amount < limit_in_cents * -1) {
        reply.code(422).send({ error: "Transação não pode ser realizada devido ao limite excedido" });
        return false;
    }
    
    if (type !== 'd' && type !== 'c') {
        reply.code(422).send({ error: "Tipo de transação inválido" });
        return false;
    }
    
    if (!Number.isInteger(amount)) {
        reply.code(422).send({ error: "O valor da transação deve ser um número inteiro" });
        return false;
    }

    return true; // Retorna verdadeiro se os dados forem válidos
}

export default validateData;
