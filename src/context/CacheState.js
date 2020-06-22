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
    dispatch({
      type: SET_RAW,
      payload: data,
    });
  };

  const get = (key, value) =>
    dispatch({ type: GET_RAW, payload: { key, value } });

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
