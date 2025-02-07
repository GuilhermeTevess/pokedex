import styled from "@emotion/styled";

export const Background = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  /*
    Usaremos 4 backgrounds:
      1. body_bg (lado esquerdo, colado) – camada superior (para sobrepor o container)
      2. body_bg (lado direito, colado) – camada superior (para sobrepor o container)
      3. container_bg (lado esquerdo, 250px para dentro) – camada inferior
      4. container_bg (lado direito, 250px para dentro) – camada inferior
  */
  background-image: 
    url('/imgs/body_bg.png'),
    url('/imgs/body_bg.png'),
    url('/imgs/container_bg.png'),
    url('/imgs/container_bg.png');
  background-repeat: repeat-y, repeat-y, repeat-y, repeat-y;
  background-position: 
    left top,         /* 1. Lado esquerdo: body (colado) */
    right top,        /* 2. Lado direito: body (colado) */
    250px top,        /* 3. Lado esquerdo: container (250px para dentro) */
    right 250px top;  /* 4. Lado direito: container (250px para dentro) */
  background-size: 
    290px auto,
    290px auto,
    250px auto,
    250px auto;
`;
