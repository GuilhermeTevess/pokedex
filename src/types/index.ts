// /types/index.ts
export interface TypeInfo {
    name: string;
    color: string;
  }
  
  export interface Pokemon {
    name: string;
    num: number;
    height: number;
    experience: number;
    types: TypeInfo[];
    sprite: {
      url: string;
    };
  }
  
  export interface PokemonData {
    pokemons: Pokemon[];
  }
  