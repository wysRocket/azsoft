export const ADD_RAW = "ADD_RAW";
export const GET_RAW = "GET_RAW";
export const UPD_EXISTING_RAW = "UPD_EXISTING_RAW";
export const UPD_OLDEST_RAW = "UPD_OLDEST_RAW";
export const RESET_INPUTS = "RESET_INPUTS";

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
    cache: [...state.cache.filter((i) => i.key !== payload.key), payload],
  }),
  [RESET_INPUTS]: (state) => ({
    ...state,
    formValues: {
      ...state.formValues,
      key: "",
      value: "",
    },
  }),
  DEFAULT: (state) => state,
};

export const cacheReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
