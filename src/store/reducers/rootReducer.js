const initialState = {
  users: [],
  createUserSuccess: false,
  updateUserSuccess: false,
  deleteUserSuccess: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.data, updateUserSuccess: false, deleteUserSuccess: false};
    case "CREATE_USER":
      return { ...state, createUserSuccess: true };
    case "UPDATE_USER":
      return { ...state, users: action.data, updateUserSuccess: true };
    case "DELETE_USER":
      return { ...state, users: action.data, deleteUserSuccess: true };
    default:
      return state;
  }
};

export default rootReducer;
