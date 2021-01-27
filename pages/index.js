import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 34px;
  text-align: center;
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
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
                  name="nomeDoUsuario"
                />
                <Button
                  disabled={name.length < 3}
                  type="submit"
                >
                  Jogar

                </Button>
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
