import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #1e1e1e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  font-family: 'Roboto', sans-serif;
  border-top: 2px solid #333333;
  margin-top: 40px;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 5px 0;
`;

const FooterLinks = styled.div`
  margin-top: 10px;

  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    margin: 0 8px;

    &:hover {
      text-decoration: underline;
      color: #cccccc;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterText>2024 Pokédex. Todos os direitos reservados.</FooterText>
      <FooterLinks>
        <a href="/terms">Termos de Uso</a> | <a href="/privacy">Política de Privacidade</a>
      </FooterLinks>
    </FooterContainer>
  );
}
