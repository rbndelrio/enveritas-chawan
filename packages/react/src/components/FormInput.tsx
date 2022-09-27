import { CompositeType } from '@chawan/forms';
import { useState } from 'react';
type State = {
  text: string;
};
type Props = {
  default: string;
  placeholder: string;
  type: keyof CompositeType
  value: any
}

type NodeProps = Pick<CompositeType, keyof CompositeType> & {
  value: any
  onChange: (value: any) => void
}
const Input = (props: NodeProps) => {
  const [state, setState] = useState({ value: props.value });
  // typing on RIGHT hand side of =
  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setState({ value: e.currentTarget.value });
  };
  return (
    <div>
      <input type="text" value={state.value} onChange={onChange} />
    </div>
  );
}

// const QuestionWrap = (props: Props) => {
//   const [value, setValue] = useState(props)
//   return (
//     <div>
//       <Input
//         value={value}
//         onChange={setValue}
//       />
//     </div>
//   );
// }