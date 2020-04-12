const INITIAL_STATE = {
  reports: {
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SUBMIT_REPORT_OFFLINE":
      const current_date = new Date();
      const current_time = current_date.getTime();
      state.reports[current_time] = action.payload;
      return { ...state };
    case "REMOVE_REPORT_FROM_OFFLINE":
      const key = action.payload;
      delete state.reports[key]
      return { ...state };
    default:
      return state;
  }
};
