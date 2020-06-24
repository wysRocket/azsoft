export const ADD_RAW = "ADD_RAW";
export const GET_RAW = "GET_RAW";
export const UPD_EXISTING_RAW = "UPD_EXISTING_RAW";
export const UPD_OLDEST_RAW = "UPD_OLDEST_RAW";

const handlers = {
  [ADD_RAW]: (state, { payload }) => ({
    ...state,
    cache: [...state.cache, payload],
  }),
  [UPD_EXISTING_RAW]: (state, { payload }) => ({
    ...state,
    cache: [...state.cache.filter((i) => i.key !== payload.key), payload],
  }),
  [UPD_OLDEST_RAW]: (state, { payload }) => ({
    ...state,
    cache: [
      ...state.cache.filter(
        (i) =>
          i.key !==
          state.cache.reduce((max, x) => {
            return x.touchedAt < max.touchedAt ? x : max;
          }).key
      ),
      payload,
    ],
  }),
  [GET_RAW]: (state, { payload }) => ({
    ...state,
    formValues: payload,
    ...state.cache.map((u) => {
      if (u.key === payload.key) {
        return {
          ...u,
          touchedAt: payload.touchedAt,
        };
      }
      return u;
    }),
  }),
  DEFAULT: (state) => state,
};

export const cacheReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
