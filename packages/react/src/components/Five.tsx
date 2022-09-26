import { useFive } from '../hooks';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  value?: number;
}
export function Five({ value = 5 }: Props) {
  const { five, set } = useFive(value)

  return (
    <div className="Five">
      <p style={five !== 5 ? { color: 'red' } : undefined }>Five is {five}</p>
      <button onClick={() => set(five + 1)}>increase</button>
    </div>
  )
}
