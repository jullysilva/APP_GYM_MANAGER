import { z } from "zod";
import {
  ExerciseSchema,
  ProfileGymSchema,
  MemberSchema,
  TrainningSheetSchema,
  UserLoginSchema,
  ManagerSchema,
} from "./UserSchema";

export type UserLogin = z.infer<typeof UserLoginSchema>;
export type ManagerRegister = z.infer<typeof ManagerSchema>;
export type RegisterAluno = z.infer<typeof MemberSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type TrainningSheet = z.infer<typeof TrainningSheetSchema>;
export type ProfileGym = z.infer<typeof ProfileGymSchema>;
