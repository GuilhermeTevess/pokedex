import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: #ff1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 4px solid #000000;
`;

const Logo = styled.img`
  height: 50px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #FFFFFF;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 15px;

  a {
    text-decoration: none;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo src="/pokeball.png" alt="Aqui vai ter uma logo" />
      <Title>Pokedex</Title>
      <NavLinks>
        <a href="/">Home</a>
        <a href="/about">Sobre</a>
        <a href="/contact">Contacto</a>
      </NavLinks>
    </HeaderContainer>
  );
}
