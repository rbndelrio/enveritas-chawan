export const initialState = {
  selected: 0,
  data: 'Hello',
};

export function reducer<T = unknown>(state: T, action: {type: string} & Record<string, any>) {
  switch (action.type) {
    case 'select': {
      return {
        ...state,
        selected: action.contactId,
        data: '',
      };
    }
    case 'edited_data': {
      return {
        ...state,
        data: action.data,
      };
    }
    case 'sent_data': {
      return {
        ...state,
        data: '',
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
