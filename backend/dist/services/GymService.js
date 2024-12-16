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
exports.GymService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const generateRandomCode_1 = __importDefault(require("../utils/generateRandomCode"));
class GymService {
    createGym(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, zip_code, street, number, neighborhood, city, state, complement, about, phone, managerId, }) {
            if (!name ||
                !zip_code ||
                !street ||
                number === undefined ||
                !neighborhood ||
                !city ||
                !state ||
                phone === undefined ||
                !managerId) {
                throw new Error("Todos os campos são obrigatórios");
            }
            const code = String((0, generateRandomCode_1.default)(6));
            const data = {
                code: code,
                name,
                zip_code,
                street,
                number,
                neighborhood,
                city,
                state,
                complement,
                about,
                phone,
                managerId,
            };
            const gym = yield prisma_1.default.gym.create({ data });
            return {
                status: "success",
                message: "Academia cadastrado com sucesso.",
                data: gym,
            };
        });
    }
    readGym(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const profile = yield prisma_1.default.gym.findUnique({
                where: { id },
            });
            if (!profile) {
                throw new Error("Dados de academia não encontrados.");
            }
            return profile;
        });
    }
    patchGym(managerId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!managerId) {
                throw new Error("ID do gerente é obrigatório.");
            }
            // Verificar se a academia existe antes de atualizar
            const gymExists = yield prisma_1.default.gym.findUnique({
                where: { managerId },
            });
            if (!gymExists) {
                return {
                    status: "error",
                    message: "Academia não encontrada.",
                    data: null,
                };
            }
            const id = gymExists === null || gymExists === void 0 ? void 0 : gymExists.id;
            const gym = yield prisma_1.default.gym.update({
                where: { id },
                data,
            });
            return {
                status: "success",
                message: "Atualizado com sucesso.",
                gym,
            };
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield prisma_1.default.gym.findMany();
            return profile;
        });
    }
    getGymByManager(managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!managerId) {
                throw new Error("ID do gerente é obrigatório");
            }
            const gym = yield prisma_1.default.gym.findUnique({
                where: { managerId },
            });
            return gym
                ? {
                    status: "success",
                    message: "Academia encontrada.",
                    data: gym,
                }
                : {
                    status: 500,
                    message: "Academia não cadastrada.",
                    data: null,
                };
        });
    }
}
exports.GymService = GymService;
