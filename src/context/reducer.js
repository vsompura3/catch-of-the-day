import {
  ADD_FISH,
  ADD_TO_ORDER,
  LOAD_FISHES,
  REMOVE_FROM_ORDER,
} from './action.types'

export default (state, action) => {
  switch (action.type) {
    case LOAD_FISHES:
      return { ...state, fishes: action.payload }
    case ADD_FISH:
      return { ...state, fishes: { ...state.fishes, action.payload } }
    case ADD_TO_ORDER:
      return { ...state } // Todo 
    default:
      return state
  }
}
