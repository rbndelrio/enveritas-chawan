import { Fragment } from 'react';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";

import Logo from '../assets/Logo';

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

interface Props {
  items: Array<{ name: string; href?: string, current?: boolean }>,
  userItems: Array<{ name: string; href?: string, current?: boolean }>
}
const Navigation = (props: Props) => {
  const IMG = "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-jebena-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-0">
                  <Link to="/">
                    <Logo width="124px" className='fill-current text-white' />
                  </Link>
                </div>
              </div>

              {/* Search section */}
              <div className="flex flex-1 justify-center lg:justify-end">
                <div className="w-full px-2 lg:px-6">
                  <label htmlFor="search" className="sr-only">
                    Search projects
                  </label>
                  <div className="relative text-jebena-200 focus-within:text-gray-400">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="
                        block w-full py-2 pl-10 pr-3 leading-5 rounded-md border-1 border-jebena-400/50
                        bg-jebena-500 bg-opacity-2 text-jebena-100 placeholder-jebena-200
                        focus:bg-gray-50 focus:text-gray-900 focus:placeholder-gray-400
                        focus:outline-none focus:ring-0
                        transition
                        sm:text-sm
                      "
                      placeholder="Search Projects, Surveys, Scoring, and coffee shop recs"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="
                  inline-flex items-center justify-center rounded-md
                  bg-jebena-600 p-2 text-jebena-400 hover:bg-jebena-600 hover:text-white
                  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jebena-600
                  focus:outline-none
                ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3CenterLeftIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Links section */}
              <div className="hidden lg:block lg:w-80">
                <div className="flex items-center justify-end">
                  <div className="flex">
                    {props.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href || '#'}
                        className="rounded-md px-3 py-2 text-sm font-medium text-jebena-200 hover:text-white"
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="
                        flex rounded-full
                        bg-jebena-700 text-sm text-white
                        focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jebena-700
                        focus:outline-none
                      ">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={IMG}
                          alt=""
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
                        absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md
                        bg-white py-1 shadow-lg
                        ring-1 ring-black ring-opacity-5 focus:outline-none
                      ">
                        {props.userItems.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.href || '#'}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {props.items.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href || '#'}
                  className={classNames(
                    item.current
                      ? 'text-white bg-jebena-800'
                      : 'text-jebena-200 hover:text-jebena-100 hover:bg-jebena-600',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-jebena-800 pt-4 pb-3">
              <div className="space-y-1 px-2">
                {props.userItems.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href || '#'}
                    className="
                      block rounded-md px-3 py-2 text-base font-medium
                      text-jebena-200 hover:bg-jebena-600 hover:text-jebena-100
                    "
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export { Navigation };
