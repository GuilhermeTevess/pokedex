import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #ff1000;
  color: #ffffff;
  text-align: center;
  padding: 10px 20px;
  margin-top: 20px;
  font-family: 'Roboto', sans-serif;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  margin-top: 10px;

  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Copyright>2024 Pokédex. Todos os direitos reservados.</Copyright>
      <FooterLinks>
        <a href="/terms">Termos de Uso</a> | <a href="/privacy">Política de Privacidade</a>
      </FooterLinks>
    </FooterContainer>
  );
}
