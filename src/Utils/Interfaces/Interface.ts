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
