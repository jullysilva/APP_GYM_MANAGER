import { z } from "zod";
import {
  ExerciseSchema,
  ProfileGymSchema,
  RegisterAlunoSchema,
  RegisterTrainningSheetSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from "./UserSchema";

export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type RegisterAluno = z.infer<typeof RegisterAlunoSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type RegisterTrainningSheet = z.infer<
  typeof RegisterTrainningSheetSchema
>;
export type ProfileGym = z.infer<typeof ProfileGymSchema>;
