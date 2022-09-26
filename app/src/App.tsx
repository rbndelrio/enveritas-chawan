import { useState } from 'react'

import { FORMS } from '@chawan/forms'
import { Five } from '@chawan/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      { FORMS }
      <Five value={4} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
