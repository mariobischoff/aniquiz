import { useRouter } from 'next/router';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';

import db from '../db.json';

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h3>Pergunta 1 de 5</h3>
          </Widget.Header>
          <Widget.Content>
            <p>Pagina do Quiz</p>
            {name}
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}
