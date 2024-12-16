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
exports.ManagerService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRandomCode_1 = require("../utils/generateRandomCode");
class ManagerService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, document, phone, password } = data;
            if (!name || !document || !phone || !email || !password) {
                throw new Error("Todos os campos obrigatórios devem ser preenchidos");
            }
            // Verificar se o manager já está cadastrado
            const existingManager = yield prisma_1.default.manager.findUnique({
                where: { email },
            });
            if (existingManager) {
                // Gerar token JWT
                const token = jsonwebtoken_1.default.sign({ id: existingManager.id }, generateRandomCode_1.secretKey, {
                    expiresIn: "1h",
                });
                return { status: "success", manager: existingManager, token };
            }
            // Hash the password before storing it
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Criar um novo manager
            const manager = yield prisma_1.default.manager.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            });
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ id: manager.id }, generateRandomCode_1.secretKey, {
                expiresIn: "1h",
            });
            return { status: "success", manager, token };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const manager = yield prisma_1.default.manager.findUnique({ where: { email } });
            if (!manager) {
                throw new Error("Manager não encontrado");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, manager.password);
            if (!isPasswordValid) {
                throw new Error("Senha incorreta");
            }
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ id: manager.id }, generateRandomCode_1.secretKey, {
                expiresIn: "4h",
            });
            return { status: "success", manager, token };
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const manager = yield prisma_1.default.manager.findUnique({ where: { id } });
            if (!manager) {
                throw new Error("Manager não encontrado");
            }
            return {
                status: "success",
                message: "Sem informações do gerente.",
                data: manager,
            };
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = data;
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const manager = yield prisma_1.default.manager.update({
                where: { id },
                data,
            });
            return manager;
        });
    }
    patch(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const manager = yield prisma_1.default.manager.update({
                where: { id },
                data,
            });
            return manager;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            yield prisma_1.default.manager.delete({ where: { id } });
            return { message: "Manager deletado com sucesso" };
        });
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = yield prisma_1.default.manager.findMany();
            return authorization;
        });
    }
}
exports.ManagerService = ManagerService;
