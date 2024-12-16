import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const ManagerSchema = z
  .object({
    name: z.string().min(1, { message: "Nome obrigatório." }),
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    phone: z.string().regex(/^\d{10,11}$/, {
      message: "Por favor, insira um número de telefone válido.",
    }),
    document: z
      .string()
      .regex(/^\d{14}$/, { message: "Por favor, insira um CNPJ válido." }),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "As senhas não coincidem.",
    path: ["repeatPassword"],
  });

export const MemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(30, { message: "Campo obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  isTrainer: z.boolean().default(false),
  active: z.boolean().optional().default(true),
  cpf: z
    .string()
    .regex(/^\d{11}$/, { message: "Por favor, insira um CPF válido." }),
  status: z
    .enum(["PENDENTE", "ATRASADO", "PAGO"])
    .optional()
    .default("PENDENTE"),
  cref: z.string().optional(),
  firstAccess: z.boolean().optional().default(true),
  HealthFile: z.array(z.string()).optional(),
});

export const ExerciseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "O nome do exercício é obrigatório." }),
  category: z.string().min(1, { message: "Seleção obrigatória" }),
  equipament: z.string().min(1, { message: "Campo obrigatório." }),
  serie: z.coerce.number().min(1, { message: "Campo obrigatório" }).positive(),
  num_rep: z.coerce.number().positive().optional().default(3),
  interval: z.coerce
    .number()
    .gte(15)
    .lte(60)
    .positive()
    .max(60, { message: "O intervalo máximo foi é 60s." }),
});

export const TrainningSheetSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "O título é obrigatório"),
  activity: z.enum([
    "CARDIO",
    "GOODSHAPE",
    "FEMININO",
    "MASCULINO",
    "BODYBUILDER",
  ]),
  userId: z.string().optional(),
  exerciseIds: z.array(z.string()).min(1, "Deve haver pelo menos um exercício"),
});

export const ProfileGymSchema = z.object({
  name: z.string().min(1, "O nome da academia é obrigatório"),
  code: z.string().optional(),
  neighborhood: z.string().min(1, { message: "A rua é obrigatória" }),
  number: z.number().min(1, { message: "Campo obrigatório" }),
  street: z.string().min(1, { message: "O bairro é obrigatório" }),
  city: z.string().min(1, { message: "A cidade é obrigatória" }),
  state: z.string().min(2, { message: "O estado é obrigatório" }),
  zip_code: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "CEP inválido")
    .min(1)
    .max(9),
  complement: z.string().optional(),
  about: z.string().optional(),
  phone: z.string().regex(/^\d{10,11}$/, {
    message: "Por favor, insira um número de telefone válido.",
  }),
});
