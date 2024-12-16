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
exports.HealthFileService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class HealthFileService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name_personal_trainer, lesion, diabetes, surgery, hypertension, userId, }) {
            if (!name_personal_trainer ||
                lesion === undefined ||
                diabetes === undefined ||
                surgery === undefined ||
                hypertension === undefined ||
                !userId) {
                throw new Error("All fields are required");
            }
            const healthFile = yield prisma_1.default.healthFile.create({
                data: {
                    name_personal_trainer,
                    lesion,
                    diabetes,
                    surgery,
                    hypertension,
                    userId,
                },
            });
            return healthFile;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const healthFile = yield prisma_1.default.healthFile.findUnique({
                where: { id },
            });
            return healthFile;
        });
    }
    update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name_personal_trainer, lesion, diabetes, surgery, hypertension, }) {
            const healthFile = yield prisma_1.default.healthFile.update({
                where: { id },
                data: {
                    name_personal_trainer,
                    lesion,
                    diabetes,
                    surgery,
                    hypertension,
                },
            });
            return healthFile;
        });
    }
    getAllHealth() {
        return __awaiter(this, void 0, void 0, function* () {
            const healthFile = yield prisma_1.default.healthFile.findMany();
            return {
                status: "success",
                message: "Todas as fichas foram listados.",
                data: healthFile,
            };
        });
    }
}
exports.HealthFileService = HealthFileService;
