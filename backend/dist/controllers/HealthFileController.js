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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthFileController = void 0;
const HealthFileService_1 = require("../services/HealthFileService");
class HealthFileController {
    constructor() {
        this.healthFileService = new HealthFileService_1.HealthFileService();
    }
    create(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name_personal_trainer, lesion, diabetes, surgery, hypertension, userId, } = request.body;
                const healthFile = yield this.healthFileService.create({
                    name_personal_trainer,
                    lesion,
                    diabetes,
                    surgery,
                    hypertension,
                    userId,
                });
                reply.send(healthFile);
            }
            catch (error) {
                reply
                    .status(500)
                    .send({ error: "Internal Server Error", message: error.message });
            }
        });
    }
    getById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const healthFile = yield this.healthFileService.getById(id);
                reply.send(healthFile);
            }
            catch (error) {
                reply.status(404).send({ error: "Not Found", message: error.message });
            }
        });
    }
    update(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { name_personal_trainer, lesion, diabetes, surgery, hypertension } = request.body;
                const updatedHealthFile = yield this.healthFileService.update({
                    id,
                    name_personal_trainer,
                    lesion,
                    diabetes,
                    surgery,
                    hypertension,
                });
                reply.send(updatedHealthFile);
            }
            catch (error) {
                reply
                    .status(500)
                    .send({ error: "Internal Server Error", message: error.message });
            }
        });
    }
    list(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, message, data } = yield this.healthFileService.getAllHealth();
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
}
exports.HealthFileController = HealthFileController;
