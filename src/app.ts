import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import fastifyJwt from '@fastify/jwt';

import { FastifyRequest, FastifyReply } from 'fastify';
 
import { userRoutes } from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

import { config } from 'dotenv';

config();

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

export const app = fastify();

app.register(fastifyJwt, {
    secret: process.env.HASH_SECRET as string,
});

app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch(e) {
        return reply.send(e);
    }
});

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST']
});

app.register(userRoutes, { prefix: "api/users" });

for(const schema of userSchemas) {
    app.addSchema(schema);
};

app.listen({
    host: "0.0.0.0",
    port: 3001
})
    .then(() => console.log("Http server listening on port 3001"))
    .catch(e => {
        console.log(e)
        process.exit(1);
    });