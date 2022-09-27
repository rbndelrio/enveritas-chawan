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
        {[]
          .filter(Boolean)
          .map((t: any): React.ReactElement => {
            return <div key={t.id} />
          })}
      </ul>
    </section>
  )
}

export { QuestionList }
