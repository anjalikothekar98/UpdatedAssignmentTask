import { actionTypes } from "./actionTypes";

const initialState = {
  users: [],
  user: {},
  loading: true,
};

const userReducers = (state = initialState, { type, payload }) => {
  console.log("typeReducer", type);
  switch (type) {
    case actionTypes.GET_USERS:
      return { ...state, users: payload };

    case actionTypes.DELETE_USERS:
    case actionTypes.ADD_USER:
      return { ...state };

    case actionTypes.GET_USERS:
      return { ...state, user: payload };

    default:
      return state;
  }
};

export default userReducers;
