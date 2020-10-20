export default (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'login':
      return {
        ...state,
        ...payload,
      };
    case 'global':
      return {
        ...state,
        ...payload,
      };
    case 'oss':
      return {
        ...state,
        ...payload,
      };
    case 'qiniu':
      return {
        ...state,
        ...payload,
      };
    case 'course':
      return {
        ...state,
        course: {
          ...state.course,
          ...payload,
        },
      };
    default:
      return state;
  }
};
