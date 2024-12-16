import { FastifyRequest, FastifyReply } from "fastify";
import {
  UserService,
  UpdateUserProps,
  CreateUserProps,
  AuthenticateUserProps,
} from "../services/UserService";

class UserController {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const data = request.body as CreateUserProps;

    try {
      const { success, message, user } = await userService.create(data);
      reply.status(201).send({ success, message, user });
    } catch (error: any) {
      reply.status(400).send({ status: "error", message: error.message });
    }
  }

  async authenticateUser(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const data = request.body as AuthenticateUserProps;

    try {
      const { token, user } = await userService.authenticate(data);
      reply.send({ status: "success", token, user });
    } catch (error: any) {
      reply.status(401).send({ status: "error", message: error.message });
    }
  }

  async read(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const { id } = request.params as any;

    try {
      const user = await userService.read(id);
      reply.send(user);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async patch(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const { id } = request.params as any;
    const data = request.body as Partial<UpdateUserProps>;
    try {
      const { status, message, user } = await userService.patch(id, data);
      reply.send({ status, message, user });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const { id } = request.params as any;

    try {
      const result = await userService.delete(id);
      reply.send(result);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService();
    const { gymId } = request.query as any;

    try {
      const { status, message, data } = await userService.list();
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }
}

export { UserController };
