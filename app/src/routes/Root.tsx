import { Transition } from '@headlessui/react';
import { Outlet } from "react-router-dom";
import { Details } from '../layout/Details';
import { Info } from '../layout/Info';
import { Navigation } from '../layout/Navigation';
import { Shell } from '../layout/Shell';

export const Root = () => {
  const navItems = [
    { name: 'Projects', href: '/projects', current: true },
    { name: 'Surveys', href: '#', current: true },
    { name: 'More?', href: '#', current: false },
  ]
  const userNavItems = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  return (
    <Shell
      navigation={
        <Navigation
          items={navItems}
          userItems={userNavItems}
        />
      }

      info={<Info />}

      detail={<Details />}
    >
      <Transition
        appear={true}
        show={true}
        as={'div'}
        className=""
        enter="transition duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Outlet />
      </Transition>
    </Shell>
  )
}

export default Root