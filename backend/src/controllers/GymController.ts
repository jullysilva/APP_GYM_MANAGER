import { FastifyRequest, FastifyReply } from "fastify";
import { GymService, UpdateGymProps } from "../services/GymService";
import { ObjectId } from "mongodb";

class GymController {
  async createGym(request: FastifyRequest, reply: FastifyReply) {
    const gymService = new GymService();
    const {
      name,
      zip_code,
      street,
      number,
      neighborhood,
      city,
      state,
      complement,
      about,
      phone,
      managerId,
    } = request.body as any;

    try {
      const { status, message, data } = await gymService.createGym({
        name,
        zip_code,
        street,
        number,
        neighborhood,
        city,
        state,
        complement,
        about,
        phone,
        managerId,
      });
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async readGym(request: FastifyRequest, reply: FastifyReply) {
    const gymService = new GymService();
    const { id } = request.params as any;

    try {
      const Gym = await gymService.readGym(id);
      reply.send(Gym);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async patchGym(request: FastifyRequest, reply: FastifyReply) {
    const gymService = new GymService();
    const { managerId } = request.params as any;
    const data = request.body as Omit<UpdateGymProps, "managerId">;

    try {
      const { status, message, gym } = await gymService.patchGym(
        managerId,
        data
      );
      reply.send({ status, message, data: gym });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async getGymByManager(request: FastifyRequest, reply: FastifyReply) {
    const gymService = new GymService();

    const { id } = request.params as any;

    try {
      const { status, message, data } = await gymService.getGymByManager(id);
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }
}

export { GymController };
