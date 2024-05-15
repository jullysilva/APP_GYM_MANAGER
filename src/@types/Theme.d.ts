export interface Theme {
    typography: {
      RobotoThin: IStyledComponent;
      RobotoLight: IStyledComponent;
      RobotoRegular: IStyledComponent;
      RobotoMedium: IStyledComponent;
      RobotoBold: IStyledComponent;
      RobotoBlack: IStyledComponent;
      RobotoThinBlack: IStyledComponent;
      RobotoLightItalic: IStyledComponent;
      RobotoRegularItalic: IStyledComponent;
      RobotoMediumItalic: IStyledComponent;
      RobotoBoldItalic: IStyledComponent;
      RobotoBlackItalic: IStyledComponent;
    };
    size: {
      s2: string;
      s4: string;
      s8: string;
      s16: string;
      s32: string;
      s64: string;
    };
    color: {
      primary: string;
      secundary: string;
      
      gray_100: string;
      gray_400: string;
      gray_800: string;
      gray_900: string;

      shape: string;
      fild: string;
      black:string;

      text: string;
      title: string;

      yellow: string;
      red: string;
    };
  }
  