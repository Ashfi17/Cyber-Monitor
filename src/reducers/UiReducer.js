const initialState = {
  head: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "HEAD":
      return { ...state };
    default:
      return { ...state };
  }
};
