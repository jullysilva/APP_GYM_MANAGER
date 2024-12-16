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
exports.ManagerController = void 0;
const ManagerService_1 = require("../services/ManagerService");
class ManagerController {
    createManager(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const managerService = new ManagerService_1.ManagerService();
            const data = request.body;
            try {
                const { status, manager, token } = yield managerService.create(data);
                reply.status(201).send({ status, manager, token });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    loginManager(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const managerService = new ManagerService_1.ManagerService();
            const data = request.body;
            try {
                const { status, manager, token } = yield managerService.login(data);
                reply.send({ status, manager, token });
            }
            catch (error) {
                reply.status(401).send({ error: error.message });
            }
        });
    }
    readManager(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const managerService = new ManagerService_1.ManagerService();
            const { id } = request.params;
            try {
                const { status, message, data } = yield managerService.read(id);
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    patchManager(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const managerService = new ManagerService_1.ManagerService();
            const { id } = request.params;
            const data = request.body;
            try {
                const manager = yield managerService.patch(id, data);
                reply.send(manager);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    deleteManager(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const managerService = new ManagerService_1.ManagerService();
            const { id } = request.params;
            try {
                const result = yield managerService.delete(id);
                reply.send(result);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
}
exports.ManagerController = ManagerController;
