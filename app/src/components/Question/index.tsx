import { } from '@chawan/forms'

const QuestionList = () => {
  // const { pathname } = useLocation()
  // const [appState, setAppState] = useRecoilState<AppState>(recoilState)

  // function toggleAllCheckbox(e: React.ChangeEvent<HTMLInputElement>): void { /* eslint-disable-line prettier/prettier */
  //   // reverse all todo.completed: boolean flag
  //   setAppState({ todoList: appState.todoList.map((t: Todo): Todo => ({ ...t, completed: e.target.checked })) }) /* eslint-disable-line prettier/prettier */
  // }

  return (
    <section className="main">
      <ul className="todo-list">
        {appState.todoList
          .filter((t: Todo): boolean => {
            switch (pathname) {
              case '/':
                return true
              case '/active':
                return t.completed === false
              case '/completed':
                return t.completed === true
              default:
                return true
            }
          })
          .map((t: Todo): ReactElement => {
            return <Item key={t.id} todo={t} />
          })}
      </ul>
    </section>
  )
}

export { QuestionList }
