import { Menu } from '@headlessui/react'
import { ChevronDownIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/20/solid'

import { ListAction, ListState } from '@chawan/react'

import { LANGUAGE_OPTIONS } from '../../data'

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

// TODO: Declare these types globally
type StateProp<T, U = React.Dispatch<React.SetStateAction<T>>> = [T, U, (() => void)?]
type QuestionInfo = {
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
interface Props {
  info: QuestionInfo
  onInfoUpdate: React.Dispatch<React.SetStateAction<QuestionInfo>>
  state: QuestionListState
  dispatch: QuestionListAction
  selection: {
    items: StateProp<ListSelection>
    lastIndex: StateProp<number>
  }
}
export const QuestionControls = ({ info, onInfoUpdate }: Props) => {
  const setLanguage = (lang: string) => onInfoUpdate({ ...info, lang })

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="
        inline-flex w-full justify-center rounded-md border border-gray-300
        bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm
        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      ">
        <GlobeEuropeAfricaIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Target Language
        <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
      </Menu.Button>
      <Menu.Items className="
        absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg
        ring-1 ring-black ring-opacity-5 focus:outline-none
      ">
        <div className="py-1">
          {LANGUAGE_OPTIONS.map(({ lang, name }) => (
            <Menu.Item key={lang}>
              {({ active }) => (
                <button
                  className={classNames(
                    active || info.lang === lang ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                  onClick={() => setLanguage(lang)}
                >{ name }</button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  )
}