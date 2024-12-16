import { FastifyRequest, FastifyReply } from "fastify";
import {
  ExerciseService,
  UpdateExerciseProps,
} from "../services/ExercisesService";

class ExerciseController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const exerciseService = new ExerciseService();
    const { name, category, equipament, serie, num_rep, interval } =
      request.body as any;

    try {
      const exercise = await exerciseService.create({
        name,
        category,
        equipament,
        serie,
        num_rep,
        interval,
      });
      reply.send(exercise);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async read(request: FastifyRequest, reply: FastifyReply) {
    const exerciseService = new ExerciseService();
    const { id } = request.params as any;

    try {
      const exercise = await exerciseService.read(id);
      reply.send(exercise);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const exerciseService = new ExerciseService();
    const { id } = request.params as any;
    const { name, category, equipament, serie, num_rep, interval } =
      request.body as any;

    try {
      const exercise = await exerciseService.update({
        id,
        name,
        category,
        equipament,
        serie,
        num_rep,
        interval,
      });
      reply.send(exercise);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async patch(request: FastifyRequest, reply: FastifyReply) {
    const exerciseService = new ExerciseService();
    const { id } = request.params as any;
    const data = request.body as Partial<UpdateExerciseProps>;

    try {
      const exercise = await exerciseService.patch(id, data);
      reply.send(exercise);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const exerciseService = new ExerciseService();
    const { id } = request.params as any;

    try {
      const result = await exerciseService.delete(id);
      reply.send(result);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const exerciseService = new ExerciseService();

    try {
      const { status, message, data } = await exerciseService.list();
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }
}

export { ExerciseController };
