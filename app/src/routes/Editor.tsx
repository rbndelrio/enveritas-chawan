import { useReducer, useState } from 'react';
// import { useParams } from 'react-router';

// import { createQuestion, Question } from '@chawan/forms';
import { initialListState, listReducer } from '@chawan/react';
import { QuestionControls } from '../components/Question/Controls';
import { QuestionHeader } from '../components/Question/Header';
import { QuestionData, QuestionList } from '../components/Question/List';

type QuestionInfo = {
  title: string
  lang: string
}
type ListSelection = Array<string|number>
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

  const selection = {
    items: useState<ListSelection>([]),
    lastIndex: useState<number>(-1),
  }

  const stateProps = {
    info,
    state: listState,
    dispatch: dispatchList,
    selection: selection,
  }

  return (
    <>
      <QuestionHeader
        controls={
          <QuestionControls {...stateProps} onInfoUpdate={setInfo} />
        }
      >
        { info.title }
      </QuestionHeader>
      <QuestionList {...stateProps} />
    </>
  )
}

export default Editor