import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 34px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #dadada;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.contrastText};
  ::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;

const Button = styled.button`
  margin: 20px 0;
  font-size: 18px;
  border: 1px solid #dadada;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.success};
  transition: .5s ease-out;
  width: 100%;
  height: 38px;
  :disabled {
    background-color: ${({ theme }) => theme.colors.wrong};
    color: #DDDDDD;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Title>AniQuiz</Title>
          <Widget>
            <Widget.Header>
              <h3>
                Vamos descobrir seu nivel de
                {' '}
                <strong>Otakes</strong>
              </h3>
            </Widget.Header>
            <Widget.Content>
              <p>
                Teste os seus conhecimentos sobre o universo dos animes e
                divirta-se criando o seu AluraQuiz!
              </p>
              <form onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <Input
                  placeholder="Diz aí seu nome pra jogar :)"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
                <Button disabled={name.length < 3}>Jogar</Button>
              </form>
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
    </>
  );
}
