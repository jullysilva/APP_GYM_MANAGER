import prismaClient from "../prisma";
import { GroupType } from "@prisma/client";

interface CreateExerciseProps {
  name: string;
  category: GroupType;
  equipament: string;
  serie: number;
  num_rep: number;
  interval: number;
}

export interface UpdateExerciseProps {
  id: string;
  name?: string;
  category?: GroupType;
  equipament?: string;
  serie?: number;
  num_rep?: number;
  interval?: number;
}

class ExerciseService {
  async create({
    name,
    category,
    equipament,
    serie,
    num_rep,
    interval,
  }: CreateExerciseProps) {
    if (
      !name ||
      !category ||
      !equipament ||
      serie === undefined ||
      num_rep === undefined ||
      interval === undefined
    ) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const exercise = await prismaClient.exercises.create({
      data: {
        name,
        category,
        equipament,
        serie,
        num_rep,
        interval,
      },
    });

    return exercise;
  }

  async read(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const exercise = await prismaClient.exercises.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new Error("Exercício não encontrado");
    }

    return exercise;
  }

  async update({
    id,
    name,
    category,
    equipament,
    serie,
    num_rep,
    interval,
  }: UpdateExerciseProps) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const exercise = await prismaClient.exercises.update({
      where: { id },
      data: {
        name,
        category,
        equipament,
        serie,
        num_rep,
        interval,
      },
    });

    return exercise;
  }

  async patch(id: string, data: Partial<CreateExerciseProps>) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const exercise = await prismaClient.exercises.update({
      where: { id },
      data,
    });

    return exercise;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.exercises.delete({
      where: { id },
    });

    return { message: "Exercício deletado com sucesso" };
  }

  async list() {
    const data = await prismaClient.exercises.findMany();
    return {
      status: "success",
      message: "Todos os exercícios foram fornecidos.",
      data,
    };
  }
}

export { ExerciseService };
