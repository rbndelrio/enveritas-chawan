import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { createQuestion, Question } from '@chawan/forms';
import QuestionHeader from '../components/Question/Header';
import QuestionList from '../components/Question/List';

type QuestionListState = {
  lang: string
  questions: Array<Question>
}
export const Editor = () => {
  const { uuid } = useParams<'uuid'>()
  const [questionState, setQuestionState] = useState<QuestionListState>({
    lang: 'en-US',
    questions: [createQuestion()],
  })

  useEffect(() => {
    if (uuid) {
      setQuestionState({lang: 'en-US', questions: [createQuestion()]})
    }
  }, [uuid])

  return (
    <>
      <QuestionHeader
        state={questionState}
        onQuestionsUpdate={setQuestionState}
      />
      <QuestionList
        state={questionState}
        onQuestionsUpdate={setQuestionState}
      />
      {/* <Example /> */}
    </>
  )
}

export default Editor