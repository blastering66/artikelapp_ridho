const initialState = {
  artikel: []
}
export default function dataArtikel(state = initialState, action) {
  switch (action.type) {
    case 'ARTIKEL_SAVE':
      return {
        ...state,
        artikel: action.results
      }
    default:
      return state
  }
}
