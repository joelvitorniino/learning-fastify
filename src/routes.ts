import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const appRoutes = async (app: FastifyInstance) => {
    app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send("Hello, world!");
    })
};