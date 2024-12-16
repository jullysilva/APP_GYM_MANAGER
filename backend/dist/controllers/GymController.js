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
exports.GymController = void 0;
const GymService_1 = require("../services/GymService");
class GymController {
    createGym(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const gymService = new GymService_1.GymService();
            const { name, zip_code, street, number, neighborhood, city, state, complement, about, phone, managerId, } = request.body;
            try {
                const { status, message, data } = yield gymService.createGym({
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
                });
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    readGym(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const gymService = new GymService_1.GymService();
            const { id } = request.params;
            try {
                const Gym = yield gymService.readGym(id);
                reply.send(Gym);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    patchGym(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const gymService = new GymService_1.GymService();
            const { managerId } = request.params;
            const data = request.body;
            try {
                const { status, message, gym } = yield gymService.patchGym(managerId, data);
                reply.send({ status, message, data: gym });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    getGymByManager(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const gymService = new GymService_1.GymService();
            const { id } = request.params;
            try {
                const { status, message, data } = yield gymService.getGymByManager(id);
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
}
exports.GymController = GymController;
