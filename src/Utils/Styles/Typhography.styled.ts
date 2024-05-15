import styled from "styled-components";

interface TextProps {
    size?: string;
}

export const RobotoThin = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    font-style: normal;
    font-size: ${({ size }) => size || '16px' };
`;

export const RobotoLight = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoRegular = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoMedium = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoBold = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoBlack = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: ${({ size }) => size || '16px' };

`;
  
export const RobotoThinBlack = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    font-style: italic;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoLightItalic = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-style: italic;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoRegularItalic = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: italic;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoMediumItalic = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: italic;
    font-size: ${({ size }) => size || '16px' };

`;

export const RobotoBoldItalic = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: ${({ size }) => size || '16px' };

`;
  
export const RobotoBlackItalic = styled.p<TextProps>`
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-style: italic;
    font-size: ${({ size }) => size || '16px' };

`;
  