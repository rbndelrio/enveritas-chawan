// TODO: Make these types global or something
import type { Question } from '@chawan/forms'
type QuestionListState = {
  questions: Array<Question>
  lang: string
}
interface ListProps {
  state: QuestionListState
  onQuestionsUpdate: React.Dispatch<React.SetStateAction<QuestionListState>>
}
interface QuestionProps extends ListProps {
  index: number
  question: Question
  questions: Question[]
  state: QuestionListState
}
export const Answer = (props: QuestionProps) => {
  return (<></>)
}