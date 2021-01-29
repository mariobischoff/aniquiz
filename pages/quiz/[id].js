import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera({ db }) {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen db={db} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDB = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .catch((err) => console.log(err));
  return {
    props: { db: externalDB },
  };
}
