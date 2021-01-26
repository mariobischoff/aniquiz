import styled from "styled-components";
import db from "../db.json";
import QuizBackground from "../src/components/QuizBackground";
import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 34px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #DADADA;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.contrastText};
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Title>AniQuiz</Title>
        <Widget>
          <Widget.Header>
            <h3>
              Vamos descobrir seu nivel de <strong>Otakes</strong>
            </h3>
          </Widget.Header>
          <Widget.Content>
            <p>
              Teste os seus conhecimentos sobre o universo dos animes e
              divirta-se criando o seu AluraQuiz!
            </p>
            <Input placeholder="Diz aí seu nome pra jogar :)" />
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>
              Dá uma olhada nesses quizes incríveis que o pessoal da Imersão
              Alguma coisa fez:
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="http://github.com/mariobischoff" />
    </QuizBackground>
  );
}
