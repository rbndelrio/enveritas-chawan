import { useEffect, useState } from 'react'

import type { Question, QuestionVersion } from '@chawan/forms'
import { createQuestion, createQuestionVersion } from '@chawan/forms'
import { Transition } from '@headlessui/react'
import { Answer as A } from './Answer'
import { PlusIcon, RemoveIcon, TypedIcon } from './Icon'
import { Single as Q } from './Single'

import Editor from './Edit'

type QuestionListState = {
  questions: Array<Question>
  lang: string
}

type Status = 'good' | 'normal' | 'warn' | 'alert'
type QuestionStatus = [Status, string]

const getStatus = (
  question: Question,
  _index: number,
  questions: Question[],
  state: QuestionListState
): QuestionStatus => {
  if (question.deleted) return ['alert', 'Question no longer exists']
  if (question.nickname) return ['warn', 'Question should have a nickname']
  if (
    state.lang !== question.lang ||
    question.lang !== questions?.[0].lang
  ) return ['warn', 'Inconsistent mix of translations']

  if (question.versions?.length) {
    const activeVersion = inferActiveQuestionVersion(question)

    if (!activeVersion) return ['alert', 'No Valid Versions Found']
    if (activeVersion.content.data.question.val) return ['good', '']
  }

  return ['normal', '']
}

const inferActiveQuestionVersion = (question: Question) => question.versions.find(
  (version) => (!version.deleted && version?.content?.data)
) || null

type ControlProps = {
  last: boolean,
  actions: Record<string, React.MouseEventHandler<HTMLButtonElement>>
}
const Controls = ({ last, actions }: ControlProps) => {
  return (
    <>
      <div className="absolute top-4 right-0">
        <button
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
  question: Question
  questions: Question[]
  state: QuestionListState
}
export const QuestionWrapper = (props: QuestionProps) => {
  const { question, index: q, questions, state, onQuestionsUpdate } = props
  const [[status, statusMessage], setStatus] = useState<[Status, string]>(['normal', ''])
  const MOOD_RING = {
    good: 'text-enveritas-700',
    normal: 'text-jebena-500',
    warn: 'text-yellow-500',
    alert: 'text-enveritas-700',
  }

  const addQuestion = () => {
    const newQuestion = createQuestion({ typ: question.typ })
    const newVersion = createQuestionVersion({}, newQuestion, {
      val: 'Who are you?',
      type: newQuestion.typ
    })
    newQuestion.versions.push(newVersion)
    onQuestionsUpdate({ ...state, questions: [...questions, newQuestion]})
  }

  const removeQuestion = () => {
    onQuestionsUpdate({
      ...state,
      questions: questions.filter((_, idx) => q !== idx)
    })
  }


  const [showEditor, setEditorVisibility] = useState<Boolean>(false)
  const revealEditor = () => { setEditorVisibility(true) }
  const toggleEditor = () => { setEditorVisibility(!showEditor) }


  const [activeQuestionVersion, setActiveQuestionVersion] = useState<QuestionVersion | null>(null)
  const resetActiveQuestionVersion = () => {
    setActiveQuestionVersion(
      inferActiveQuestionVersion(question)
    )
  }


  const actions = {
    add: addQuestion,
    remove: removeQuestion,
  }

  useEffect(() => {
    setStatus(getStatus(question, q, questions, state))
  }, [question, state.lang, q])

  return (
    <li>
      <div className="group relative py-4">
        <div className="
          absolute -inset-1 -inset-x-6 bg-transparent -z-10
          group-hover:bg-gray-100 group-focus-within:bg-gray-100
          transition
        " />

        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
        {/* {q !== questions.length - 1 ? (
          <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
        ) : null} */}
        <div
          className="relative flex items-start space-x-3"
          onClick={toggleEditor}
        >
          <div className="relative px-1 user-select-none">
            <div className={
              MOOD_RING[status] +
              ` relative flex h-8 w-8 items-center justify-center rounded-full
              bg-white ring-4 cursor-grab -ring-offset-2 ring-current hover:ring-current ring-opacity-80
              transition hover:ring-offset-2 hover:ring-8`
            }>
              <TypedIcon
                typ={question.typ}
                className="h-5 w-5 text-current opacity-95"
                aria-hidden="true"
              />
            </div>

            <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
              {/* <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">
                  {question.nickname || `Question ${q + 1}`}
                </div>
              </div>
              {/* <p className="mt-0.5 text-sm text-gray-500">{formatDate(question.modified_on)}</p> */}
            </div>
            <div className="mt-2 text-xs text-gray-700">
              <p>{question.lang}</p>
            </div>
          </div>
          <Q {...props}></Q>
          <A {...props}></A>
        </div>


        {/* Question Editor */}
        <Transition
          appear={true}
          show={!showEditor}
          as={'div'}
          className="relative z-100 bg-white mx-8 ml-12 -mt-10 top-0"
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Editor />
        </Transition>


        <Controls
          last={q === questions.length - 1}
          actions={actions}
        />
      </div>
    </li>
  )
}

interface ListProps {
  state: QuestionListState
  onQuestionsUpdate: React.Dispatch<React.SetStateAction<QuestionListState>>
}
export const QuestionList = ({ state, onQuestionsUpdate }: ListProps) => {
  // TODO: Actually implement sorting and filtering
  const [[filterBy, sortBy], setFilter] = useState<[
    keyof typeof filters,
    keyof typeof sort
  ]>(['all', 'index'])

  const filters = {
    'all': Boolean
  }
  const sort = {
    'index': () => 0,
    'mod-asc': (a: Question, b: Question) => (a.modified_on.getTime() - b.modified_on.getTime()),
    'mod-dec': (a: Question, b: Question) => (a.modified_on.getTime() - b.modified_on.getTime())
  }

  return (
    <div className="
      border-t border-gray-200
      pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6 flow-root
    ">
      <ul role="list" className="-mb-8 isolate">
        {state.questions
          .filter(filters[filterBy])
          .sort(sort[sortBy])
          .map((question, q) => (
            <QuestionWrapper
              key={question.uuid}
              question={question}
              index={q}
              questions={state.questions}
              state={state}
              onQuestionsUpdate={onQuestionsUpdate}
            />
          ))
        }
      </ul>
    </div>
  )
}

export default QuestionList