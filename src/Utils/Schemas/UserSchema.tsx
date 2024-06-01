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

export const RegisterTrainningSheetSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  categoria: z.string().min(1, "A categoria é obrigatória"),
  exercicios: z
    .array(ExerciseSchema)
    .min(1, "Deve haver pelo menos um exercício"),
  observacao: z.string().optional(),
});

export const ProfileGymSchema = z.object({
  academia: z.string().min(1, "O nome da academia é obrigatório"),
  code: z.string().min(1).optional(),
  logradouro: z.string().min(1, { message: "A rua é obrigatória" }),
  number: z.number().optional(),
  bairro: z.string().min(1, { message: "O bairro é obrigatório" }),
  cidade: z.string().min(1, { message: "A cidade é obrigatória" }),
  estado: z.string().min(2, { message: "O estado é obrigatório" }),
  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "CEP inválido")
    .min(1)
    .max(9),
  complemento: z.string().optional(),
  adicional: z.string().optional(),
});
