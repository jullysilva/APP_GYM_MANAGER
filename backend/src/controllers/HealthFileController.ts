import { FastifyRequest, FastifyReply } from "fastify";
import { HealthFileService } from "../services/HealthFileService";

class HealthFileController {
  private healthFileService: HealthFileService;

  constructor() {
    this.healthFileService = new HealthFileService();
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        name_personal_trainer,
        lesion,
        diabetes,
        surgery,
        hypertension,
        userId,
      } = request.body as {
        name_personal_trainer: string;
        lesion: boolean;
        diabetes: boolean;
        surgery: boolean;
        hypertension: boolean;
        userId: string;
      };

      const healthFile = await this.healthFileService.create({
        name_personal_trainer,
        lesion,
        diabetes,
        surgery,
        hypertension,
        userId,
      });

      reply.send(healthFile);
    } catch (error: any) {
      reply
        .status(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const healthFile = await this.healthFileService.getById(id);
      reply.send(healthFile);
    } catch (error: any) {
      reply.status(404).send({ error: "Not Found", message: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { name_personal_trainer, lesion, diabetes, surgery, hypertension } =
        request.body as {
          name_personal_trainer?: string;
          lesion?: boolean;
          diabetes?: boolean;
          surgery?: boolean;
          hypertension?: boolean;
        };

      const updatedHealthFile = await this.healthFileService.update({
        id,
        name_personal_trainer,
        lesion,
        diabetes,
        surgery,
        hypertension,
      });

      reply.send(updatedHealthFile);
    } catch (error: any) {
      reply
        .status(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { status, message, data } =
        await this.healthFileService.getAllHealth();
      reply.send({ status, message, data });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  }
}

export { HealthFileController };
