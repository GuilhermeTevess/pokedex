import styled from "@emotion/styled";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
}

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.span`
  width: 100px;
  font-size: 0.9rem;
  color: #333;
  text-transform: capitalize;
`;

const BarBackground = styled.div`
  flex: 1;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 10px;
`;

const BarFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #6890f0; /* Azul */
  transition: width 0.3s ease-in-out;
`;

export default function StatBar({ label, value, max = 100 }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <StatContainer>
      <Label>{label}</Label>
      <BarBackground>
        <BarFill width={percentage} />
      </BarBackground>
    </StatContainer>
  );
}
