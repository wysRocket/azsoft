export const SET_RAW = "SET_RAW";
export const GET_RAW = "GET_RAW";

const handlers = {
  [SET_RAW]: (state, { payload }) => ({
    ...state,
    cache: state.cache.find((p) => p.key === payload.key)
      ? [
          ...state.cache.map((u) => {
            if (u.key === payload.key) {
              return { ...u, value: payload.value };
            }
            return u;
          }),
        ]
      : [...state.cache, payload],
  }),
  [GET_RAW]: (state, { payload }) => ({
    ...state,
    formValues: payload,
  }),
  DEFAULT: (state) => state,
};

export const cacheReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
