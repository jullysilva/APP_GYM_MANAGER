import prismaClient from "../prisma";
import { StatusPayment } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/generateRandomCode";
import Mailjet from "node-mailjet";

interface CreateUserProps {
  name: string;
  email: string;
  password?: string;
  status: StatusPayment;
  photo?: string;
  active: boolean;
  cpf: string;
  isTrainer: boolean;
  cref?: string;
  weight?: number;
  height?: number;
  phone?: string;
  birth?: string;
  gender?: string;
  firstAccess: boolean;
}

interface UpdateUserProps {
  name?: string;
  email?: string;
  password?: string;
  status?: StatusPayment;
  photo?: string;
  active?: boolean;
  cpf?: string;
  isTrainer?: boolean;
  cref?: string;
  weight?: number;
  height?: number;
  phone?: string;
  birth?: string;
  gender?: string;
  refresh_token?: string;
  firstAccess?: boolean;
}

interface AuthenticateUserProps {
  email: string;
  password: string;
}

class UserService {
  private mailjetClient: any;

  constructor() {
    this.mailjetClient = Mailjet.apiConnect(
      "f71c76d8bc00cb7fb1ee778d7a051047",
      "acb5b97483950c2b33480ed1303e9ad3"
    );
  }

  async create(data: CreateUserProps) {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ email: data.email }, { cpf: data.cpf }],
      },
    });

    if (existingUser) {
      throw new Error("Usuário com o mesmo email ou CPF já existe.");
    }

    const temporaryPassword = Math.random().toString(10);
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    const user = await prismaClient.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    await this.sendTemporaryPasswordEmail(data.email, temporaryPassword);

    return { success: true, message: "Usuário cadastrado com sucesso.", user };
  }

  async authenticate(data: AuthenticateUserProps) {
    const user = await prismaClient.user.findFirst({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user?.password ?? ""))) {
      throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "1h",
    });
    return { token, user };
  }

  async read(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async patch(id: string, data: Partial<UpdateUserProps>) {
    if (!id) {
      throw new Error("id é obrigatório");
    }

    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data,
    });

    return {
      status: "success",
      message: "Membro atualizado com sucesso.",
      user: updatedUser,
    };
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.user.delete({ where: { id } });

    return { message: "Usuário deletado com sucesso" };
  }

  async list() {
    const users = await prismaClient.user.findMany();
    return {
      status: "success",
      message: "Todos os alunos foram listados.",
      data: users,
    };
  }

  private async sendTemporaryPasswordEmail(
    email: string,
    temporaryPassword: string
  ) {
    try {
      const request = this.mailjetClient
        .post("send", { version: "v3.1" })
        .request({
          Messages: [
            {
              From: {
                Email: "tcc02jullywarley@gmail.com",
                Name: "Hike Support Access",
              },
              To: [
                {
                  Email: email,
                  Name: "Amigo (a)",
                },
              ],
              Subject: "Sua senha temporária",
              TextPart: `Sua senha temporária é: ${temporaryPassword}`,
            },
          ],
        });

      const result = await request;
      console.log("Mailjet Response:", result.body);
      if (result.body.Messages[0].Status !== "success") {
        console.error(
          "Erro ao enviar o e-mail com a senha temporária:",
          result.body
        );
        throw new Error("Erro ao enviar o e-mail com a senha temporária.");
      } else {
        console.log("E-mail enviado com sucesso para:", email);
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw new Error("Erro ao enviar o e-mail com a senha temporária.");
    }
  }
}

export { UserService, CreateUserProps, UpdateUserProps, AuthenticateUserProps };
