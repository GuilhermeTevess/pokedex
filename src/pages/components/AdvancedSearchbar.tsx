// AdvancedSearchBar.tsx
import styled from "@emotion/styled";
import { useState } from "react";

const BarContainer = styled.div`
  width: 1274px;  /* Mesmo tamanho do container da barra de busca */
  margin: 0 auto;
`;

const AdvancedBar = styled.div`
  background-color: #838080;
  height: 50px;
  width: 100%;
  /* Clip-path para criar a depressão trapezoidal no centro */
  clip-path: polygon(
    0 0,
    100% 0,
    100% 70%,
    75% 70%,
    70% 100%,
    30% 100%,
    25% 70%,
    0 70%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  user-select: none;
`;

export function AdvancedSearchBar() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <BarContainer>
      <AdvancedBar onClick={() => setShowAdvanced(!showAdvanced)}>
        Mostrar busca avançada
      </AdvancedBar>
      {showAdvanced && (
        <div>
          {/* Aqui você pode inserir o conteúdo dos filtros avançados */}
        </div>
      )}
    </BarContainer>
  );
}
