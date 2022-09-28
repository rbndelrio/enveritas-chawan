import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

type DropdownProps<T> = {
  sharedState: [T, React.Dispatch<React.SetStateAction<T>>]
  items: Array<{ name: string, action: Function }>
}
export default function Dropdown<T>(props: DropdownProps<T>) {
  // const

  const setState = (arg: Function) => {
    props.sharedState[1](arg(props.sharedState[0]))
  }

  type MenuItemProps = {name: string, onClick: any}
  const MenuItem = ({name, onClick}: MenuItemProps) => (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`${
            active ? 'bg-jebena-500 text-white' : 'text-gray-900'
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {/* {active ? (
            <EditActiveIcon
              className="mr-2 h-5 w-5"
              aria-hidden="true"
            />
          ) : (
            <EditInactiveIcon
              className="mr-2 h-5 w-5"
              aria-hidden="true"
            />
          )} */}
          { name }
        </button>
      )}
    </Menu.Item>
  )
  return (
    <div className="fixed top-16 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="
            inline-flex w-full justify-center rounded-md
            bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white
            hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
          ">
            Options
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-jebena-200 hover:text-jebena-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="
            absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white
            shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
          ">
            <div className="px-1 py-1 ">
              {props.items.map(item => (
                <MenuItem
                  name="item"
                  onClick={setState(item.action)}
                />
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}