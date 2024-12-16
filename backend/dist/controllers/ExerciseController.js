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
exports.ExerciseController = void 0;
const ExercisesService_1 = require("../services/ExercisesService");
class ExerciseController {
    create(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const exerciseService = new ExercisesService_1.ExerciseService();
            const { name, category, equipament, serie, num_rep, interval } = request.body;
            try {
                const exercise = yield exerciseService.create({
                    name,
                    category,
                    equipament,
                    serie,
                    num_rep,
                    interval,
                });
                reply.send(exercise);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    read(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const exerciseService = new ExercisesService_1.ExerciseService();
            const { id } = request.params;
            try {
                const exercise = yield exerciseService.read(id);
                reply.send(exercise);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    update(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const exerciseService = new ExercisesService_1.ExerciseService();
            const { id } = request.params;
            const { name, category, equipament, serie, num_rep, interval } = request.body;
            try {
                const exercise = yield exerciseService.update({
                    id,
                    name,
                    category,
                    equipament,
                    serie,
                    num_rep,
                    interval,
                });
                reply.send(exercise);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    patch(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const exerciseService = new ExercisesService_1.ExerciseService();
            const { id } = request.params;
            const data = request.body;
            try {
                const exercise = yield exerciseService.patch(id, data);
                reply.send(exercise);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    delete(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const exerciseService = new ExercisesService_1.ExerciseService();
            const { id } = request.params;
            try {
                const result = yield exerciseService.delete(id);
                reply.send(result);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    list(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const exerciseService = new ExercisesService_1.ExerciseService();
            try {
                const { status, message, data } = yield exerciseService.list();
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
}
exports.ExerciseController = ExerciseController;
