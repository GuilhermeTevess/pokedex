import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";

// Definição dos tipos
interface TypeInfo {
  name: string;
  color: string;
}

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface Pokemon {
  name: string;
  num: string; // Alterado para string
  height: number;
  weight: number;
  experience: number;
  stats: Stats;
  types: TypeInfo[];
  sprite: {
    url: string;
  };
}

interface PokemonData {
  pokemons: Pokemon[];
}

// Estilos
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

const TypeBadge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color || "#ddd"};
  color: white;
  padding: 5px 15px;
  border-radius: 12px;
  font-size: 0.9rem;
`;

const PokemonStats = styled.div`
  margin-top: 20px;
  text-align: left;
  color: black;

  & > p {
    margin: 5px 0;
  }
`;

const typeColors: Record<string, string> = {
  grass: "#78c850",
  fire: "#f08030",
  water: "#6890f0",
  bug: "#a8b820",
  normal: "#a8a878",
  poison: "#a040a0",
  electric: "#f8d030",
  ground: "#e0c068",
  fairy: "#ee99ac",
  fighting: "#c03028",
  psychic: "#f85888",
  rock: "#b8a038",
  ghost: "#705898",
  ice: "#98d8d8",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  flying: "#a890f0",
};

export default function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da URL

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      if (!id) return; // Garante que o ID foi carregado

      try {
        // 🔹 Buscar TODOS os Pokémons e filtrar no frontend
        const query = gql`
          query GetAllPokemons {
            pokemons {
              name
              num
              height
              weight
              experience
              stats {
                hp
                attack
                defense
                special_attack
                special_defense
                speed
              }
              types {
                name
                color
              }
              sprite {
                url
              }
            }
          }
        `;

        const data = await request<PokemonData>(
          "http://localhost:1337/graphql",
          query,
          {},
          {
            Authorization:
              "Bearer ecb8eb534cce571194da0654d39c8408a10168dcd5872c441d06dab68d70a4ab7b66d1a3c09a99fdf5e6edf51c04984680781e00f933ad4e723d637cf50e90fe996839bf11d9b6c12d695071934d794b079ec1ada3756570b467409678e4b63749cf44a3ce2f73f0051b4c650751313c49f0ac638211fc742f479a96a7b49a74",
          }
        );

        if (data && data.pokemons.length > 0) {
          // 🔹 Filtrar o Pokémon pelo número (ID)
          const foundPokemon = data.pokemons.find(
            (poke) => String(poke.num) === String(id)
          );

          if (foundPokemon) {
            setPokemon(foundPokemon);
          } else {
            setError("Pokémon não encontrado.");
          }
        } else {
          setError("Nenhum Pokémon encontrado.");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      }
    }

    fetchPokemon();
  }, [id]);

  if (error) return <div>Erro: {error}</div>;
  if (!pokemon) return <div>Carregando...</div>;

  return (
    <Container>
      <Image src={`http://localhost:1337${pokemon.sprite.url}`} alt={pokemon.name} />
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
      <PokemonStats>
        <p>HP: {pokemon.stats.hp}</p>
        <p>Ataque: {pokemon.stats.attack}</p>
        <p>Defesa: {pokemon.stats.defense}</p>
        <p>Ataque Especial: {pokemon.stats.special_attack}</p>
        <p>Defesa Especial: {pokemon.stats.special_defense}</p>
        <p>Velocidade: {pokemon.stats.speed}</p>
        <p>Altura: {pokemon.height} m</p>
        <p>Peso: {pokemon.weight} kg</p>
        <p>Experiência Base: {pokemon.experience}</p>
      </PokemonStats>
    </Container>
  );
}
