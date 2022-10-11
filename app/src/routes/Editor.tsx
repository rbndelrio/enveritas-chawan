import { useReducer, useState } from 'react';
// import { useParams } from 'react-router';

// import { createQuestion, Question } from '@chawan/forms';
import { initialListState, listReducer } from '@chawan/react';
import { QuestionHeader } from '../components/Question/Header';
import { QuestionData, QuestionList } from '../components/Question/List';

type QuestionInfo = {
  title: string
  lang: string
}
export const Editor = () => {
  const [info, setInfo] = useState<QuestionInfo>({ lang: 'en-US', title: '' })
  const [listState, dispatchList] = useReducer(
    listReducer<QuestionData>,
    initialListState({
      title: '',
      type: 'text',
      choices: [],
     })
  )

  return (
    <>
      <QuestionHeader
        info={info}
        onInfoUpdate={setInfo}
      />
      <QuestionList
        info={info}
        state={listState}
        dispatch={dispatchList}
      />
    </>
  )
}

export default Editor