import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { CacheContext } from "./../context/cacheContext";

export const CacheForm = () => {
  const { set, formValues, resetInputs } = useContext(CacheContext);
  const { register, handleSubmit, triggerValidation } = useForm();
  const [triggers, setTriggers] = useState([]);
  const onSubmit = (data, e) => {
    set(data);
    e.target.reset();
    resetInputs();
  };
  console.log("formValues:", formValues);
  console.log("triggers:", triggers);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Key :</label>
      <input
        name="key"
        ref={register({ required: true })}
        defaultValue={formValues.key}
        onChange={async () => {
          const keyTrigger = await triggerValidation("key");
          setTriggers([...triggers, keyTrigger]);
        }}
      />

      <label> Value :</label>
      <input
        name="value"
        ref={register({ required: true })}
        defaultValue={formValues.value}
        onChange={async () => {
          const valueTrigger = await triggerValidation("value");
          setTriggers([...triggers, valueTrigger]);
        }}
      />
      {triggers.find((t) => t === undefined) ? null : <input type="submit" />}
    </form>
  );
};
