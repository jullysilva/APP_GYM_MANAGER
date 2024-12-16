import { ButtonListProps } from "../../../@types/app.list";

export enum RoutesButtonEnum {
  PROFILE_PERSONAL = "ProfilePersonal",
  PROFILE_TERMS = "ProfileTerms",
  PROFILE_WALLET = "ProfileWallet",
  PROFILE_POLICY = "ProfilePolicy",
  PROFILE_FAQ = "ProfileFAQ",
}

const listButtonMenu: ButtonListProps[] = [
  {
    id: 1,
    title: "Dados pessoais",
    nameIcon: "user",
    route: RoutesButtonEnum.PROFILE_PERSONAL,
  },
  {
    id: 2,
    title: "Carteira",
    nameIcon: "user",
    route: RoutesButtonEnum.PROFILE_WALLET,
  },
  {
    id: 3,
    title: "Termos de uso",
    nameIcon: "check-square",
    route: RoutesButtonEnum.PROFILE_TERMS,
  },
  {
    id: 5,
    title: "Política de privacidade",
    nameIcon: "lock",
    route: RoutesButtonEnum.PROFILE_POLICY,
  },

  {
    id: 7,
    title: "FAQ",
    nameIcon: "question-circle",
    route: RoutesButtonEnum.PROFILE_FAQ,
  },
];

export default listButtonMenu;
