import React from "react";
import ReactDatePicker from "react-datepicker";
import { TextField } from "@material-ui/core";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "controls"
  });

  const handleOnSubmit = (data) => {
    const { controls } = data;
    const filteredArr = controls.map(({ value, type }) => {
      return {value, type};
    });

    console.log('filteredArr:', filteredArr);
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
        <button type="button" onClick={() => {append({ value: "", type: "input" })}}>
          Add text box
        </button>
        <button type="button" onClick={() => {append({ value: "", type: "react-datepicker" })}}>
          Add react-datepicker
        </button>
        <button type="submit">Submit</button>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              {item.type == "input" && <Controller
                name={`controls.${index}.value`}
                control={control}
                defaultValue={item.value}
                render={({ field }) => <input {...field} />}
              />}

              {item.type == "react-datepicker" && <Controller
                control={control}
                name={`controls.${index}.value`}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <ReactDatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                  />
                )}
              />}
              <button onClick={() => remove(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default App;