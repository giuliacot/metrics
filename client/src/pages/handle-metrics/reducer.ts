export const initReducer = {
  error: false,
  done: false,
}

export function reducer(
  state: { error: boolean; done: boolean },
  action: { type: string }
) {
  console.log(action)
  switch (action.type) {
    case 'onSuccess': {
      return { ...state, done: true }
    }
    case 'onError': {
      return { ...state, error: true }
    }
    case 'onReset': {
      return { ...state, done: false, error: false }
    }
  }
  throw Error('Unknown action: ' + action.type)
}
