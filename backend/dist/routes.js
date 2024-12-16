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
exports.routes = void 0;
const ExerciseController_1 = require("./controllers/ExerciseController");
const UserController_1 = require("./controllers/UserController");
const ManagerController_1 = require("./controllers/ManagerController");
const GymController_1 = require("./controllers/GymController");
const HealthFileController_1 = require("./controllers/HealthFileController");
const TrainingSheetController_1 = require("./controllers/TrainingSheetController");
const exerciseController = new ExerciseController_1.ExerciseController();
const userController = new UserController_1.UserController();
const managerController = new ManagerController_1.ManagerController();
const gymController = new GymController_1.GymController();
const healthFileController = new HealthFileController_1.HealthFileController();
const trainingSheetController = new TrainingSheetController_1.TrainingSheetController();
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        /* --------- START EXERCISE -------------- */
        fastify.post("/exercises", exerciseController.create.bind(exerciseController));
        fastify.get("/exercises/:id", exerciseController.read.bind(exerciseController));
        fastify.delete("/exercises/:id", exerciseController.delete.bind(exerciseController));
        fastify.patch("/exercises/:id", exerciseController.patch.bind(exerciseController));
        fastify.get("/exercises", exerciseController.list.bind(exerciseController));
        /* --------- END EXERCISE -------------- */
        /* --------- START USER -------------- */
        fastify.post("/user", userController.createUser.bind(userController));
        fastify.post("/user/authenticate", userController.authenticateUser.bind(userController));
        fastify.get("/user/:id", userController.read.bind(userController));
        fastify.patch("/user/:id", userController.patch.bind(userController));
        fastify.delete("/user/:id", userController.delete.bind(userController));
        fastify.get("/users", userController.list.bind(userController));
        /* --------- END USER -------------- */
        /* --------- START MANAGER -------------- */
        fastify.post("/manager", managerController.createManager.bind(managerController));
        fastify.post("/manager/login", managerController.loginManager.bind(managerController));
        fastify.get("/manager/:id", managerController.readManager.bind(managerController));
        fastify.patch("/manager/:id", managerController.patchManager.bind(managerController));
        /* --------- END MANAGER -------------- */
        /* --------- START GYM -------------- */
        fastify.post("/gym", gymController.createGym.bind(gymController));
        fastify.get("/gym/:id", gymController.getGymByManager.bind(gymController));
        fastify.patch("/gym/:managerId", gymController.patchGym.bind(gymController));
        /* --------- END GYM -------------- */
        /* --------- START HEALTH FILE ROUTES -------------- */
        fastify.post("/healthfiles", healthFileController.create.bind(healthFileController));
        fastify.get("/healthfiles/:id", healthFileController.getById.bind(healthFileController));
        fastify.patch("/healthfiles/:id", healthFileController.update.bind(healthFileController));
        fastify.get("/healthfiles", healthFileController.list.bind(healthFileController));
        /* --------- END HEALTH FILE ROUTES -------------- */
        fastify.post("/training-sheets", trainingSheetController.create.bind(trainingSheetController));
        fastify.get("/training-sheets/:id", trainingSheetController.read.bind(trainingSheetController));
        fastify.delete("/training-sheets/:id", trainingSheetController.delete.bind(trainingSheetController));
        fastify.patch("/training-sheets/:id", trainingSheetController.update.bind(trainingSheetController));
        fastify.get("/training-sheets", trainingSheetController.list.bind(trainingSheetController));
        /* --------- END TRAINING SHEET -------------- */
    });
}
exports.routes = routes;
