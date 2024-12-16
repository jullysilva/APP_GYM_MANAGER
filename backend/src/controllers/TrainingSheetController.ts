import { FastifyRequest, FastifyReply } from "fastify";
import {
  TrainingSheetService,
  CreateTrainingSheetProps,
  UpdateTrainingSheetProps,
} from "../services/TrainingSheetService";

class TrainingSheetController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const trainingSheetService = new TrainingSheetService();
    const { title, activity, userId, exerciseIds } =
      request.body as CreateTrainingSheetProps;

    try {
      const { status, message, data } = await trainingSheetService.create({
        title,
        activity,
        userId,
        exerciseIds,
      });
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async read(request: FastifyRequest, reply: FastifyReply) {
    const trainingSheetService = new TrainingSheetService();
    const { id } = request.params as any;

    try {
      const trainingSheet = await trainingSheetService.read(id);
      reply.send(trainingSheet);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const trainingSheetService = new TrainingSheetService();
    const { id } = request.params as any;
    const data = request.body as UpdateTrainingSheetProps;

    try {
      const trainingSheet = await trainingSheetService.update(id, data);
      reply.send(trainingSheet);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const trainingSheetService = new TrainingSheetService();
    const { id } = request.params as any;

    try {
      const result = await trainingSheetService.delete(id);
      reply.send(result);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async listByUserId(request: FastifyRequest, reply: FastifyReply) {
    const trainingSheetService = new TrainingSheetService();
    const { userId } = request.params as any;

    try {
      const { status, message, data } = await trainingSheetService.listByUserId(
        userId
      );
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const trainingSheetService = new TrainingSheetService();

    try {
      const { status, message, data } = await trainingSheetService.list();
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }
}

export { TrainingSheetController };
