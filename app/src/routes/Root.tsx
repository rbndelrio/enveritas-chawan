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
      <Outlet />
    </Shell>
  )
}

export default Root