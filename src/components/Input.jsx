import React, { useState, useEffect, useContext } from "react";
import { CacheContext } from "./../context/cacheContext";
import Button from "react-bootstrap/Button";

export const CacheForm = () => {
  const { set, formValues, resetInputs } = useContext(CacheContext);
  const [keyInput, setKeyInput] = useState(formValues.key);
  const [valueInput, setValueInput] = useState(formValues.value);

  useEffect(() => {
    setKeyInput(formValues.key);
    setValueInput(formValues.value);
  }, [formValues]);

  const submitHandler = (event) => {
    event.preventDefault();
    set({ key: keyInput, value: valueInput });
    resetInputs();
    event.target.reset();
  };
  //  console.log(formValues);
  return (
    <form onSubmit={submitHandler}>
      <div className="form-row form-group">
        <div className="col-md-3">
          <input
            type="key"
            className="form-control"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="value"
            className="form-control"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
        </div>
        {keyInput && valueInput ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : null}
      </div>
    </form>
  );
};
