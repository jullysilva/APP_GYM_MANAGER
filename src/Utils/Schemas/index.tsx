import { z } from "zod";
import {
  ExerciseSchema,
  InfoManagerGymSchema,
  RegisterAlunoSchema,
  RegisterTrainningSheetSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from "./UserSchema";

export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type RegisterAluno = z.infer<typeof RegisterAlunoSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type InfoManagerGym = z.infer<typeof InfoManagerGymSchema>;
export type RegisterTrainningSheet = z.infer<
  typeof RegisterTrainningSheetSchema
>;
