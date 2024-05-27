import { GridRowsProp } from "@mui/x-data-grid";
import { ICategory } from "Utils/Interfaces/Interface";
import { InfoManagerGym } from "Utils/Schemas";

export const AcademiaMock: InfoManagerGym = {
  academy: "BodyZod",
  code: 8527419,
  cep: "12345-678",
  logradouro: "Rua Exemplo",
  numero: "123",
  bairro: "Bairro Exemplo",
  cidade: "Cidade Exemplo",
};

export const Category: ICategory[] = [
  { value: "cardio", label: "Cardio" },
  { value: "goodshape", label: "Good Shape" },
  { value: "feminino", label: "Feminino" },
  { value: "masculino", label: "Masculino" },
  { value: "bodybuilding", label: "Bodybuilding" },
];

export const MemberMock: GridRowsProp = [
  {
    id: 1,
    codigo: "123456",
    name: "Ana Sousa",
    email: "ana@example.com",
    telephone: "123456789",
    isTrainer: true,
    pagamento: "Pago",
  },
  {
    id: 2,
    codigo: "654321",
    name: "Bruno Lima",
    email: "bruno@example.com",
    telephone: "987654321",
    isTrainer: false,
    pagamento: "Pendente",
  },
  {
    id: 3,
    codigo: "789456",
    name: "Carlos Santos",
    email: "carlos@example.com",
    telephone: "987123456",
    isTrainer: false,
    pagamento: "Atrasado",
  },
];

export const ExerciseMock: GridRowsProp = [
  {
    id: 1,
    name: "Agachamento Livre",
    category: "Pernas",
    equipamento: "Barra",
    serie: 3,
    nRepeticao: 12,
    intervalo: 60,
  },
  {
    id: 2,
    name: "Supino Reto",
    category: "Peitoral",
    equipamento: "Banco de Supino",
    serie: 4,
    nRepeticao: 10,
    intervalo: 45,
  },
  {
    id: 3,
    name: "Remada Curvada",
    category: "Costas",
    equipamento: "Barra",
    serie: 4,
    nRepeticao: 12,
    intervalo: 60,
  },
  {
    id: 4,
    name: "Rosca Direta",
    category: "Braços",
    equipamento: "Barra EZ",
    serie: 3,
    nRepeticao: 15,
    intervalo: 60,
  },
  {
    id: 5,
    name: "Elevação Lateral",
    category: "Ombros",
    equipamento: "Halteres",
    serie: 3,
    nRepeticao: 12,
    intervalo: 45,
  },
  {
    id: 6,
    name: "Abdominais",
    category: "Abdominais",
    equipamento: "Nenhum",
    serie: 3,
    nRepeticao: 20,
    intervalo: 30,
  },
  {
    id: 7,
    name: "Flexão de Braços",
    category: "Peitoral",
    equipamento: "Nenhum",
    serie: 4,
    nRepeticao: 15,
    intervalo: 45,
  },
  {
    id: 8,
    name: "Pulldown",
    category: "Costas",
    equipamento: "Máquina Pulldown",
    serie: 3,
    nRepeticao: 12,
    intervalo: 60,
  },
  {
    id: 9,
    name: "Agachamento Hack",
    category: "Pernas",
    equipamento: "Máquina Hack",
    serie: 3,
    nRepeticao: 10,
    intervalo: 60,
  },
  {
    id: 10,
    name: "Rosca Concentrada",
    category: "Braços",
    equipamento: "Halter",
    serie: 3,
    nRepeticao: 12,
    intervalo: 45,
  },
];
