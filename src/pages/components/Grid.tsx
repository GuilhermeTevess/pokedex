// /components/Grid.tsx
import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: start;
`;
