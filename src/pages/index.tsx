import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { Background } from "./components/Background";
import { SearchContainer } from "./components/SearchContainer";
import { Grid } from "./components/Grid";
import { PokemonCard } from "./components/PokemonCard";
import { Pokemon, PokemonData } from "@/types";
import { typeColors } from "@/constants/typeColors";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  // Altere o estado selectedTypes para Record<string, number>
  const [selectedTypes, setSelectedTypes] = useState<Record<string, number>>({});

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
    let filtered = pokemon.filter((poke) =>
      poke.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (Object.keys(selectedTypes).length > 0) {
      filtered = filtered.filter((poke) =>
        poke.types.some((type) => selectedTypes[type.name])
      );
    }

    setFilteredPokemon(filtered);
  }, [searchQuery, selectedTypes, pokemon]);

  return (
    <Background>
      <SearchContainer
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTypes={selectedTypes} // Passando o estado correto
        setSelectedTypes={setSelectedTypes} // Passando a função para alterar o estado
      />
      <Grid>
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.num} pokemon={pokemon} typeColors={typeColors} />
          ))
        ) : (
          <p>Carregando Pokémon...</p>
        )}
      </Grid>
    </Background>
  );
}
