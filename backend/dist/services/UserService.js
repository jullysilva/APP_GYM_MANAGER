"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRandomCode_1 = require("../utils/generateRandomCode");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
class UserService {
    constructor() {
        this.mailjetClient = node_mailjet_1.default.apiConnect("f71c76d8bc00cb7fb1ee778d7a051047", "acb5b97483950c2b33480ed1303e9ad3");
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma_1.default.user.findFirst({
                where: {
                    OR: [{ email: data.email }, { cpf: data.cpf }],
                },
            });
            if (existingUser) {
                throw new Error("Usuário com o mesmo email ou CPF já existe.");
            }
            const temporaryPassword = Math.random().toString(10);
            const hashedPassword = yield bcrypt_1.default.hash(temporaryPassword, 10);
            const user = yield prisma_1.default.user.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            });
            yield this.sendTemporaryPasswordEmail(data.email, temporaryPassword);
            return { success: true, message: "Usuário cadastrado com sucesso.", user };
        });
    }
    authenticate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield prisma_1.default.user.findFirst({
                where: { email: data.email },
            });
            if (!user || !(yield bcrypt_1.default.compare(data.password, (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : ""))) {
                throw new Error("Email ou senha incorretos");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, generateRandomCode_1.secretKey, {
                expiresIn: "1h",
            });
            return { token, user };
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const user = yield prisma_1.default.user.findUnique({ where: { id } });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            return user;
        });
    }
    patch(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("id é obrigatório");
            }
            const user = yield prisma_1.default.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            if (data.password) {
                data.password = yield bcrypt_1.default.hash(data.password, 10);
            }
            const updatedUser = yield prisma_1.default.user.update({
                where: { id },
                data,
            });
            return {
                status: "success",
                message: "Membro atualizado com sucesso.",
                user: updatedUser,
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            yield prisma_1.default.user.delete({ where: { id } });
            return { message: "Usuário deletado com sucesso" };
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.default.user.findMany();
            return {
                status: "success",
                message: "Todos os alunos foram listados.",
                data: users,
            };
        });
    }
    sendTemporaryPasswordEmail(email, temporaryPassword) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield request;
                console.log("Mailjet Response:", result.body);
                if (result.body.Messages[0].Status !== "success") {
                    console.error("Erro ao enviar o e-mail com a senha temporária:", result.body);
                    throw new Error("Erro ao enviar o e-mail com a senha temporária.");
                }
                else {
                    console.log("E-mail enviado com sucesso para:", email);
                }
            }
            catch (error) {
                console.error("Erro ao enviar e-mail:", error);
                throw new Error("Erro ao enviar o e-mail com a senha temporária.");
            }
        });
    }
}
exports.UserService = UserService;
