import { Menu } from '@headlessui/react'
import { ChevronDownIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/20/solid'

import { Question } from '@chawan/forms'


type QuestionListState = {
  questions: Array<Question>
  lang: string
}

interface Props {
  state: QuestionListState
  onQuestionsUpdate: React.Dispatch<React.SetStateAction<QuestionListState>>
}
export const QuestionHeader = (props: Props) => {
  return (
    <div className="
      border-b border-t border-gray-200
      pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6
    ">
      <div className="flex items-center">
        <h1 className="flex-1 text-lg font-medium">Questions</h1>
        <QuestionControls {...props} />
      </div>
    </div>
  )
}
export default QuestionHeader


const LANGUAGE_OPTIONS = [
  { lang: 'en-US', name: 'English (U.S.)' },
  { lang: 'pt-BR', name: 'Portuguese (Brazil)' },
  { lang: 'jv-ID', name: 'Javanese (Indonesia)' },
  { lang: 'rw-RW', name: 'Kinyarwanda (Rwanda)' },
]

const QuestionControls = ({ state, onQuestionsUpdate }: Props) => {
  const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

  const setLanguage = (lang: string) => onQuestionsUpdate({ ...state, lang })

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
                    active || state.lang === lang ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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