interface Props {
  title?: string
  children?: React.ReactNode
}
const Details = (props: Props) => {
  return (
    <>
      <div className="pt-6 pb-2">
        <h2 className="text-sm font-semibold">{props.title}</h2>
      </div>
      <div>
        { props.children }
      </div>
    </>
  )
}

export { Details }
