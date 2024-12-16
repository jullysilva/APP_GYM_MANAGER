import { RoutesEnum } from "../screens/app/Info/list";
import { RoutesButtonEnum } from "../screens/app/Profile/buttonList";

export interface ItemListProps {
  id: number;
  title: string;
  subTitle?: string;
  route?: RoutesEnum;
}

export interface ButtonListProps {
  id: number;
  title: string;
  nameIcon?: string;
  route: RoutesButtonEnum;
}
