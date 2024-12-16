import prismaClient from "../prisma";

interface CreateHealthFileProps {
  name_personal_trainer: string;
  lesion: boolean;
  diabetes: boolean;
  surgery: boolean;
  hypertension: boolean;
  userId: string;
}

interface UpdateHealthFileProps {
  id: string;
  userId?: string;
  name_personal_trainer?: string;
  lesion?: boolean;
  diabetes?: boolean;
  surgery?: boolean;
  hypertension?: boolean;
}

class HealthFileService {
  async create({
    name_personal_trainer,
    lesion,
    diabetes,
    surgery,
    hypertension,
    userId,
  }: CreateHealthFileProps) {
    if (
      !name_personal_trainer ||
      lesion === undefined ||
      diabetes === undefined ||
      surgery === undefined ||
      hypertension === undefined ||
      !userId
    ) {
      throw new Error("All fields are required");
    }

    const healthFile = await prismaClient.healthFile.create({
      data: {
        name_personal_trainer,
        lesion,
        diabetes,
        surgery,
        hypertension,
        userId,
      },
    });

    return healthFile;
  }

  async getById(id: string) {
    const healthFile = await prismaClient.healthFile.findUnique({
      where: { id },
    });

    return healthFile;
  }

  async update({
    id,
    name_personal_trainer,
    lesion,
    diabetes,
    surgery,
    hypertension,
  }: UpdateHealthFileProps) {
    const healthFile = await prismaClient.healthFile.update({
      where: { id },
      data: {
        name_personal_trainer,
        lesion,
        diabetes,
        surgery,
        hypertension,
      },
    });

    return healthFile;
  }

  async getAllHealth() {
    const healthFile = await prismaClient.healthFile.findMany();
    return {
      status: "success",
      message: "Todas as fichas foram listados.",
      data: healthFile,
    };
  }
}

export { HealthFileService };
