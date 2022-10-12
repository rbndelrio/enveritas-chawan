import React, { Fragment, MouseEventHandler, useEffect, useState } from 'react';

import type { Question } from '@chawan/forms';
import { getRandomItem } from '@chawan/forms';
import { ListAction, ListState } from '@chawan/react';
import { Transition } from '@headlessui/react';


import { QUESTIONS, TYPES } from '../../data';
import { Editor } from './Edit';
import { PlusIcon, RemoveIcon, TypedIcon } from './Icon';

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

type StateProp<T, U = React.Dispatch<React.SetStateAction<T>>> = [T, U, (() => void)?]

type QuestionListInfo = {
  title: string
  lang: string
}
type QuestionListState = ListState<QuestionData>
type QuestionListAction = React.Dispatch<ListAction<QuestionData>>
export type QuestionData = {
  title: string
  type: string
  choices?: string[]
}

type ListSelection = Array<string|number>

interface ListProps {
  info: QuestionListInfo
  state: QuestionListState
  dispatch: QuestionListAction
}
export const QuestionList = (props: ListProps) => {
  const { state, dispatch } = props
  const selection = {
    items: useState<ListSelection>([]),
    lastIndex: useState<number>(-1),
  }

  // const [shiftHeld, setShiftHeld] = useState(false);
  // const down = ({key}: { key: string }) => { if (key === 'Shift') setShiftHeld(true) }
  // const up = ({key}: { key: string }) => { if (key === 'Shift') setShiftHeld(false) }

  // useEffect(() => {
  //   window.addEventListener('keydown', down);
  //   window.addEventListener('keyup', up);
  //   return () => {
  //     window.removeEventListener('keydown', down);
  //     window.removeEventListener('keyup', up);
  //   };
  // }, []);

  /*
  // TODO: Actually implement sorting and filtering
  const [[_filterBy, _sortBy], _setFilter] = useState<[
    keyof typeof filters,
    keyof typeof sort
  ]>(['all', 'index'])

  const filters = {
    'all': Boolean
  }
  const sort = {
    'index': () => 0,
    'mod-asc': (a?: Question, b?: Question) =>
      (a?.modified_on.getTime() || 0) - (b?.modified_on.getTime() || 0)
    ,
    'mod-dec': (a?: Question, b?: Question) =>
      (a?.modified_on.getTime() || 0) - (b?.modified_on.getTime() || 0)
  }
  */


  return (
    <div className="
      border-t border-gray-200
      pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6 flow-root
    ">
      <ul role="list" className="-mb-8 isolate">
        {state.order
          .map((id, q, array) => {
            const questionData = state.data[id]

            if (!questionData) return <Fragment key={id} />
            return (
              <QuestionWrapper
                {...props}
                key={id}
                question={questionData}
                index={id}
                state={state}
                dispatch={dispatch}
                selection={selection}
              />
            )
          })
          // .filter(filters[filterBy])
          // .sort(sort[sortBy])
        }
      </ul>
    </div>
  )
}

type Status = 'good' | 'normal' | 'warn' | 'alert'
type QuestionStatus = [Status, string]
const getStatus = (
  data: QuestionData,
  // _index: number,
  state: QuestionListState,
  info: QuestionListInfo
): QuestionStatus => {
  if (!data) return ['alert', 'Question does not exist']

  // if (question.deleted) return ['alert', 'Question no longer exists']
  // if (question.nickname) return ['warn', 'Question should have a nickname']

  // if (
  //   info.lang !== question.lang ||
  //   question.lang !== questions?.[0].lang
  // ) return ['warn', 'Inconsistent mix of translations']
  // if (question.versions?.length) {
  //   const activeVersion = inferActiveQuestionVersion(question)

  //   if (!activeVersion) return ['alert', 'No Valid Versions Found']
  //   if (activeVersion.content.data.question.val) return ['good', '']
  // }

  return ['normal', '']
}

const inferActiveQuestionVersion = (question: Question) => question.versions.find(
  (version) => (!version.deleted && version?.content?.data)
) || null

type ControlProps = {
  only: boolean,
  last: boolean,
  actions: Record<string, React.MouseEventHandler<HTMLButtonElement>>
}
const Controls = ({ only, last, actions }: ControlProps) => {
  return (
    <>
      <div className="absolute top-4 right-0">
        {only
          ? <></>
          : <button
              type="button"
              onClick={actions.remove}
              className="
                opacity-0
                group-hover:opacity-100
                inline-flex items-center rounded-full border border-transparent shadow-none
                bg-transparent p-1 text-gray-600
                hover:bg-gray-200 hover:text-rose-700 hover:shadow-sm
                focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2
              "
            >
              <RemoveIcon />
            </button>
        }
      </div>
      {last
        ? <div className="absolute -bottom-8 left-0">
            <button
              type="button"
              onClick={actions.add}
              className="
                inline-flex items-center rounded-full border border-transparent shadow-sm
                bg-enveritas-600 p-2 text-white hover:bg-enveritas-700
                focus:outline-none focus:ring-2 focus:ring-enveritas-500 focus:ring-offset-2
              "
            >
              <PlusIcon />
            </button>
          </div>
        : <></>
      }
    </>
  )
}

interface QuestionProps extends ListProps {
  index: number
  question: QuestionData
  state: QuestionListState
  selection: {
    items: StateProp<ListSelection>
    lastIndex: StateProp<number>
  }
}

