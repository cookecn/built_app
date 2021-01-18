import { types } from "../types/fileTypes";

export const actions = {
  newFile(file) {
    return {
      type: types.NEW_FILE,
      payload: { file }
    };
  },
  deleteFiles(ids) {
    return {
      type: types.DELETE_FILE,
      payload: { ids }
    };
  },
  addValue() {
    return {
      type: types.ADD_VALUE
    };
  },
  randomValue() {
    return {
      type: types.RANDOMIZE_VALUE
    };
  },
  calculateInterest() {
      return {
          type: types.CALCULATE_INTEREST
      };
  },
  calculateCollateral() {
    return {
        type: types.CALCULATE_COLLATERAL
    };
}
};