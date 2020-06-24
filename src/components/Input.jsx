import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CacheContext } from "./../context/cacheContext";

export const CacheForm = () => {
  const { set, formValues, resetInputs } = useContext(CacheContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    set(data);
    e.target.reset();
    resetInputs();
  };
  console.log(formValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Key :</label>
      <input
        name="key"
        ref={register({ required: true })}
        defaultValue={formValues.key}
      />

      <label> Value :</label>
      <input
        name="value"
        ref={register({ required: true })}
        defaultValue={formValues.value}
      />
      <input type="submit" />
    </form>
  );
};
