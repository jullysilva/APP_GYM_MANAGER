import prismaClient from "../prisma";
import { ActivityType } from "@prisma/client";

interface CreateTrainingSheetProps {
  title: string;
  activity: ActivityType;
  userId?: string;
  exerciseIds?: string[];
}

interface UpdateTrainingSheetProps {
  userId?: string;
  title?: string;
  activity?: ActivityType;
  exerciseIds?: string[];
}

class TrainingSheetService {
  async create({
    title,
    activity,
    userId,
    exerciseIds,
  }: CreateTrainingSheetProps) {
    if (!title || !activity) {
      throw new Error("All fields are required");
    }

    const trainingSheet = await prismaClient.trainingSheet.create({
      data: {
        title,
        activity,
        userId,
        exerciseIds,
      },
    });

    return {
      status: "success",
      message: "Ficha de treino criada com sucesso.",
      data: trainingSheet,
    };
  }

  async read(id: string) {
    const trainingSheet = await prismaClient.trainingSheet.findUnique({
      where: { id },
    });

    if (!trainingSheet) {
      throw new Error("Training sheet not found");
    }

    return {
      status: "success",
      message: "Ficha de treino encontrada.",
      data: trainingSheet,
    };
  }

  async update(
    id: string,
    { userId, title, activity, exerciseIds }: UpdateTrainingSheetProps
  ) {
    const trainingSheet = await prismaClient.trainingSheet.update({
      where: { id },
      data: {
        userId,
        title,
        activity,
        exerciseIds,
      },
    });

    return {
      status: "success",
      message: "Ficha de treino atualizada com sucesso.",
      data: trainingSheet,
    };
  }

  async delete(id: string) {
    await prismaClient.trainingSheet.delete({ where: { id } });
    return { message: "Ficha de treino deletada com sucesso." };
  }

  async list() {
    const data = await prismaClient.trainingSheet.findMany();
    return {
      status: "success",
      message: "Todas as fichas foram fornecidas.",
      data,
    };
  }

  async listByUserId(userId: string) {
    const data = await prismaClient.trainingSheet.findMany({
      where: { userId },
    });
    return {
      status: "success",
      message: "Fichas de treino do usuário fornecidas.",
      data,
    };
  }
}

export {
  TrainingSheetService,
  CreateTrainingSheetProps,
  UpdateTrainingSheetProps,
};