const getRandomQuestion = () => getRandomItem(QUESTIONS)
export const QuestionWrapper = (props: QuestionProps) => {
  const {
    question,
    index: q,
    state,
    dispatch,
    info
  } = props

  const [showEditor, setEditorVisibility] = useState<boolean>(true)
  const [[status, _statusMessage], setStatus] = useState<[Status, string]>(['normal', ''])
  const [[highlight, highlightNext], setHighlight] = useState([false, false])
  // const [activeQuestionVersion, setActiveQuestionVersion] = useState<QuestionVersion | null>(null)

  const addQuestion = () => {
    dispatch({
      type: 'add_item',
      payload: {
        title: getRandomQuestion(),
        type: 'text',
        choices: [],
      }
    })
  }

  const setQuestionData = (arg: Partial<QuestionData> | ((data: QuestionData) => QuestionData)) => {
    dispatch({
      type: 'set_data',
      id: q,
      payload: typeof arg === 'function'
        ? arg(question)
        : { ...question, ...arg },
    })
  }

  const removeQuestion = () => {
    dispatch({ type: 'remove_item', id: q })
  }

  const revealEditor = () => { setEditorVisibility(true) }
  const toggleEditor = () => { setEditorVisibility(!showEditor) }

  // const resetActiveQuestionVersion = () => {
  //   setActiveQuestionVersion(
  //     inferActiveQuestionVersion(question)
  //   )
  // }

  const handleSelectionEvent: MouseEventHandler<HTMLElement> = e => {
    e.stopPropagation()

    const { order } = props.state
    const [ state, setState ] = props.selection.items
    const [ lastIndex, setLast ] = props.selection.lastIndex
    const index = order.indexOf(q)

    if (state.includes(q)) {
      return setState(state.filter(id => id !== q))
    }

    const newState = [...state]
    setLast(index)

    // Select all items in range
    if (e.shiftKey) {
      let
        f = Math.min(lastIndex, q),
        t = Math.max(lastIndex, q)

      // console.log('shift', f, t, order)
      order.slice(f, t).forEach(id => { if (!state.includes(id)) newState.push(id) })
      return setState(newState)
    }

    newState.push(q)
    // console.log('push', q, index, newState)
    return setState(newState)
  }


  const actions = {
    add: addQuestion,
    remove: removeQuestion,
  }

  useEffect(() => {
    setStatus(getStatus(question, state, info))
  }, [question, info.lang, q])

  useEffect(() => {
    const { state, selection } = props
    setHighlight([
      selection.items[0].includes(q),
      selection.items[0].includes(state.order[state.order.indexOf(q) + 1])
    ])
  }, [props.selection.items[0], q])


  const MOOD_RING = {
    good: 'text-enveritas-700',
    normal: 'text-jebena-500',
    warn: 'text-yellow-500',
    alert: 'text-enveritas-700',
  }

  return (
    <li>
      <div className="group relative py-4">
        <div className={
          `${highlight ? 'bg-gray-200' : 'bg-transparent group-hover:bg-gray-100 group-focus-within:bg-gray-100'}
          absolute -inset-1 -inset-x-6 -z-10
          transition
          `
        } />

        {/* Invisible hitbox */}
        <div className="absolute inset-0" onClick={toggleEditor} />

        <span
          className={
            `absolute top-5 left-5 -ml-px h-full w-0.5 ${
              // Check if next item is part of selection
              highlight && highlightNext
                ? 'bg-current ' + MOOD_RING[status]
                : 'bg-gray-300'
            }`
          }
          aria-hidden="true"
        />

        <div
          className="relative flex items-start space-x-3"
          onClick={toggleEditor}
        >
          <div className="relative px-1 user-select-none" onClick={handleSelectionEvent}>
            <div className={classNames(
              MOOD_RING[status],
              highlight ? 'bg-current' : 'bg-white',
              `relative flex h-8 w-8 items-center justify-center rounded-full
              outline-current outline-2
              outline

              ring-4 cursor-default -ring-offset-3 ring-current hover:ring-current ring-opacity-80
              transition hover:ring-offset-2 hover:ring-8`
              )
            }>
              <TypedIcon
                typ={question.type}
                className={classNames(
                  'h-5 w-5 opacity-95',
                  highlight ? 'text-white' : 'text-current',
                )}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className={
            `cursor-default active:cursor-grab min-w-0 flex-1 transition select-none ${
              !showEditor ? 'opacity-100' : 'opacity-0'
            }`
          }>
            <div>
              <div className="text-sm">
                <div
                  className={classNames("font-medium", highlight ? MOOD_RING[status] : 'text-gray-900')}
                >
                  {question.title || `Question ${q + 1}`}
                </div>
              </div>
              {/* <p className="mt-0.5 text-sm text-gray-500">{formatDate(question.modified_on)}</p> */}
            </div>
            <div className="mt-2 text-xs text-gray-700">
              <p>{
                TYPES.find(({ value }) => value === (question.type || 'text'))?.name || ''
              }</p>
            </div>
          </div>
        </div>


        {/* Question Editor */}
        <Transition
          appear={true}
          show={showEditor}
          as={Fragment}
          enter="transform transition duration-150 translate-y-4"
          enterFrom="opacity-0"
          enterTo="opacity-100 translate-y-0"
          entered="transform-none"
          leave="transform transition duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0"
        >
          <div className="relative bg-white rounded-lg mx-8 ml-12 -mt-10 top-0">
            <Editor
              editorState={[showEditor, setEditorVisibility]}
              // versionState={[activeQuestionVersion, setActiveQuestionVersion, resetActiveQuestionVersion]}
              data={question}
              setData={setQuestionData}
            />
          </div>
        </Transition>

        <Controls
          only={state.order.length <= 1}
          last={q === state.order[state.order.length - 1]}
          actions={actions}
        />
      </div>
    </li>
  )
}

export default QuestionList