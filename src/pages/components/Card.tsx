import styled from '@emotion/styled';

const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const Id = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const Types = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const TypeBadge = styled.span`
  background-color: ${(props) => props.color || '#ddd'};
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
`;

interface CardProps {
  num: string;
  name: string;
  sprite: string;
  types: { type: { name: string } }[];
  typeColors: Record<string, string>;
}

export default function Card({ num, name, sprite, types, typeColors }: CardProps) {
  return (
    <CardContainer>
      <Image src={sprite} alt={name} />
      <Id>N\u00ba {String(num).padStart(3, '0')}</Id>
      <Name>{name}</Name>
      <Types>
        {types.map((typeInfo, index) => (
          <TypeBadge key={index} color={typeColors[typeInfo.type.name]}>
            {typeInfo.type.name}
          </TypeBadge>
        ))}
      </Types>
    </CardContainer>
  );
}
