import { FormEventHandler, Fragment, useRef, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CalendarIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid';

// import { Question, QuestionVersion } from '@chawan/forms'
// import { ListAction } from '@chawan/react';

import { DUE_DATES, LABELS, TYPES, USERS } from '../../data';
import { QuestionData } from './List';

// import { InputChip } from './InputChip'

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

type StateProp<T, U = React.Dispatch<React.SetStateAction<T>>> = [T, U, (() => void)?]
interface Controls {
  editor: StateProp<boolean>
  label: StateProp<typeof LABELS[number]>
  assignee: StateProp<typeof USERS[number]>
  dueDate: StateProp<typeof DUE_DATES[number]>
  type: StateProp<TypeOption>
}

interface EditorProps {
  editorState: StateProp<boolean>
  // versionState: StateProp<QuestionVersion | null>
  data: QuestionData
  setData: Function
}
export function Editor(props: EditorProps) {
  const { data, setData } = props

  const getType = (str: string): TypeOption => (TYPES.find(x => x.value === str) || TYPES[0])
  const controls: Controls = {
    editor: props.editorState,
    label: useState(LABELS[0]),
    assignee: useState(USERS[0]),
    dueDate: useState(DUE_DATES[0]),
    type: useState(getType(data.type))
  }
  const [type, setTypeComponent] = controls.type
  const [editor, setEditor] = controls.editor

  const setType = (type: TypeOption) => {
    setData({ type: type.value })
    setTypeComponent(type)
  }

  const setChoice = (index: number, value: string) => {
    const choices = [...data.choices || []]
    choices[index] = value
    setData({ choices })
  }

  const removeChoice = (index: number) => {
    const choices = [...data.choices || []]
    choices.splice(index, 1)
    setData({ choices })
  }

  const choices = useRef<HTMLInputElement>(null);
  const focusChoice = (i: number) => {
    setTimeout(() => choices.current?.focus())
  }
  const handlePlaceholderFocus = () => {
    setChoice(data.choices?.length || 0, '');
    focusChoice((data.choices?.length || 1) - 1)
  }

  return (
    <div className="relative bg-white rounded-lg">
      <div className="
        overflow-hidden rounded-lg border border-gray-300 shadow-sm
        focus-within:border-enveritas-500 focus-within:ring-1focus-within:ring-enveritas-500
      ">
        <QuestionInput
          value={data.title}
          onChange={(e) => setData({ title: e.currentTarget.value })}
        />

        {/* TODO: Replace this with a proper UI component */}
        <div className="border-t border-gray-200">
          <FancyTypeInput
            value={type}
            options={TYPES}
            onChange={setType}
          />
          <div className="p-2">
            {
              (data.type === 'select' || data.type === 'mselect') && <div className='flex flex-col space-y-2'>
                <>
                  {data.choices?.map((choice, c) => (
                    <input
                      className="
                        block w-full rounded-sm border-1 p-1 sm:text-sm
                        border-gray-300 shadow-sm
                        focus:border-jebena-300 focus:ring-jebena-300
                        placeholder-gray-500 focus:ring-0
                      "
                      ref={choices}
                      key={c}
                      value={choice}
                      placeholder="Choice"
                      onChange={(e) => setChoice(c, e.currentTarget.value)}
                      onBlur={(e) => {
                        if (!e.currentTarget.value) {
                          removeChoice(c)
                          focusChoice(c)
                        }
                      }}
                    />
                  ))}

                  <input
                    className="
                      block w-full rounded-sm border-1 p-1 sm:text-sm
                      border-gray-300 shadow-sm
                      focus:border-jebena-300 focus:ring-jebena-300
                      placeholder-gray-500 focus:ring-0
                    "
                    key={data.choices?.length || 0}
                    value={''}
                    placeholder="Choice"
                    onClick={handlePlaceholderFocus}
                    onChange={handlePlaceholderFocus}
                    onFocus={handlePlaceholderFocus}
                  />
                </>
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
        <LayoutExtra> </LayoutExtra>

        <LayoutLower
          left={
            <LowerControls {...controls} />
          }
          right={
            <>
              <PrimaryButton onClick={(e) => { e.preventDefault(); setEditor(false); }}>
                Save
              </PrimaryButton>
            </>
          }
        />
      </div>
    </div>
  )
}

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
}

type Input<T = string, U = HTMLInputElement> = {
  value: T
  onChange: FormEventHandler<U>
}
const QuestionInput = ({ value, onChange }: Input<string, HTMLTextAreaElement>) => (
  <>
    <label htmlFor="title" className="sr-only">Question</label>
    <textarea
      rows={2}
      name="title"
      id="title"
      className="block resize-none w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
      placeholder="Write your question here"
      value={value}
      onChange={onChange}
    />
  </>
)

type TypeOption = typeof TYPES[number]
interface FancyInput<T> {
  value: T
  onChange: (value: T) => void
  options?: T[]
}
const FancyTypeInput = ({ value, options, onChange }: FancyInput<TypeOption>) => (
  <Listbox
    value={value}
    onChange={(value) => onChange(value)}
    defaultValue={value}
  >
    {({ open }) => (
      <div className="mt-3 px-2">
        <Listbox.Button
          className="
            relative w-full cursor-default rounded-md
            py-2 pl-3 pr-10 text-left shadow-sm
            border border-gray-300 bg-white
            focus:border-jebena-500 focus:outline-none focus:ring-1 focus:ring-jebena-500
            sm:text-sm
          "
        >
          <span className="flex items-center">
            <span
              aria-label={!value.disabled ? 'Enabled' : 'Disabled'}
              className={classNames(
                !value.disabled ? 'bg-green-400' : 'bg-gray-200',
                'inline-block h-2 w-2 flex-shrink-0 rounded-full'
              )}
            />
            <span className="ml-3 block truncate">{value.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            {/* <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          </span>
        </Listbox.Button>
        <Transition
          show={open}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="
              absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md
              bg-white py-1 text-base shadow-lg
              ring-1 ring-black ring-opacity-5 focus:outline-none
              sm:text-sm
            "
          >
            {(options || TYPES).map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt}
                disabled={!opt.value || !!opt.disabled}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-jebena-700' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9'
                  )
                }
              >
                {({ selected, active, disabled }) => (
                  <>
                    <div className="flex items-center">
                      {/* TODO: Replace this indicator with an actual icon */}
                      <span
                        className={classNames(
                          !disabled ? 'bg-enveritas-500' : 'bg-gray-200',
                          'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                      >
                        {opt.name}
                        <span className="sr-only"> is {!disabled ? 'enabled' : 'coming soon'}</span>
                      </span>
                    </div>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? 'text-white' : 'text-jebena-700',
                          'absolute inset-y-0 right-0 flex items-center pr-4'
                        )}
                      >
                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    )}
  </Listbox>
)
const TypeInput = ({ value, onChange }: Input<string, HTMLSelectElement>) => (
  <select
    name="title"
    id="title"
    className="block w-full border-0 pt-2.5 placeholder-gray-500 focus:ring-0"
    value={value}
    onChange={onChange}
  >
    {TYPES.map((type, t) => (
      <option value={type.value} key={type.value || t}>{type.name}</option>
    ))}
  </select>
)

interface LowerActionBarProps {
  left: React.ReactNode
  right: React.ReactNode
}

const LayoutExtra = (props: { children: React.ReactNode }) => <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">{props.children}</div>
const LayoutLower = (props: LowerActionBarProps) =>
  <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
    <div className="flex space-x-2">
      {props.left}
    </div>
    <div className="flex-shrink-0">
      {props.right}
    </div>
  </div>


const PrimaryButton = ({ className, children, ...props }: ButtonProps) => (
  <button
    {...props}
    className="
      inline-flex items-center rounded-md border border-transparent
      bg-enveritas-600 px-4 py-2 text-sm font-medium text-white shadow-sm
      hover:bg-enveritas-700 focus:outline-none focus:ring-2 focus:ring-enveritas-500 focus:ring-offset-2
    "
  >
    { children || 'Submit' }
  </button>
)

// const LowerActions = () => {
//   return (
//     <>
//       <PrimaryButton>Save</PrimaryButton>
//     </>
//   )
// }
const LowerControls = ({
  label: [label, setLabel],
  assignee: [assignee, setAssignee],
  dueDate: [dueDate, setDueDate],
}: Controls) => {
  return (
    <>
      <Listbox as="div" value={assignee} onChange={setAssignee} className="flex-shrink-0">
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only"> Assign </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="
                relative inline-flex items-center whitespace-nowrap rounded-full
                bg-gray-50 py-1.5 px-1.5 text-sm font-medium text-gray-500
                hover:bg-green-400/10 sm:px-3
              ">
                {assignee.value === null ? (
                  <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1" aria-hidden="true" />
                ) : (
                  <img src={assignee.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                )}

                <span
                  className={classNames(
                    assignee.value === null ? '' : 'text-gray-900',
                    'hidden truncate sm:ml-2 sm:block'
                  )}
                >
                  {assignee.value === null ? 'Assign' : assignee.name}
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
                  {USERS.map((assignee) => (
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
      <Listbox as="div" value={label} onChange={setLabel} className="flex-shrink-0">
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
                    label.value === null ? 'text-gray-300' : 'text-gray-500',
                    'h-5 w-5 flex-shrink-0 sm:-ml-1'
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    label.value === null ? '' : 'text-gray-900',
                    'hidden truncate sm:ml-2 sm:block'
                  )}
                >
                  {label.value === null ? 'Label' : label.name}
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
                  {LABELS.map((label) => (
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

      <Listbox as="div" value={dueDate} onChange={setDueDate} className="flex-shrink-0">
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
                    dueDate.value === null ? 'text-gray-300' : 'text-gray-500',
                    'h-5 w-5 flex-shrink-0 sm:-ml-1'
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    dueDate.value === null ? '' : 'text-gray-900',
                    'hidden truncate sm:ml-2 sm:block'
                  )}
                >
                  {dueDate.value === null ? 'Due date' : dueDate.name}
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
                  {DUE_DATES.map((dueDate) => (
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
    </>
  )
}
