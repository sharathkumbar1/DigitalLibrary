import * as types from './actionType'

export function saveSearchValue(searchValue) {
    return {
      type: types.SAVE_SEARCH_BOOK_VALUE,
      payload: { searchValue },
    }
  }

export function saveSearchList(searchList) {
    return{
        type: types.SAVE_SEARCH_BOOK_LIST,
        payload: {searchList},
    }
}

export function clearSearchValue(){
    return{
        type: types.CLEAR_SEARCH_VALUE,
    }
}

export function clearSearchList(){
    return{
        type: types.CLEAR_SEARCH_LIST,
    }
}