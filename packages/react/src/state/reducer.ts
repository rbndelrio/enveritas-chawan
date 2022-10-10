interface ListState<T = unknown> {
  /** Last action performed */
  prev: string

  /** Position of active item */
  index: number

  /** ID of the active item */
  active: number

  /** Number of items, includes removed ones */
  size: number

  /** Order of list items */
  order: Array<number>

  /** Data of list items */
  data: Record<number, T | undefined>
}

export const initialListState: ListState = {
  prev: 'init',
  index: 0,
  active: 0,
  size: 1,
  order: [ 0 ],
  data: { 0: undefined },
};

// TODO: The typing here could be more intelligent by implementing a 2d tuple matrix
interface ListAction<T> extends Omit<Partial<ListState<T>>, 'data'> {
  /** Action to perform */
  type: String

  // This should probably be renamed to payload
  data?: T | Array<T>
}

export const getListItems = <T = unknown>({ order, data }: ListState<T>) =>
  order
    .map(id => data[id])
    // Note we're not filtering with Boolean because other falsy types could be valid T values
    .filter(item => item !== undefined)

export function listReducer<
    T,
    List extends ListState<T>,
    Action extends ListAction<T>
  >(state: List, action: Action): List {
  const last = action.type

  switch (action.type) {
    case 'set_active': {
      const newActiveId = Math.min(Math.max(action.active ?? 0, 0), state.size - 1)
      return {
        ...state,
        last,
        index: state.order.indexOf(newActiveId),
        active: newActiveId,
      };
    }
    case 'set_index': {
      const fromIndex = state.index
      const toIndex = Math.min(Math.max(action.index ?? 0, 0), state.order.length - 1)
      const order = [...state.order]

      order.splice(
        toIndex,
        0,
        ...order.splice(fromIndex, 1)
      )

      return {
        ...state,
        last,
        index: toIndex,
        order,
      }
    }
    case 'set_data': {
      const index = Math.max(0, state.active ?? state.order.length)

      return {
        ...state,
        last,
        data: {
          ...state.data,
          [index]: action.data,
        },
      };
    }
    case 'delete_data': {
      return {
        ...state,
        last,
        data: {
          ...state.data,
          [state.active]: undefined,
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
