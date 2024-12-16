export interface ILogin {
  email: string;
  name: string;
  token: string;
  manager: IManager;
}
export interface IMember {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  isTrainer: boolean;
  active: boolean;
  cref?: string;
  status: string;
  HealthFile?: null;
}

export interface IExercise {
  id?: string;
  name: string;
  category: string;
  equipament: string;
  serie: number;
  num_rep: number;
  interval: number;
}

export interface ITrainingSheet {
  id?: string;
  title: string;
  userId?: string;
  activity: string;
  exerciseIds: string[];
}

export interface ICategory {
  value: string;
  label: string;
}

export interface IGym {
  name: string;
  zip_code: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  about?: string;
  phone: string;
  managerId?: string;
}

export interface IManager {
  id?: string;
  name?: string;
  document?: string;
  photo?: string;
  phone?: string;
  email?: string;
  password?: string;
}
