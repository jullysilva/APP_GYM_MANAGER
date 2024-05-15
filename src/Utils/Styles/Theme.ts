import { Theme } from "Theme";
import {
  RobotoBlack,
  RobotoBlackItalic,
  RobotoBold,
  RobotoBoldItalic,
  RobotoLight,
  RobotoLightItalic,
  RobotoMedium,
  RobotoMediumItalic,
  RobotoRegular,
  RobotoRegularItalic,
  RobotoThin,
  RobotoThinBlack,
} from "./Typhography.styled";

export const theme: Theme = {
  typography: {
    RobotoThin: RobotoThin,
    RobotoLight: RobotoLight,
    RobotoRegular: RobotoRegular,
    RobotoMedium: RobotoMedium,
    RobotoBold: RobotoBold,
    RobotoBlack: RobotoBlack,
    RobotoThinBlack: RobotoThinBlack,
    RobotoLightItalic: RobotoLightItalic,
    RobotoRegularItalic: RobotoRegularItalic,
    RobotoMediumItalic: RobotoMediumItalic,
    RobotoBoldItalic: RobotoBoldItalic,
    RobotoBlackItalic: RobotoBlackItalic,
  },
  size: {
    s2: "2vh",
    s4: "4vh",
    s8: "8vh",
    s16: "16vh",
    s32: "32vh",
    s64: "64vh",
  },
  color: {
    primary: "#4048BF",
    secundary: "#514BC3",

    gray_100: "#E1E1E6",
    gray_400: "#7C7C8A",
    gray_800: "#202024",
    gray_900: "#121214",

    shape: "#fafcfd",
    fild: "#eeeefd",
    black: "#090B0A",

    text: "#818191",
    title: "#101d42",

    yellow: "#ffc60b",
    red: "#E73535",
  },
};
