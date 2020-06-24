import React, { useReducer } from "react";
import { CacheContext } from "./cacheContext";
import { cacheReducer } from "./cacheReducer";
import { ADD_RAW, GET_RAW, UPD_RAW } from "./cacheReducer";

export const CacheState = ({ children }) => {
  const initialState = {
    cache: [
      { key: "1", value: "Mark", touchedAt: 1592908561560 },
      { key: "2", value: "Teddy", touchedAt: 1592908561561 },
    ],
    formValues: {
      key: "",
      value: "",
    },
  };
  const [state, dispatch] = useReducer(cacheReducer, initialState);

  const set = (data) => {
    let oldestItemKey = state.cache.reduce((max, x) => {
      return x.touchedAt < max.touchedAt ? x : max;
    }).key;

    let duplicateItemKey = state.cache.find((p) => p.key === data.key).key;

    console.log("Oldest Key #:", oldestItemKey);
    console.log("Duplicate Key #:", duplicateItemKey);

    state.cache.find((p) => p.key === data.key)
      ? dispatch({
          type: UPD_RAW,
          payload: {
            ...data,
            touchedAt: Date.now(),
            keyForDEL: duplicateItemKey,
          },
        })
      : state.cache.length === 2
      ? dispatch({
          type: UPD_RAW,
          payload: { ...data, touchedAt: Date.now(), keyForDEL: oldestItemKey },
        })
      : dispatch({
          type: ADD_RAW,
          payload: { ...data, touchedAt: Date.now() },
        });
  };

  const get = (key, value) => {
    const payload = { key, value, touchedAt: Date.now() };
    dispatch({ type: GET_RAW, payload });
  };

  return (
    <CacheContext.Provider
      value={{
        set,
        get,
        cache: state.cache,
        formValues: state.formValues,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};
