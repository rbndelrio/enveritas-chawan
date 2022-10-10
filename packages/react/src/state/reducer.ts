export interface ListState<T = unknown> {
  /** Last action performed */
  last: ListActionType | string

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

// TODO: The typing here could be more intelligent by implementing a 2d tuple matrix
export type ListActionType =
  // Replace global state
  'init' | 'import' |

  // Pure state mutation
  'set_active' | 'set_index' | 'set_data' | 'delete_data' |

  // Mutations with side effects
  'add_item' | 'add_items';

  // ¯\_(ツ)_/¯
  // string;

export interface ListAction<T> extends Omit<Partial<ListState<T>>, 'data'> {
  /** Action to perform */
  type: ListActionType | string
  data?: T | Array<T> // This should probably be renamed to payload
}

export const initialListState = <T = unknown>(item?: T): ListState<T> => ({
  last: 'init',
  index: 0,
  active: 0,
  size: 1,
  order: [ 0 ],
  data: { 0: item },
});

export const getListItems = <T = unknown>({ order, data }: ListState<T>) =>
  order
    .map(id => data[id])
    // Note we're not filtering with Boolean because other falsy types could be valid T values
    .filter(item => item !== undefined)


/** List Reducer
 *
 * This is a reducer for managing the UI state of a list without directly accessing the data within.
 * This opens the door for item grouping and _potentially_ nested list management
 *
 * TODO: add methods to remove items, revisit action/property nomenclature
 * FIXME: T extending Array could cause bugs with certain actions
 *
 * @param action.type - Actions
 * * `init` - Reset to initial state
 * * `import_items` - Replace state with provided data
 * * `set_active` - Sets current/focused list item
 * * `set_index` - Change position of active item
 * * `set_data` - Replace the data of the current item
 * * `delete_data` - Sets active item to undefined
 * * `add_item` - Add single item to list
 * * `add_items` - Add multiple items to list
 */
export function listReducer<T = unknown>(
  state: ListState<T>,
  action: ListAction<T>
): ListState<T> {
  const last = action.type

  switch (action.type) {
    case 'init': {
      return initialListState();
    }
    case 'import': {
      if (!(Array.isArray(action.data) && action.data.length)) return initialListState()

      const length = action.data.length

      const order = Array.from<any>({ length }) // This optimization will save like 5 nanoseconds 🏎💨
      const newState: ListState<T> = {
        last,
        active: length - 1,
        index: length - 1,
        size: length,
        order,
        data: { ...order },
      }

      for (let i = 0; i < length; i++) {
        const item = action.data[i];
        newState.order[i] = i
        newState.data[i] = item
      }

      return newState
    }
    case 'set_active': {
      const id = Math.min(Math.max(action.active ?? 0, 0), state.size - 1)
      return {
        ...state,
        last,

        index: state.order.indexOf(id),
        active: id,
      };
    }
    case 'set_index': {
      const from = state.index
      const to = Math.min(Math.max(action.index ?? 0, 0), state.order.length - 1)
      const order = [...state.order]

      order.splice(to, 0, ...order.splice(from, 1))

      return {
        ...state,
        last,

        index: to,
        order,
      }
    }
    case 'set_data': {
      const id = Math.max(0, state.active ?? state.order.length)

      return {
        ...state,
        last,

        data: {
          ...state.data,
          [id]: action.data as T,
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
    case 'add_item': {
      const id = state.size + 1
      let index: number
      let order: number[]

      if (Number.isInteger(action.index)) {
        index = action.index || 0
        order = [
          ...state.order.slice(0, index),
          id,
          ...state.order.slice(index)
        ]
      } else {
        index = id
        order = [...state.order, id]
      }

      return {
        ...state,
        last,

        index,
        size: id,
        order,
        data: {
          ...state.data,
          [id]: action.data as T,
        },
      }
    }
    case 'add_items': {
      let size = state.size

      // Coerce data into an Item array
      const items = Array.isArray(action.data) && action.data.length
        ? action.data
        : []

      // Incrementing indices based on previous state's size
      const ids = Array
        .from({ length: items.length })
        .map((_, i) => size + 1 + i)

      const order = Number.isInteger(action.index)
        ? [ // Set new order based on index position
          ...state.order.slice(0, action.index),
          ...ids,
          ...state.order.slice(action.index),
        ]
        : [ // Append to the end of the array
          ...state.order,
          ...ids,
        ]

      size += items.length

      return {
        ...state,
        last,

        size,
        order,
        data: {
          ...state.data,
          ...ids.reduce<Record<number, T>>((obj, id, i) => { obj[id] = items[i]; return obj }, {})
        },
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
