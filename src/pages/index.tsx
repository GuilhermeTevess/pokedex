import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";

// Definindo os tipos para o Pokémon e seus tipos
interface TypeInfo {
  name: string;
  color: string;
}

interface Pokemon {
  name: string;
  num: number;
  height: number;
  experience: number;
  types: TypeInfo[];
  sprite: {
    url: string;
  };
}

interface PokemonData {
  pokemons: Pokemon[];
}

const Background = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
`;

const SearchBar = styled.input`
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 20px auto;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 16px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 10px 0;
`;

const Id = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
`;

const Types = styled.div`
  display: flex;
  justify-content: center;
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


export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); // Inicializa como array vazio
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  // Fetch data from API
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const query = gql`
        query ExampleQuery($sort: [String], $limit: Int) {
          pokemons(sort: $sort, pagination: { limit: $limit }) {
            name
            num
            height
            experience
            types {
              color
              name
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
          { sort: ["num"], limit: 1000 },
          {
            Authorization: "Bearer ecb8eb534cce571194da0654d39c8408a10168dcd5872c441d06dab68d70a4ab7b66d1a3c09a99fdf5e6edf51c04984680781e00f933ad4e723d637cf50e90fe996839bf11d9b6c12d695071934d794b079ec1ada3756570b467409678e4b63749cf44a3ce2f73f0051b4c650751313c49f0ac638211fc742f479a96a7b49a74",
          }
        );

        if (data) {
          const sortedPokemon = data.pokemons;
          setPokemon(sortedPokemon);
          setFilteredPokemon(sortedPokemon);
        } else {
          console.error("Dados inválidos retornados pela API:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemon.filter((poke) =>
      poke.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchQuery, pokemon]);

  // Renderiza os dados
  return (
    <Background>
      <SearchBar
        type="text"
        placeholder="Pesquisar Pokémon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Grid>
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.num}`} key={pokemon.num}>
              <Card>
                <StyledImage
                  src={`http://localhost:1337${pokemon.sprite.url}`}
                  width={120}
                  height={120}
                  alt={`Imagem do Pokémon ${pokemon.name}`}
                />
                <Id>Nº {String(pokemon.num).padStart(3, "0")}</Id>
                <Name>{pokemon.name}</Name>
                <Types>
                  {pokemon.types.map((typeInfo) => (
                    <TypeBadge key={typeInfo.name} color={typeColors[typeInfo.name.toLowerCase()] || "#ddd"}>
                    {typeInfo.name}
                    </TypeBadge>
                  
                  ))}
                </Types>
              </Card>
            </Link>
          ))
        ) : (
          <p>Carregando Pokémon...</p>
        )}
      </Grid>
    </Background>
  );
}
