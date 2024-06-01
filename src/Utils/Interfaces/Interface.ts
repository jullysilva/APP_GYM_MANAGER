export interface IMember {
  id: number;
  codigo: string;
  name: string;
  email: string;
  telephone: string;
  isTrainer: boolean;
}

export interface IExercise {
  id: number;
  name: string;
  category: string;
  equipamento: string;
  serie: number;
  nRepeticao: number;
  intervalo: number;
}

export interface ICategory {
  value: string;
  label: string;
}

export interface IProfileGym {
  academia: string;
  code: string;
  logradouro: string;
  number: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  adicional: string;
}

export interface IAdmManager {
  id?: number;
  code: number;
  nome: string;
  email: string;
  isAdmin: boolean;
}
