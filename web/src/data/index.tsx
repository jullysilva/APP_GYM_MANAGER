import { IManager, ICategory, IGym } from "Utils/Interfaces/Interface";

export const AcademiaMock: IGym = {
  name: "BodyZod",
  zip_code: "12345678",
  neighborhood: "Rua Exemplo",
  number: 123,
  street: "Bairro Exemplo",
  city: "Cidade Exemplo",
  state: "MG",
  complement: "casa",
  about: "",
  phone: "1295175310",
  managerId: "fgdhjskmfnghtrikdl854268785fdsdfg",
};

export const AdmManagerMock: IManager[] = [
  {
    id: "1",
    name: "Valdecir Germano",
    email: "valdecirG@gmaiil.com",
    document: "852741963000085",
    photo: "",
    phone: "3112345685",
    password: "doby456",
  },
];

export const Category: ICategory[] = [
  { value: "CARDIO", label: "Cardio" },
  { value: "GOODSHAPE", label: "Good Shape" },
  { value: "FEMININO", label: "Feminino" },
  { value: "MASCULINO", label: "Masculino" },
  { value: "BODYBUILDER", label: "Bodybuilding" },
];

export const Grupo: ICategory[] = [
  { value: "ABDOMEN", label: "Abdômen" },
  { value: "QUADRIL", label: "Quadril" },
  { value: "ANTEBRACO", label: "Antebraço" },
  { value: "BICEPS", label: "Biceps" },
  { value: "CARDIO", label: "Cardio" },
  { value: "DELTOIDE", label: "Deltoide" },
  { value: "DORSAL", label: "Dolsal" },
  { value: "GLUTEO", label: "Glúteo" },
  { value: "ISQUIOTIBIAIS", label: "Isquiotibiais" },
  { value: "LOMBAR", label: "Lombar" },
  { value: "PANTURRILHA", label: "Panturrilha" },
  { value: "PEITORAL", label: "Peitoral" },
  { value: "QUADRICEPS", label: "Quadríceps" },
  { value: "TRAPEZIO", label: "Trapézio" },
  { value: "TRICEPS", label: "Tríceps" },
];

export const StatusPayment: ICategory[] = [
  { value: "PENDENTE", label: "PENDENTE" },
  { value: "PAGO", label: "PAGO" },
  { value: "ATRASADO", label: "ATRASADO" },
];
