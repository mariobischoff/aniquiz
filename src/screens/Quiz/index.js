import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';

import QuizLogo from '../../components/QuizLogo';

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, SetSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const isCorrect = selectedAlternative === question.answer;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h3>{question.title}</h3>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              setIsQuestionSubmited(false);
              SetSelectedAlternative(undefined);
              onSubmit();
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  type="radio"
                  hidden
                  id={alternativeId}
                  name={questionId}
                  onChange={() => SetSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={selectedAlternative === undefined}>
            Confirmar
          </Button>
        </AlternativesForm>
        { isQuestionSubmited && isCorrect && <p>Você Acertou!</p> }
        { isQuestionSubmited && !isCorrect && <p>Você Errou!</p> }
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <SkeletonTheme color="#202020" highlightColor="#312c51">

        <Widget.Header>
          <h2 style={{ textAlign: 'center', width: '100%' }}>Loading...</h2>
        </Widget.Header>
        <Skeleton height={150} />
        <Widget.Content>
          <Skeleton height={32} />
          <Skeleton style={{ margin: '14px 0px' }} height={14} />
          {Array(4).fill(0).map((_, index) => (
            <Skeleton style={{ marginBottom: 8 }} height={37} key={index} />
          ))}
          <Skeleton style={{ margin: '24px 0px 20px 0px' }} height={38} />
        </Widget.Content>
      </SkeletonTheme>
    </Widget>
  );
}

function ResultWidget({ results }) {
  const router = useRouter();
  const { name } = router.query;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Hey ${name}`}</h3>
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou:
          {' '}
          {results.reduce((somatorioAtual, resultAtual) => {
            const isCorrect = resultAtual === true;
            if (isCorrect) {
              return somatorioAtual + 1;
            }
            return somatorioAtual;
          }, 0)}
        </p>
        {results.map((result, index) => {
          const resulId = `result__${index}`;
          return (
            <li key={resulId}>
              {`${index + 1} Resultado `}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          );
        })}
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ db }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const totalQuestions = db.questions.length;
  const question = db.questions[currentQuestion];
  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        { screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        ) }
        { screenState === screenStates.LOADING && <LoadingWidget /> }
        { screenState === screenStates.RESULT && <ResultWidget results={results} /> }
      </QuizContainer>
    </QuizBackground>
  );
}
