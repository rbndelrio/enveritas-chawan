import React from 'react'

import { AppCtx } from '@chawan/react'
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
        (child) => <AppCtx.Provider children={child} value={null} />
        // (child) => <ReduxProvider children={child} store={store} />,
      ]}
    >
      <>
        {props.children}
      </>
    </Compose>
  )
}