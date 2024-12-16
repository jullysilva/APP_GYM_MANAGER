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
exports.TrainingSheetController = void 0;
const TrainingSheetService_1 = require("../services/TrainingSheetService");
class TrainingSheetController {
    create(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingSheetService = new TrainingSheetService_1.TrainingSheetService();
            const { title, activity, userId, exerciseIds } = request.body;
            try {
                const { status, message, data } = yield trainingSheetService.create({
                    title,
                    activity,
                    userId,
                    exerciseIds,
                });
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    read(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingSheetService = new TrainingSheetService_1.TrainingSheetService();
            const { id } = request.params;
            try {
                const trainingSheet = yield trainingSheetService.read(id);
                reply.send(trainingSheet);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    update(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingSheetService = new TrainingSheetService_1.TrainingSheetService();
            const { id } = request.params;
            const data = request.body;
            try {
                const trainingSheet = yield trainingSheetService.update(id, data);
                reply.send(trainingSheet);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    delete(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingSheetService = new TrainingSheetService_1.TrainingSheetService();
            const { id } = request.params;
            try {
                const result = yield trainingSheetService.delete(id);
                reply.send(result);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    listByUserId(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingSheetService = new TrainingSheetService_1.TrainingSheetService();
            const { userId } = request.params;
            try {
                const { status, message, data } = yield trainingSheetService.listByUserId(userId);
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    list(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainingSheetService = new TrainingSheetService_1.TrainingSheetService();
            try {
                const { status, message, data } = yield trainingSheetService.list();
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
}
exports.TrainingSheetController = TrainingSheetController;
