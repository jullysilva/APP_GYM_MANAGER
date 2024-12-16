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
exports.ExerciseService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ExerciseService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, category, equipament, serie, num_rep, interval, }) {
            if (!name ||
                !category ||
                !equipament ||
                serie === undefined ||
                num_rep === undefined ||
                interval === undefined) {
                throw new Error("Todos os campos são obrigatórios");
            }
            const exercise = yield prisma_1.default.exercises.create({
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
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const exercise = yield prisma_1.default.exercises.findUnique({
                where: { id },
            });
            if (!exercise) {
                throw new Error("Exercício não encontrado");
            }
            return exercise;
        });
    }
    update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, category, equipament, serie, num_rep, interval, }) {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const exercise = yield prisma_1.default.exercises.update({
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
        });
    }
    patch(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const exercise = yield prisma_1.default.exercises.update({
                where: { id },
                data,
            });
            return exercise;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            yield prisma_1.default.exercises.delete({
                where: { id },
            });
            return { message: "Exercício deletado com sucesso" };
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.default.exercises.findMany();
            return {
                status: "success",
                message: "Todos os exercícios foram fornecidos.",
                data,
            };
        });
    }
}
exports.ExerciseService = ExerciseService;
