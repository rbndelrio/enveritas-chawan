import React from 'react'

import { UserFormContextProvider } from '@chawan/react'
import { Compose } from './common/Compose'

// const { persistor, store } = configureStore()

export interface AppProvidersProps {
  children: React.ReactNode
}
export function AppProviders(props: AppProvidersProps) {
  return (
    // Sorta unnecessary abstraction but it's pretty clean at a larger scale
    <Compose
      components={[
        (child) => <UserFormContextProvider children={child} />
        // (child) => <ReduxProvider children={child} store={store} />,
      ]}
    >
      <>
        {props.children}
      </>
    </Compose>
  )
}