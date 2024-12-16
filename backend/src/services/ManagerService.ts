import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/generateRandomCode";

interface CreateManagerProps {
  name: string;
  email: string;
  document: string;
  photo?: string;
  phone: string;
  password: string;
}

interface UpdateManagerProps {
  id: string;
  name?: string;
  document?: string;
  photo?: string;
  phone?: string;
  email?: string;
  password?: string;
}

interface LoginManagerProps {
  email: string;
  password: string;
}

class ManagerService {
  async create(data: CreateManagerProps) {
    const { name, email, document, phone, password } = data;

    if (!name || !document || !phone || !email || !password) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    // Verificar se o manager já está cadastrado
    const existingManager = await prismaClient.manager.findUnique({
      where: { email },
    });

    if (existingManager) {
      // Gerar token JWT
      const token = jwt.sign({ id: existingManager.id }, secretKey as string, {
        expiresIn: "1h",
      });
      return { status: "success", manager: existingManager, token };
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo manager
    const manager = await prismaClient.manager.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    // Generate a JWT token
    const token = jwt.sign({ id: manager.id }, secretKey as string, {
      expiresIn: "1h",
    });

    return { status: "success", manager, token };
  }

  async login(data: LoginManagerProps) {
    const { email, password } = data;

    const manager = await prismaClient.manager.findUnique({ where: { email } });

    if (!manager) {
      throw new Error("Manager não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, manager.password);

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    // Generate a JWT token
    const token = jwt.sign({ id: manager.id }, secretKey as string, {
      expiresIn: "4h",
    });

    return { status: "success", manager, token };
  }

  async read(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const manager = await prismaClient.manager.findUnique({ where: { id } });

    if (!manager) {
      throw new Error("Manager não encontrado");
    }

    return {
      status: "success",
      message: "Sem informações do gerente.",
      data: manager,
    };
  }

  async update(data: UpdateManagerProps) {
    const { id } = data;
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const manager = await prismaClient.manager.update({
      where: { id },
      data,
    });

    return manager;
  }

  async patch(id: string, data: Partial<CreateManagerProps>) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const manager = await prismaClient.manager.update({
      where: { id },
      data,
    });

    return manager;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await prismaClient.manager.delete({ where: { id } });

    return { message: "Manager deletado com sucesso" };
  }

  async auth() {
    const authorization = await prismaClient.manager.findMany();
    return authorization;
  }
}

export {
  ManagerService,
  CreateManagerProps,
  UpdateManagerProps,
  LoginManagerProps,
};
