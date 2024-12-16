import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ExerciseController } from "./controllers/ExerciseController";
import { UserController } from "./controllers/UserController";
import { ManagerController } from "./controllers/ManagerController";
import { GymController } from "./controllers/GymController";
import { HealthFileController } from "./controllers/HealthFileController";
import { TrainingSheetController } from "./controllers/TrainingSheetController";

const exerciseController = new ExerciseController();
const userController = new UserController();
const managerController = new ManagerController();
const gymController = new GymController();
const healthFileController = new HealthFileController();
const trainingSheetController = new TrainingSheetController();

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  /* --------- START EXERCISE -------------- */
  fastify.post(
    "/exercises",
    exerciseController.create.bind(exerciseController)
  );
  fastify.get(
    "/exercises/:id",
    exerciseController.read.bind(exerciseController)
  );
  fastify.delete(
    "/exercises/:id",
    exerciseController.delete.bind(exerciseController)
  );
  fastify.patch(
    "/exercises/:id",
    exerciseController.patch.bind(exerciseController)
  );
  fastify.get("/exercises", exerciseController.list.bind(exerciseController));
  /* --------- END EXERCISE -------------- */

  /* --------- START USER -------------- */
  fastify.post("/user", userController.createUser.bind(userController));
  fastify.post(
    "/user/authenticate",
    userController.authenticateUser.bind(userController)
  );
  fastify.get("/user/:id", userController.read.bind(userController));
  fastify.patch("/user/:id", userController.patch.bind(userController));
  fastify.delete("/user/:id", userController.delete.bind(userController));
  fastify.get("/users", userController.list.bind(userController));
  /* --------- END USER -------------- */

  /* --------- START MANAGER -------------- */
  fastify.post(
    "/manager",
    managerController.createManager.bind(managerController)
  );
  fastify.post(
    "/manager/login",
    managerController.loginManager.bind(managerController)
  );
  fastify.get(
    "/manager/:id",
    managerController.readManager.bind(managerController)
  );
  fastify.patch(
    "/manager/:id",
    managerController.patchManager.bind(managerController)
  );
  /* --------- END MANAGER -------------- */

  /* --------- START GYM -------------- */
  fastify.post("/gym", gymController.createGym.bind(gymController));
  fastify.get("/gym/:id", gymController.getGymByManager.bind(gymController));
  fastify.patch("/gym/:managerId", gymController.patchGym.bind(gymController));
  /* --------- END GYM -------------- */

  /* --------- START HEALTH FILE ROUTES -------------- */
  fastify.post(
    "/healthfiles",
    healthFileController.create.bind(healthFileController)
  );
  fastify.get(
    "/healthfiles/:id",
    healthFileController.getById.bind(healthFileController)
  );
  fastify.patch(
    "/healthfiles/:id",
    healthFileController.update.bind(healthFileController)
  );
  fastify.get(
    "/healthfiles",
    healthFileController.list.bind(healthFileController)
  );

  /* --------- END HEALTH FILE ROUTES -------------- */

  fastify.post(
    "/training-sheets",
    trainingSheetController.create.bind(trainingSheetController)
  );
  fastify.get(
    "/training-sheets/:id",
    trainingSheetController.read.bind(trainingSheetController)
  );
  fastify.delete(
    "/training-sheets/:id",
    trainingSheetController.delete.bind(trainingSheetController)
  );
  fastify.patch(
    "/training-sheets/:id",
    trainingSheetController.update.bind(trainingSheetController)
  );
  fastify.get(
    "/training-sheets",
    trainingSheetController.list.bind(trainingSheetController)
  );
  /* --------- END TRAINING SHEET -------------- */
}
