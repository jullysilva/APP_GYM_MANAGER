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
exports.TrainingSheetService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class TrainingSheetService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, activity, userId, exerciseIds, }) {
            if (!title || !activity) {
                throw new Error("All fields are required");
            }
            const trainingSheet = yield prisma_1.default.trainingSheet.create({
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
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingSheet = yield prisma_1.default.trainingSheet.findUnique({
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
        });
    }
    update(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { userId, title, activity, exerciseIds }) {
            const trainingSheet = yield prisma_1.default.trainingSheet.update({
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
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.trainingSheet.delete({ where: { id } });
            return { message: "Ficha de treino deletada com sucesso." };
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.default.trainingSheet.findMany();
            return {
                status: "success",
                message: "Todas as fichas foram fornecidas.",
                data,
            };
        });
    }
    listByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.default.trainingSheet.findMany({
                where: { userId },
            });
            return {
                status: "success",
                message: "Fichas de treino do usuário fornecidas.",
                data,
            };
        });
    }
}
exports.TrainingSheetService = TrainingSheetService;
