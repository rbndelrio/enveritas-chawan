import { useReducer, useState } from 'react';
// import { useParams } from 'react-router';

// import { createQuestion, Question } from '@chawan/forms';
import { initialListState, listReducer } from '@chawan/react';
import { QuestionActions, QuestionControls, QuestionOperations } from '../components/Question/Controls';
import { QuestionHeader } from '../components/Question/Header';
import { QuestionData, QuestionList } from '../components/Question/List';

type QuestionInfo = {
  title: string
  description?: string
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
        /*
          Primary Information Panel
          Survey title + info
        */
        title={info.title}
        description={info.description}

        /*
          Operations Area
          Primarily use as the location of a context menu

          For Surveys it could:
          * display basic status info
          * Methods for importing/exporting content
          * contain a flyout menu with misc. interactions
        */
        operations={
          <QuestionOperations />
        }

        /*
          Control Area
          Features primarily static operations that affect the root record

          In the case of a Survey, this would be operations like:
          * deleting the survey
          * changing view modes
          * importing content from an external source
        */
        controls={
          <QuestionControls
            {...stateProps}
            onInfoUpdate={setInfo}
          />
        }

        /*
          Action Bar
          Only appears after interacting with items in the main content editor

          Operations in a Survey would include:
          * Deleting questions
          * Managing selections
          * Undoing actions
          * Creating and separating groups
        */
        actions={
          <QuestionActions
            {...stateProps}
          />
        }

        showActionBar={!!selection.items[0].length}
      />
      <QuestionList {...stateProps} />
    </>
  )
}

export default Editor