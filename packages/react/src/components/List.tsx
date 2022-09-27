import { ReactNode } from "react";

interface Props<T> {
  as: React.ComponentClass | "ul"
  items: T[];
  renderItem: (item: T) => ReactNode;
}
export function List<T>(props: Props<T>) {
  const { as: Component, items, renderItem } = props;
  return (
    <Component>
      {items.map(renderItem)}
    </Component>
  );
}