import prismaClient from "../prisma";
import generateRandomCode from "../utils/generateRandomCode";

interface CreateGym {
  code?: string;
  name: string;
  zip_code: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  about?: string;
  phone: string;
  managerId: string;
}

export interface UpdateGymProps {
  name?: string;
  zip_code?: string;
  street?: string;
  number?: number;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
  about?: string;
  phone?: string;
}

class GymService {
  async createGym({
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
  }: CreateGym) {
    if (
      !name ||
      !zip_code ||
      !street ||
      number === undefined ||
      !neighborhood ||
      !city ||
      !state ||
      phone === undefined ||
      !managerId
    ) {
      throw new Error("Todos os campos são obrigatórios");
    }
    const code = String(generateRandomCode(6));

    const data = {
      code: code,
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
    };
    const gym = await prismaClient.gym.create({ data });

    return {
      status: "success",
      message: "Academia cadastrado com sucesso.",
      data: gym,
    };
  }

  async readGym(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const profile = await prismaClient.gym.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new Error("Dados de academia não encontrados.");
    }

    return profile;
  }

  async patchGym(managerId: string, data: Partial<UpdateGymProps>) {
    if (!managerId) {
      throw new Error("ID do gerente é obrigatório.");
    }

    // Verificar se a academia existe antes de atualizar
    const gymExists = await prismaClient.gym.findUnique({
      where: { managerId },
    });

    if (!gymExists) {
      return {
        status: "error",
        message: "Academia não encontrada.",
        data: null,
      };
    }
    const id = gymExists?.id;
    const gym = await prismaClient.gym.update({
      where: { id },
      data,
    });

    return {
      status: "success",
      message: "Atualizado com sucesso.",
      gym,
    };
  }

  async list() {
    const profile = await prismaClient.gym.findMany();
    return profile;
  }

  async getGymByManager(managerId: string) {
    if (!managerId) {
      throw new Error("ID do gerente é obrigatório");
    }

    const gym = await prismaClient.gym.findUnique({
      where: { managerId },
    });

    return gym
      ? {
          status: "success",
          message: "Academia encontrada.",
          data: gym,
        }
      : {
          status: 500,
          message: "Academia não cadastrada.",
          data: null,
        };
  }
}

export { GymService };
