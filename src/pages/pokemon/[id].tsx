import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface TypeInfo {
  name: string;
  color: string;
}

interface Pokemon {
  name: string;
  num: number;
  height: number;
  weight: number;
  experience: number;
  types: TypeInfo[];
  sprite: {
    url: string;
  };
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Image = styled.img`
  width: 200px;
  color: black;
  height: 200px;
  object-fit: contain;
`;

const Name = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Types = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const TypeBadge = styled.span`
  background-color: ${(props) => props.color || '#ddd'};
  color: white;
  padding: 5px 15px;
  border-radius: 12px;
  font-size: 0.9rem;
`;

const Stats = styled.div`
  margin-top: 20px;
  text-align: left;
  color: black;

  & > p {
    margin: 5px 0;
  }
`;

const typeColors = {
  grass: '#78c850',
  fire: '#f08030',
  water: '#6890f0',
  bug: '#a8b820',
  normal: '#a8a878',
  poison: '#a040a0',
  electric: '#f8d030',
  ground: '#e0c068',
  fairy: '#ee99ac',
  fighting: '#c03028',
  psychic: '#f85888',
  rock: '#b8a038',
  ghost: '#705898',
  ice: '#98d8d8',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  flying: '#a890f0',
};

// Tipo das chaves do tipoColors
type TypeColors = keyof typeof typeColors;

export default function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      if (!id) return;
      const res = await fetch(`http://localhost:1337/api/pokemons?fields=name%2Cheight%2Cweight%2Cexperience&populate=types&populate=sprite&filters%5Bnum%5D=${id}`, {
        headers: {
          Authorization: "Bearer <your-token>"
        }
      });
      const data = await res.json();
      setPokemon(data.data[0]);
    }
    fetchPokemon();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <Container>
      <Image src={`http://localhost:1337${pokemon.sprite.url}`} alt={pokemon.name} />
      <Name>{pokemon.name}</Name>
      <Types>
        {pokemon.types.map((typeInfo) => (
          // A chave é garantida para ser uma chave válida de typeColors
          <TypeBadge key={typeInfo.name} color={typeColors[typeInfo.name as TypeColors] || '#ddd'}>
            {typeInfo.name}
          </TypeBadge>
        ))}
      </Types>
      <Stats>
        <p>Height: {pokemon.height} m</p>
        <p>Weight: {pokemon.weight} kg</p>
        <p>Base Experience: {pokemon.experience}</p>
      </Stats>
    </Container>
  );
}
