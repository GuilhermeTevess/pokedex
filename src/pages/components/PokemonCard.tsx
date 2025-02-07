// /components/PokemonCard.tsx
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";

const Card = styled.div`
  padding: 20px;
  /* Removido o text-align para permitir alinhamento personalizado dos textos */
  transition: transform 0.2s ease-in-out;
  width: 250px;
  height: 350px;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div<{ color: string; color2?: string }>`
  background: ${(props) =>
    props.color2
      ? `linear-gradient(135deg, ${props.color} 50%, ${props.color2} 50%)`
      : props.color || "#ddd"};
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 160px;
  height: 160px;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinha os textos à esquerda */
  margin-top: 10px;
  width: 100%;
`;

const Id = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 5px 0 0 0;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
`;

const Types = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinha os badges à esquerda */
  gap: 5px;
  margin-top: 8px;
`;

const TypeBadge = styled.span`
  background-color: ${(props) => props.color || "#ddd"};
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  text-transform: capitalize;
  font-family: "Poppins", sans-serif;
`;

interface PokemonCardProps {
  pokemon: Pokemon;
  typeColors: Record<string, string>;
}

export function PokemonCard({ pokemon, typeColors }: PokemonCardProps) {
  const color1 = typeColors[pokemon.types[0].name.toLowerCase()] || "#ddd";
  const color2 = pokemon.types[1]
    ? typeColors[pokemon.types[1].name.toLowerCase()]
    : undefined;

  return (
    <Link href={`/pokemon/${pokemon.num}`} key={pokemon.num}>
      <Card>
        <ImageContainer color={color1} color2={color2}>
          <StyledImage
            src={`http://localhost:1337${pokemon.sprite.url}`}
            width={150}
            height={150}
            alt={`Imagem do Pokémon ${pokemon.name}`}
          />
        </ImageContainer>
        <CardText>
          <Id>Nº {String(pokemon.num).padStart(3, "0")}</Id>
          <Name>{pokemon.name}</Name>
          <Types>
            {pokemon.types.map((typeInfo) => (
              <TypeBadge
                key={typeInfo.name}
                color={typeColors[typeInfo.name.toLowerCase()] || "#ddd"}
              >
                {typeInfo.name}
              </TypeBadge>
            ))}
          </Types>
        </CardText>
      </Card>
    </Link>
  );
}
