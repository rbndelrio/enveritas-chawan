import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

interface DropdownInputProps<T> {
  values: Array<T>
  state: T
  setState: React.Dispatch<React.SetStateAction<T>>
  label?: string
  icon?: React.ReactElement
  className?: string
}
type DropdownValues = { name: string, value: string } | { name: string, value: null }
export const InputChip = (props: DropdownInputProps<DropdownValues>) => {
  return (
    <Listbox
      as="div"
      value={props.state}
      onChange={props.setState}
      className={classNames("flex-shrink-0", props.className || '')}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only"> { props.label || '' } </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="
              relative inline-flex items-center whitespace-nowrap rounded-full
              bg-gray-50 py-1.5 px-1.5 text-sm font-medium text-gray-500
              hover:bg-green-400/10 sm:px-3
            ">
              {/* Icon should go here */}
              <span
                className={classNames(
                  props.state.value === null ? '' : 'text-gray-900',
                  'hidden truncate sm:block',
                  props.icon ? 'sm:ml-2' : ''
                )}
              >
                {props.state.value === null ? 'Due date' : props.state.name}
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
                {props.values.map((item, i) => (
                  <Listbox.Option
                    key={item.value || i}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-gray-100' : 'bg-white',
                        'relative cursor-default select-none py-1.5 px-2.5'
                      )
                    }
                    value={item}
                  >
                    <div className="flex items-center">
                      <span className="block truncate font-medium">{item.name}</span>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
export default InputChip