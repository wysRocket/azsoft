import React, { useReducer } from "react";
import { CacheContext } from "./cacheContext";
import { cacheReducer } from "./cacheReducer";
import {
  ADD_RAW,
  GET_RAW,
  UPD_EXISTING_RAW,
  UPD_OLDEST_RAW,
  RESET_INPUTS,
} from "./cacheReducer";

export const CacheState = ({ children }) => {
  const initialState = {
    cache: [{ key: "1", value: "Mark", touchedAt: 1592908561560 }],
    formValues: {
      key: "",
      value: "",
    },
  };
  const [state, dispatch] = useReducer(cacheReducer, initialState);

  const set = (data) => {
    const payload = { ...data, touchedAt: Date.now() };
    state.cache.find((p) => p.key === data.key)
      ? dispatch({
          type: UPD_EXISTING_RAW,
          payload,
        })
      : state.cache.length === 2
      ? dispatch({
          type: UPD_OLDEST_RAW,
          payload,
        })
      : dispatch({
          type: ADD_RAW,
          payload,
        });
  };

  const get = (key, value) => {
    const payload = { key, value, touchedAt: Date.now() };
    dispatch({ type: GET_RAW, payload });
  };
  const resetInputs = () => {
    dispatch({ type: RESET_INPUTS });
  };

  return (
    <CacheContext.Provider
      value={{
        set,
        get,
        resetInputs,
        cache: state.cache,
        formValues: state.formValues,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};
