export const initReducer = {
  error: false,
  done: false,
  loading: false,
}

export function reducer(
  state: { error: boolean; done: boolean },
  action: { type: string }
) {
  switch (action.type) {
    case 'onSuccess': {
      return { ...state, done: true, loading: false }
    }
    case 'onReset': {
      return { ...state, done: false, loading: false }
    }
    case 'onError': {
      return { ...state, error: true, loading: false }
    }
  }
  throw Error('Unknown action: ' + action.type)
}
