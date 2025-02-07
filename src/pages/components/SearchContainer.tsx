// SearchContainer.tsx
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import { SearchBar } from "./SearchBar";
import { AdvancedSearchBar } from "./AdvancedSearchbar";

const OuterContainer = styled.div`
  width: 1274px;           /* Largura definida conforme a delimitação lateral */
  margin: 0 auto;         /* Centraliza horizontalmente */
  padding: 40px;
  background-color: #353434; /* Cor um pouco mais escura */
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;    /* Espaço entre a busca e a barra avançada */
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  color: white;
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 10px;
`;

interface SearchContainerProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedTypes: Record<string, boolean>;
  setSelectedTypes: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export function SearchContainer({
  searchQuery,
  setSearchQuery,
  selectedTypes,
  setSelectedTypes,
}: SearchContainerProps) {
  return (
    <>
      <OuterContainer>
        <Title>Nome ou Número</Title>
        <SearchBarWrapper>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </SearchBarWrapper>
        <Subtitle>
          Utilize a pesquisa avançada para pesquisar Pokemons pelos tipos e fraquezas.
        </Subtitle>
      </OuterContainer>
      {/* A barra avançada ficará logo abaixo, com a mesma largura */}
      <AdvancedSearchBar />
    </>
  );
}
