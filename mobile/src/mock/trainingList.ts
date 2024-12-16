export interface Exercise {
  id: number;
  name: string;
  category: string;
  equipment: string;
  series: number;
  repetitions: number;
  interval: number;
}

export const ExerciseMock: Exercise[] = [
  {
    id: 1,
    name: "Agachamento Livre",
    category: "Pernas",
    equipment: "Barra",
    series: 3,
    repetitions: 12,
    interval: 60,
  },
  {
    id: 2,
    name: "Supino Reto",
    category: "Peitoral",
    equipment: "Banco de Supino",
    series: 4,
    repetitions: 10,
    interval: 45,
  },
  {
    id: 3,
    name: "Remada Curvada",
    category: "Costas",
    equipment: "Barra",
    series: 4,
    repetitions: 12,
    interval: 60,
  },
  {
    id: 4,
    name: "Rosca Direta",
    category: "Braços",
    equipment: "Barra EZ",
    series: 3,
    repetitions: 15,
    interval: 60,
  },
  {
    id: 5,
    name: "Elevação Lateral",
    category: "Ombros",
    equipment: "Halteres",
    series: 3,
    repetitions: 12,
    interval: 45,
  },
  {
    id: 6,
    name: "Abdominais",
    category: "Abdominais",
    equipment: "Nenhum",
    series: 3,
    repetitions: 20,
    interval: 30,
  },
  {
    id: 7,
    name: "Flexão de Braços",
    category: "Peitoral",
    equipment: "Nenhum",
    series: 4,
    repetitions: 15,
    interval: 45,
  },
  {
    id: 8,
    name: "Pulldown",
    category: "Costas",
    equipment: "Máquina Pulldown",
    series: 3,
    repetitions: 12,
    interval: 60,
  },
  {
    id: 9,
    name: "Agachamento Hack",
    category: "Pernas",
    equipment: "Máquina Hack",
    series: 3,
    repetitions: 10,
    interval: 60,
  },
  {
    id: 10,
    name: "Rosca Concentrada",
    category: "Braços",
    equipment: "Halter",
    series: 3,
    repetitions: 12,
    interval: 45,
  },
];
