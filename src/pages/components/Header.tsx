import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: #1e1e1e;
  padding: 20px 40px;
  border-bottom: 4px solid #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleButton = styled.a`
  font-size: 2.5rem;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  &:hover {
    color: #cccccc;
    transform: scale(1.05);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #cccccc;
  }
`;

const Separator = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 10px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <TitleButton href="/">Pokédex</TitleButton>
      <NavLinks>
        <NavLink href="/moves">Movimentos</NavLink>
        <Separator src="/imgs/pokebolabranca.png" alt="separator" />
        <NavLink href="/types">Tipos</NavLink>
        <Separator src="/imgs/pokebolabranca.png" alt="separator" />
        <NavLink href="/regions">Regiões</NavLink>
      </NavLinks>
    </HeaderContainer>
  );
}
