import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const UserRegisterSchema = z
  .object({
    code: z.string().length(6, { message: "O código não está válido." }),
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "As senhas não coincidem.",
    path: ["repeatPassword"],
  });

export const RegisterAlunoSchema = z.object({
  name: z.string().min(1).max(30),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  phone: z.string().regex(/^\d{10,11}$/, {
    message: "Por favor, insira um número de telefone válido.",
  }),
  codeGym: z
    .string()
    .length(6, { message: "O código não está válido." })
    .optional(),
});

export const ExerciseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  category: z.string(),
  equipamento: z.string(),
  serie: z.coerce.number().gte(1).positive(),
  nRepeticao: z.coerce.number().gte(1).positive(),
  intervalo: z.coerce.number().gte(15).lte(60).positive(),
});

export const InfoManagerGymSchema = z.object({
  academy: z.string().min(1),
  code: z.number(),
  cep: z.string().length(8),
  logradouro: z.string().min(1),
  numero: z.string().min(1),
  bairro: z.string().min(1),
  cidade: z.string().min(1),
});

export const RegisterTrainningSheetSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  categoria: z.string().min(1, "A categoria é obrigatória"),
  exercicios: z
    .array(ExerciseSchema)
    .min(1, "Deve haver pelo menos um exercício"),
  observacao: z.string().optional(),
});
