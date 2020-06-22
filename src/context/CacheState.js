import React, { useReducer } from "react";
import { CacheContext } from "./cacheContext";
import { cacheReducer } from "./cacheReducer";
import { SET_RAW, GET_RAW } from "./cacheReducer";

export const CacheState = ({ children }) => {
  const initialState = {
    cache: [
      { key: "1", value: "Mark" },
      { key: "2", value: "Teddy" },
    ],
    formValues: {
      key: "",
      value: "",
    },
  };
  const [state, dispatch] = useReducer(cacheReducer, initialState);

  const set = (data) => {
    const payload = { ...data, touchedAt: Date.now() };
    dispatch({
      type: SET_RAW,
      payload,
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
