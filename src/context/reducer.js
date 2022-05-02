import {
  ADD_FISH,
  ADD_FROM_LOCALSTORAGE,
  ADD_TO_ORDER,
  LOAD_FISHES,
  LOGIN_AND_LOGOUT,
  REMOVE_FISH,
  REMOVE_FROM_ORDER,
} from './action.types'

export default (state, action) => {
  switch (action.type) {
    case LOAD_FISHES:
      return { ...state, fishes: { ...state.fishes, ...action.payload } }
    case ADD_FISH:
      return { ...state, fishes: { ...state.fishes, ...action.payload } }
    case ADD_TO_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload]: state.order[action.payload] + 1 || 1,
        },
      }
    case ADD_FROM_LOCALSTORAGE:
      return { ...state, order: action.payload }
    case REMOVE_FISH:
      return { ...state, fishes: action.payload }
    case REMOVE_FROM_ORDER:
      return { ...state, order: action.payload }
    case LOGIN_AND_LOGOUT:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
