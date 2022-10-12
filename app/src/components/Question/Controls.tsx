import { Menu } from '@headlessui/react'
import { ChevronDownIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/20/solid'
import { PropsWithChildren } from 'react'

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
  onInfoUpdate?: React.Dispatch<React.SetStateAction<QuestionInfo>>
  state: QuestionListState
  dispatch: QuestionListAction
  selection: {
    items: StateProp<ListSelection>
    lastIndex: StateProp<number>
  }
}

export const QuestionControls = ({
  info,
  onInfoUpdate
}: Props) => {
  const setLanguage = (lang: string) => onInfoUpdate?.({ ...info, lang })

  return (
    <>
      <FancyDropdown
        onChange={(v) => setLanguage(v)}
        options={LANGUAGE_OPTIONS}
        state={info.lang}
        icon={(
          <GlobeEuropeAfricaIcon
            className="mr-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
      >Language</FancyDropdown>

      <FancyDropdown
        onChange={(v) => {}}
        options={[
          { name: 'Default View', value: 'default' }
        ]}
        state='default'
        icon={(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="mr-2 h-5 w-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>
        )}
      >Change View</FancyDropdown>
    </>
  )
}

export const QuestionActions = ({ selection }: Props) => {
  const [selectedItems, setSelection] = selection?.items || []

  if (!selectedItems || !selectedItems.length)
    return (<></>)

  return (
    <>
      <Button
        primary
        onClick={() => console.log('Implement me!')}
      >
        Create Block ({selectedItems.length})
      </Button>

      <Button onClick={() => setSelection([])}>
        Clear Selection
      </Button>
    </>
  )
}

export const QuestionOperations = () => (
  <>
    {/* Data Modal */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor"
      className="w-5 h-5 transition cursor-pointer hover:text-jebena-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
      />
    </svg>

    {/* Users & Permissions */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor"
      className="w-5 h-5 transition cursor-pointer hover:text-jebena-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    </svg>

    {/* Import / Export */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor"
      className="w-5 h-5 transition cursor-pointer hover:text-jebena-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
      />
    </svg>

    {/* Separator */}
    <div
      className="h-6 border-r border-gray-300 pl-1" aria-hidden="true"
    />

    {/* Root Context Menu */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor"
      className="w-6 h-6 transition cursor-pointer hover:text-jebena-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      />
    </svg>
  </>
)

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  primary?: boolean
}
const Button = ({ className, children, primary, ...props }: ButtonProps) => (
  <button
    {...props}
    className={`
      inline-flex items-center rounded-md border border-transparent
      px-2 py-1.5 text-sm font-medium shadow-sm
      focus:outline-none focus:ring-2 focus:ring-enveritas-600 ${
      primary
        ? 'bg-enveritas-600 hover:bg-enveritas-700 text-white focus:ring-offset-2'
        : 'bg-white hover:bg-gray-100 text-enveritas-700 border border-enveritas-700'
    }`}
  >
    { children || 'Submit' }
  </button>
)

interface FancyInput<T, U = T> {
  value?: T
  onChange: (value: U, e?: any) => void
  options?: T[]
}

const FancyDropdown = (
  props:
    FancyInput<{ value: string, name: string }, string>
    & { state: string, icon?: React.ReactNode }
    & PropsWithChildren
) => (
  <Menu as="div" className="relative">
    <Menu.Button className="
      inline-flex w-full justify-center rounded-md border border-gray-300
      bg-white/50 px-2 py-1.5 text-sm font-medium text-gray-700
      hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-jebena-500 focus:ring-offset-2
    ">
      {props.icon}
      <>{(props.options || []).find(v => v.value === props.state)?.name || props.children}</>
      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
    </Menu.Button>
    <Menu.Items className="
      absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg
      ring-1 ring-black ring-opacity-5 focus:outline-none
    ">
      <div className="py-1">
        {(props.options || []).map(({ value, name }) => (
          <Menu.Item key={value}>
            {({ active }) => (
              <button
                className={classNames(
                  active || props.state === value ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block w-full text-left px-4 py-2 text-sm font-medium'
                )}
                onClick={(e) => props.onChange(value, e)}
              >{ name }</button>
            )}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  </Menu>
)