// SearchBar.tsx
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";

const Input = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: white;  /* Fundo branco */
  text-align: center;
`;

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <Input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder=""
    />
  );
}
