import { ItemListProps } from "../../../@types/app.list";
export enum RoutesEnum {
  InfoTreino = "InfoTreino",
  InfoSaude = "InfoSaude",
  
}

const listMenu: ItemListProps[] = [
  {
    id: 1,
    title: "Treino",
    subTitle: "",
    route: RoutesEnum.InfoTreino,
  },
  {
    id: 2,
    title: "Saúde",
    subTitle: "",
    route: RoutesEnum.InfoSaude,
  },

];

export default listMenu;
