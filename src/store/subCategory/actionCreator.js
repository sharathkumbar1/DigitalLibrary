import { SET_SUB_CATEGORY_ID } from "./actionType";
import { SET_SUB_CATEGORY_NAME } from "./actionType";

export function setSubCategoryId(subCategoryId) {
  return {
    type: SET_SUB_CATEGORY_ID,
    payload: { subCategoryId },
  };
}

export function setSubCategoryName(subCategoryName) {
  return {
    type: SET_SUB_CATEGORY_NAME,
    payload: { subCategoryName },
  };
}
