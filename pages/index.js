import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget
            transition={{ duration: 0.5, delay: 0 }}
            as={motion.section}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
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
          <Widget
            as={motion.section}
            transition={{ duration: 0.5, delay: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <ul>
                {db.external.map((externalLink) => {
                  const [projectName, githubUser] = externalLink
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.versel.app')
                    .split('.');
                  return (
                    <li key={externalLink}>
                      <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer
            transition={{ duration: 0.5, delay: 1 }}
            as={motion.footer}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="http://github.com/mariobischoff" />
      </QuizBackground>
    </>
  );
}
