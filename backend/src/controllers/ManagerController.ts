import { FastifyRequest, FastifyReply } from "fastify";
import {
  ManagerService,
  CreateManagerProps,
  LoginManagerProps,
} from "../services/ManagerService";

class ManagerController {
  async createManager(request: FastifyRequest, reply: FastifyReply) {
    const managerService = new ManagerService();
    const data = request.body as CreateManagerProps;

    try {
      const { status, manager, token } = await managerService.create(data);
      reply.status(201).send({ status, manager, token });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async loginManager(request: FastifyRequest, reply: FastifyReply) {
    const managerService = new ManagerService();
    const data = request.body as LoginManagerProps;

    try {
      const { status, manager, token } = await managerService.login(data);
      reply.send({ status, manager, token });
    } catch (error: any) {
      reply.status(401).send({ error: error.message });
    }
  }

  async readManager(request: FastifyRequest, reply: FastifyReply) {
    const managerService = new ManagerService();
    const { id } = request.params as any;

    try {
      const { status, message, data } = await managerService.read(id);
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async patchManager(request: FastifyRequest, reply: FastifyReply) {
    const managerService = new ManagerService();
    const { id } = request.params as any;
    const data = request.body as Partial<CreateManagerProps>;

    try {
      const manager = await managerService.patch(id, data);
      reply.send(manager);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async deleteManager(request: FastifyRequest, reply: FastifyReply) {
    const managerService = new ManagerService();
    const { id } = request.params as any;

    try {
      const result = await managerService.delete(id);
      reply.send(result);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }
}

export { ManagerController };
