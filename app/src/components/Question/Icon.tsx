import type { Question } from '@chawan/forms'
import { ChatBubbleBottomCenterTextIcon, PlusSmallIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'


export const PlusIcon = () => {
  return (<PlusSmallIcon className="h-5 w-5" aria-hidden="true" />)
}


interface TypedIconProps extends React.ComponentProps<'svg'> { typ: Question['typ'] }
export const TypedIcon = ({ typ, ...props }: TypedIconProps) => {
  if (typ === 'text') {
    <ChatBubbleBottomCenterTextIcon {...props} />
  }
  return (<QuestionMarkCircleIcon {...props} />)
}