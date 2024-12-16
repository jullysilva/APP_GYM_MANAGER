// Enums
export enum StatusPayment {
    PENDENTE = "PENDENTE",
    ATRASADO = "ATRASADO",
    PAGO = "PAGO",
  }
  
  export enum ActivityType {
    CARDIO = "CARDIO",
    GOODSHAPE = "GOODSHAPE",
    FEMININO = "FEMININO",
    MASCULINO = "MASCULINO",
    BODYBUILDER = "BODYBUILDER",
  }
  
  export enum GroupType {
    PERNAS = "PERNAS",
    TRICEPS = "TRICEPS",
    BICEPS = "BICEPS",
    BRACOS = "BRACOS",
    COSTAS = "COSTAS",
    PEITO = "PEITO",
    OMBROS = "OMBROS",
  }
  
  // Interfaces
  export interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    status: StatusPayment;
    photo?: string;
    active: boolean;
    cpf: string;
    isTrainer: boolean;
    cref?: string;
    weight?: number;
    height?: number;
    phone?: string;
    birth?: string;
    gender?: string;
    firstAccess: Boolean;
    refresh_token?: string;
    healthFileId?: string;
    healthFile?: HealthFile;
    trainingSheets?: TrainingSheet[];
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface HealthFile {
    id?: string;
    name_personal_trainer?: string;
    lesion?: boolean;
    diabetes?: boolean;
    surgery?: boolean;
    hypertension?: boolean;
    userId: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface TrainingSheet {
    id: string;
    title: string;
    exerciseIds?: [];
    activity: ActivityType;
    userId?: string;
    user?: User;
    created_at?: Date;
    updated_at?: Date;
    exercises?: Exercises[];
  }
  
  export interface Exercises {
    _id: number;
    id?: string;
    name: string;
    category: GroupType;
    equipament: string;
    serie: number;
    num_rep: number;
    interval: number;
    created_at?: Date;
    updated_at?: Date;
    trainingSheetId?: string;
    trainingSheet?: TrainingSheet;
  }
  
  export interface Manager {
    id: string;
    name: string;
    document: string;
    photo?: string;
    phone: string;
    email: string;
    password: string;
    gym?: Gym;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface Gym {
    id: string;
    name: string;
    phone: string;
    about?: string;
    code: string;
    zip_code: string;
    number: number;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    manager?: Manager;
    managerId: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface CreditCard  {
    cardNumber: string;
    expiryDate: string
    cvv: string;
  }