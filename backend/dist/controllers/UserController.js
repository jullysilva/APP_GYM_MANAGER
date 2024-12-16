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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    createUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.UserService();
            const data = request.body;
            try {
                const { success, message, user } = yield userService.create(data);
                reply.status(201).send({ success, message, user });
            }
            catch (error) {
                reply.status(400).send({ status: "error", message: error.message });
            }
        });
    }
    authenticateUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.UserService();
            const data = request.body;
            try {
                const { token, user } = yield userService.authenticate(data);
                reply.send({ status: "success", token, user });
            }
            catch (error) {
                reply.status(401).send({ status: "error", message: error.message });
            }
        });
    }
    read(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.UserService();
            const { id } = request.params;
            try {
                const user = yield userService.read(id);
                reply.send(user);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    patch(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.UserService();
            const { id } = request.params;
            const data = request.body;
            try {
                const { status, message, user } = yield userService.patch(id, data);
                reply.send({ status, message, user });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    delete(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.UserService();
            const { id } = request.params;
            try {
                const result = yield userService.delete(id);
                reply.send(result);
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
    list(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.UserService();
            const { gymId } = request.query;
            try {
                const { status, message, data } = yield userService.list();
                reply.send({ status, message, data });
            }
            catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
