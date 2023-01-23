import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { appRoutes } from "./routes";

const app = fastify();

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST']
});

app.register(appRoutes);

app.listen({
    port: 3001
})
    .then(() => console.log("Http server listening on port 3001"))
    .catch(e => console.log(e));