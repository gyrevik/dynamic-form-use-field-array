import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const App = () => {
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "books"
  });

  const handleOnSubmit = (data) => {
    const { books } = data;
    const filteredArr = books.map(({ value, type }) => {
      return {value, type};
    });

    console.log('filteredArr:', filteredArr);
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
        <button type="button" onClick={() => {append({ value: "", type: "input" })}}>
          Add new book
        </button>
        <button type="submit">Buy</button>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              {item.type == "input" && <Controller
                name={`books.${index}.value`}
                control={control}
                defaultValue={item.value}
                render={({ field }) => <input {...field} />}
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