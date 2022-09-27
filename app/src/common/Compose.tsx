type PropsWithChildren = { [key: string]: any; children: any }

type ComposableFunction = (
  child: React.ComponentElement<PropsWithChildren, any>,
) => React.ComponentElement<PropsWithChildren, any>

interface ComposeProps {
  components: ComposableFunction[]
  children: React.ReactNode
}
// Special thanks to: https://github.com/devhubapp/devhub
const Compose = (props: ComposeProps) => {
  const { components = [], children } = props

  return (
    <>
      {components.reduceRight<React.ComponentElement<PropsWithChildren, any>>(
        (result, item) => item(result),
        children as any,
      )}
    </>
  )
}

export { Compose };
