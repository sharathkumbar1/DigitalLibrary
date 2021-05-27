
import * as types from './actionType'

export const initialState= {searchValue:'', searchList:[]}

export default function searchReducer(state=initialState, action){
    switch(action.type){
        case types.SAVE_SEARCH_BOOK_VALUE:{
            return Object.assign({}, state,{searchValue:action.payload.searchValue})
        }
        case types.SAVE_SEARCH_BOOK_LIST:{
            return Object.assign({}, state,{searchList: action.payload.searchList} )
        }
        case types.CLEAR_SEARCH_VALUE:{
            return Object.assign({}, state, {...state,searchValue:''})
        }
        case types.CLEAR_SEARCH_LIST:{
            return Object.assign({}, state, {...state,searchList:[]})
        }
        default: return state
        
    }
}



