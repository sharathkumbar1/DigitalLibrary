import { SET_SUB_CATEGORY_ID, SET_SUB_CATEGORY_NAME } from "./actionType";

const initialState = {
  subCategoryId: "",
  subCategoryName: "",
};

export default function subCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUB_CATEGORY_ID: {
      return { ...state, subCategoryId: action.payload.subCategoryId };
    }
    case SET_SUB_CATEGORY_NAME: {
      return { ...state, subCategoryName: action.payload.subCategoryName };
    }
    default:
      return state;
  }
}
