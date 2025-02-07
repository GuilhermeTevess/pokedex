import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 250px;
    height: 100vh;
    background: url('/imgs/body_bg.png') repeat-y center;
    background-size: contain;
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
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

const AsymmetricBar = styled.div`
  background-color: #555555;
  height: 150px;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const AdvancedSearchButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #ff1000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #cc0e00;
  }
`;

const TypeSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TypeButton = styled.button<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#555" : "#ccc")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #aaa;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: start;
`;

const Card = styled.div`
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  width: 250px; /* Aumentei o tamanho do card */
  height: 350px; /* Aumentei o tamanho do card */

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div<{ color: string, color2?: string }>`
  background: ${(props) =>
    props.color2
      ? `linear-gradient(90deg, ${props.color} 50%, ${props.color2} 50%)`
      : props.color || "#ddd"};
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px; /* Ajustei o tamanho do quadrado */
  height: 200px; /* Ajustei o tamanho do quadrado */
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 160px;
  height: 160px;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 10px 0;
`;

const Id = styled.p`
  font-size: 1rem;
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
  planta: "#78c850",
  fogo: "#f08030",
  água: "#6890f0",
  inseto: "#a8b820",
  normal: "#a8a878",
  venenoso: "#a040a0",
  elétrico: "#f8d030",
  terra: "#e0c068",
  fada: "#ee99ac",
  lutador: "#c03028",
  psíquico: "#f85888",
  pedra: "#b8a038",
  fantasma: "#705898",
  gelo: "#98d8d8",
  dragão: "#7038f8",
  sombrio: "#705848",
  aço: "#b8b8d0",
  voador: "#a890f0",
};

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

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
          setPokemon(data.pokemons);
          setFilteredPokemon(data.pokemons);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchPokemon();
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, pokemon]);

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
          filteredPokemon.map((pokemon) => {
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
                </Card>
              </Link>
            );
          })
        ) : (
          <p>Carregando Pokémon...</p>
        )}
      </Grid>
    </Background>
  );
}