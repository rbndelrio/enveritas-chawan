import { Question, QuestionVersion } from '@chawan/forms'
import { Listbox, RadioGroup, Transition } from '@headlessui/react'
import { CalendarIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

// import { InputChip } from './InputChip'

const assignees = [
  { name: 'Unassigned', value: null },
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Riau Team',
    value: 'central-riau',
  },
  // More items...
]
const labels = [
  { name: 'Unlabelled', value: null },
  { name: 'Sample Frame', value: 'special' },
  { name: 'A-B Trial', value: 'super-special' },
  // More items...
]
const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' },
  { name: 'Pre-Seed', value: 'soon' },
  { name: 'Post-Harvest', value: 'whenever' },
  // More items...
]

const types = [
  { name: 'Text', value: 'text' },
  { name: 'Choice', value: 'select' },
  { name: 'Multiple Choice', value: 'mselect' },
  { name: 'True/False', value: 'boolean' },
]

const questions = [
  'How many objects to you have?',
  'Where are the beans?',
  "Where can I get some good coffee around here?",
  'Tell me about your farm'
]
const getRandomQuestion = () => questions[Math.floor(Math.random()*questions.length)];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


function MyRadioGroup() {
  let [plan, setPlan] = useState('startup')

  return (
    <RadioGroup value={plan} onChange={setPlan}>
      <RadioGroup.Label>Plan</RadioGroup.Label>
      <RadioGroup.Option value="startup">
        {({ checked }) => (
          <span className={checked ? 'bg-blue-200' : ''}>Startup</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="business">
        {({ checked }) => (
          <span className={checked ? 'bg-blue-200' : ''}>Business</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="enterprise">
        {({ checked }) => (
          <span className={checked ? 'bg-blue-200' : ''}>Enterprise</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  )
}

type StateProp<T, U = React.Dispatch<React.SetStateAction<T>>> = [T, U, (() => void)?]
interface EditorProps {
  editorState: StateProp<Boolean>
  questionState: StateProp<Question, (q: Question) => void>
  versionState: StateProp<QuestionVersion | null>
}
export default function Editor(props: EditorProps) {
  const setEditorVisibility = props?.editorState?.[1]

  // FIXME: Cutting my losses here and not trying to sync with the data model anymore

  const [assigned, setAssigned] = useState(assignees[0])
  const [labelled, setLabelled] = useState(labels[0])
  const [dated, setDated] = useState(dueDates[0])


  const [questionTitle, setQuestionTitle] = useState<string>(getRandomQuestion())
  const [questionDescription, setQuestionDescription] = useState<string>('')

  const [type, setType] = useState<string>(types[0].value)
  const [choices, setChoices] = useState<string[]>(['Option 1', 'Option 2'])

  const setChoice = (index: number, value: string) => {
    const newChoices = choices.slice(0)
    newChoices[index] = value
    return setChoices(newChoices)
  }

  return (
    <div className="relative">
      <div className="
        overflow-hidden rounded-lg border border-gray-300 shadow-sm
        focus-within:border-enveritas-500 focus-within:ring-1focus-within:ring-enveritas-500
      ">
        <label htmlFor="title" className="sr-only">
          Question
        </label>
        <textarea
          rows={2}
          name="title"
          id="title"
          className="block resize-none w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
          placeholder="Write your question here"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />

        {/* TODO: Replace this with a proper UI component */}
        <div className="border-t border-gray-200">
          <select
            name="title"
            id="title"
            className="block w-full border-0 pt-2.5 placeholder-gray-500 focus:ring-0"
            value={type}
            onChange={(e) => setType(e.target.value)}
            >
            {types.map((type, t) => (
              <option value={type.value} key={type.value || t}>{type.name}</option>
            ))}
          </select>
          <div className="p-2">
            {/* <InputChip
              className="flex"
              values={types}
              state={type}
              setState={setType}
              label="Select Response Type"
            /> */}

            {
              (type === 'select' || type === 'mselect') && <div className='flex flex-col space-y-2'>
                {choices.map((choice, c) => (
                  <input
                    className="block w-full rounded-sm border p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder-gray-500 focus:ring-0"
                    key={c}
                    value={choice}
                    placeholder="Choice"
                    onChange={(e) => setChoice(c, e.target.value)}
                  />
                ))}
              </div>
            }
          </div>
        </div>

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          {/* Don't need this bit anymore */}
          {/* <div className="py-2"><div className="h-9" /></div> */}
          <div className="pb-2" />
          <div className="h-px" />
            <div className="py-2"><div className="py-px"><div className="h-9" /></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex space-x-2">
            <Listbox as="div" value={assigned} onChange={setAssigned} className="flex-shrink-0">
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only"> Assign </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="
                      relative inline-flex items-center whitespace-nowrap rounded-full
                      bg-gray-50 py-1.5 px-1.5 text-sm font-medium text-gray-500
                      hover:bg-green-400/10 sm:px-3
                    ">
                      {assigned.value === null ? (
                        <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1" aria-hidden="true" />
                      ) : (
                        <img src={assigned.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                      )}

                      <span
                        className={classNames(
                          assigned.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block'
                        )}
                      >
                        {assigned.value === null ? 'Assign' : assigned.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="
                        absolute right-0 mt-1 max-h-56 w-52 overflow-auto rounded-lg
                        bg-white py-2 text-base shadow ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm
                      ">
                        {assignees.map((assignee) => (
                          <Listbox.Option
                            key={assignee.value}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-gray-100' : 'bg-white',
                                'relative cursor-default select-none py-1.5 px-2.5'
                              )
                            }
                            value={assignee}
                          >
                            <div className="flex items-center">
                              {assignee.avatar ? (
                                <img src={assignee.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                              ) : (
                                <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              )}

                              <span className="ml-3 block truncate font-medium">{assignee.name}</span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            <Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only"> Add a label </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="
                      relative inline-flex items-center whitespace-nowrap rounded-full
                      bg-gray-50 py-1.5 px-1.5 text-sm font-medium text-gray-500
                      hover:bg-green-400/10 sm:px-3
                    ">
                      <TagIcon
                        className={classNames(
                          labelled.value === null ? 'text-gray-300' : 'text-gray-500',
                          'h-5 w-5 flex-shrink-0 sm:-ml-1'
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          labelled.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block'
                        )}
                      >
                        {labelled.value === null ? 'Label' : labelled.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="
                        absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg
                        bg-white py-2 text-base shadow ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm
                      ">
                        {labels.map((label) => (
                          <Listbox.Option
                            key={label.value}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-gray-100' : 'bg-white',
                                'relative cursor-default select-none py-1.5 px-2.5'
                              )
                            }
                            value={label}
                          >
                            <div className="flex items-center">
                              <span className="block truncate font-medium">{label.name}</span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>

            <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only"> Add a due date </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="
                      relative inline-flex items-center whitespace-nowrap rounded-full
                      bg-gray-50 py-1.5 px-1.5 text-sm font-medium text-gray-500
                      hover:bg-green-400/10 sm:px-3
                    ">
                      <CalendarIcon
                        className={classNames(
                          dated.value === null ? 'text-gray-300' : 'text-gray-500',
                          'h-5 w-5 flex-shrink-0 sm:-ml-1'
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          dated.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block'
                        )}
                      >
                        {dated.value === null ? 'Due date' : dated.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="
                        absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg
                        bg-white py-2 text-base shadow ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm
                      ">
                        {dueDates.map((dueDate) => (
                          <Listbox.Option
                            key={dueDate.value}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-gray-100' : 'bg-white',
                                'relative cursor-default select-none py-2 px-3'
                              )
                            }
                            value={dueDate}
                          >
                            <div className="flex items-center">
                              <span className="block truncate font-medium">{dueDate.name}</span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            {/* <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach media</span>
            </button> */}
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={(e) => { e.preventDefault();  console.log(setEditorVisibility); setEditorVisibility(true); }}
              className="
                inline-flex items-center rounded-md border border-transparent
                bg-enveritas-600 px-4 py-2 text-sm font-medium text-white shadow-sm
                hover:bg-enveritas-700 focus:outline-none focus:ring-2 focus:ring-enveritas-500 focus:ring-offset-2
              "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
