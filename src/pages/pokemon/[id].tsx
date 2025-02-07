import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { useRouter } from "next/router";

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
  hp: string;
  atk: string;
  def: string;
  spatk: string;
  spdef: string;
  spd: string;
  // Futuramente: weight, description, versions, etc.
}

interface PokemonResponse {
  pokemons: Pokemon[];
}

const Background = styled.div`
  background-color: #f5f5f5;
  padding: 20px; /* Afastado das bordas */
  min-height: 100vh;
  font-family: 'Verdana', sans-serif; /* Fonte alterada para Verdana */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CornerDecoration = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Id = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin: 0;
`;

const Name = styled.h3`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
`;

const MainContent = styled.div`
  display: flex;
  width: 80%;
  gap: 20px;
  margin-bottom: 20px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const PokemonImageContainer = styled.div<{ color: string, color2?: string }>`
  background: ${(props) =>
    props.color2
      ? `linear-gradient(135deg, ${props.color} 50%, ${props.color2} 50%)`
      : props.color || "#ddd"};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledImage = styled.img`
  object-fit: contain;
  width: 100%;
  max-width: 350px; /* Tamanho reduzido */
  height: auto;
`;

const StatsSection = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const StatItem = styled.div`
  font-size: 1.2rem;
  color: #333;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  justify-content: flex-start;
`;

const Description = styled.div`
  font-size: 1.2rem;
  color: #444;
  margin-top: 10px;
`;

const VersionsSection = styled.div`
  display: flex;
  gap: 10px;
`;

const VersionButton = styled.button`
  padding: 6px 12px;
  font-size: 0.9rem;
  background-color: #ddd;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const InfoBox = styled.div`
  width: 100%;
  max-width: 400px; /* Para terminar na mesma linha da imagem */
  aspect-ratio: 2 / 1; 
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
  padding: 10px;
`;

const InfoLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1rem;
  color: #333;
  align-items: center;
`;

const InfoRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1rem;
  color: #333;
  align-items: center;
`;

/* Seção para Tipos e Fraquezas: agora centralizada abaixo da InfoBox */
const RightLowerInfo = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centralizado */
  gap: 10px;
`;

const SectionTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 5px;
`;

const TypeBadge = styled.span`
  background-color: ${(props) => props.color || "#ddd"};
  color: white;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 1rem;
  text-transform: capitalize;
  margin-right: 5px;
`;

const WeaknessItem = styled.span`
  background-color: #ff9999;
  color: #fff;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 1rem;
  text-transform: capitalize;
  margin-right: 5px;
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

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [activeVersion, setActiveVersion] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const fetchPokemon = async () => {
        try {
          const query = gql`
            query PokemonQuery($num: Int) {
              pokemons(filters: { num: { eq: $num } }) {
                name
                num
                height
                experience
                hp
                atk
                def
                spatk
                spdef
                spd
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
          const data = await request<PokemonResponse>(
            "http://localhost:1337/graphql",
            query,
            { num: Number(id) },
            {
              Authorization:
                "Bearer ecb8eb534cce571194da0654d39c8408a10168dcd5872c441d06dab68d70a4ab7b66d1a3c09a99fdf5e6edf51c04984680781e00f933ad4e723d637cf50e90fe996839bf11d9b6c12d695071934d794b079ec1ada3756570b467409678e4b63749cf44a3ce2f73f0051b4c650751313c49f0ac638211fc742f479a96a7b49a74",
            }
          );
  
          if (data && data.pokemons && data.pokemons.length > 0) {
            console.log("Pokemon data:", data.pokemons[0]);
            setPokemon(data.pokemons[0]);
          } else {
            console.log("Nenhum Pokémon encontrado");
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
  
      fetchPokemon();
    }
  }, [id]);
  
  if (!pokemon) return <p>Carregando detalhes...</p>;
  
  const color1 = typeColors[pokemon.types[0].name.toLowerCase()] || "#ddd";
  const color2 = pokemon.types[1] ? typeColors[pokemon.types[1].name.toLowerCase()] : undefined;
  
  return (
    <Background>
      <CornerDecoration />
      <TopSection>
        <Id>Nº {String(pokemon.num).padStart(3, "0")}</Id>
        <Name>{pokemon.name}</Name>
      </TopSection>
  
      <MainContent>
        <LeftColumn>
          <PokemonImageContainer color={color1} color2={color2}>
            <StyledImage
              src={`http://localhost:1337${pokemon.sprite.url}`}
              alt={`Imagem do Pokémon ${pokemon.name}`}
            />
          </PokemonImageContainer>
          <StatsSection>
            <StatItem>HP: {pokemon.hp}</StatItem>
            <StatItem>Atk: {pokemon.atk}</StatItem>
            <StatItem>Def: {pokemon.def}</StatItem>
            <StatItem>Sp. Atk: {pokemon.spatk}</StatItem>
            <StatItem>Sp. Def: {pokemon.spdef}</StatItem>
            <StatItem>Spd: {pokemon.spd}</StatItem>
          </StatsSection>
        </LeftColumn>
  
        <RightColumn>
          <Description>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </Description>
          <VersionsSection>
            <VersionButton onClick={() => setActiveVersion(0)}>Versão 1</VersionButton>
            <VersionButton onClick={() => setActiveVersion(1)}>Versão 2</VersionButton>
          </VersionsSection>
          <InfoBox>
            <InfoLeft>
              <strong>Altura</strong>
              <span>{pokemon.height} m</span>
              <strong>Peso</strong>
              <span>-- kg</span>
              <strong>Gêneros</strong>
              <span>
                <img src="/placeholder-male.png" alt="Masculino" width="25" height="25" style={{ marginRight: "5px" }} />
                <img src="/placeholder-female.png" alt="Feminino" width="25" height="25" />
              </span>
            </InfoLeft>
            <InfoRight>
              <strong>Categoria</strong>
              <span>--</span>
              <strong>Abilities</strong>
              <span>--</span>
            </InfoRight>
          </InfoBox>
          <RightLowerInfo>
            <SectionTitle>Tipos</SectionTitle>
            <div>
              {pokemon.types.map((typeInfo) => (
                <TypeBadge key={typeInfo.name} color={typeColors[typeInfo.name.toLowerCase()] || "#ddd"}>
                  {typeInfo.name}
                </TypeBadge>
              ))}
            </div>
            <SectionTitle>Fraquezas</SectionTitle>
            <div>
              <WeaknessItem>A definir</WeaknessItem>
            </div>
          </RightLowerInfo>
        </RightColumn>
      </MainContent>
    </Background>
  );
};

export default PokemonDetail;
