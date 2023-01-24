import { FastifyInstance } from 'fastify';
import { registerUserHandler, loginHandler, getUsersHandler } from './user.controller';
import { $ref } from './user.schema';

export const userRoutes = async (app: FastifyInstance) => {
    app.post('/', {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, registerUserHandler);
    
    app.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler);

    app.get('/', {
        preHandler: [app.authenticate]
    }, getUsersHandler);
};