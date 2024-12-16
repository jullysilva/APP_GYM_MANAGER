import React, { useEffect } from "react";
import {
  BackgroundWrapper,
  Container,
  H1,
  Link,
  Text,
} from "./NotFound.styled";

const NotFound = () => {
  useEffect(() => {
    const visual = document.getElementById("visual");
    const updateRotation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = 45 / (width / height);
      if (visual) {
        visual.style.transform = `translate(-50%, -50%) rotate(-${ratio}deg)`;
      }
    };

    // Atualiza a rotação quando a janela é redimensionada ou carregada
    window.addEventListener("resize", updateRotation);
    window.addEventListener("load", updateRotation);

    // Remove os event listeners ao desmontar o componente
    return () => {
      window.removeEventListener("resize", updateRotation);
      window.removeEventListener("load", updateRotation);
    };
  }, []);

  return (
    <Container>
      <Link className="link" href="/">
        <svg
          height="0.8em"
          width="0.8em"
          viewBox="0 0 2 1"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#ffc60b"
            strokeWidth="0.1"
            points="0.9,0.1 0.1,0.5 0.9,0.9"
          />
        </svg>{" "}
        Login
      </Link>
      <BackgroundWrapper>
        <H1 id="visual" data-testid="visual">
          404
        </H1>
      </BackgroundWrapper>
      <Text>
        Desculpe, a página que você está procurando não foi encontrada.
      </Text>
    </Container>
  );
};

export default NotFound;
