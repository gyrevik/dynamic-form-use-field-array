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
    const filteredArr = books.map(({ value }) => {
      return value;
    });

    console.log(filteredArr);
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <Controller
                name={`books.${index}.value`}
                control={control}
                defaultValue={item.value}
                render={({ field }) => <input {...field} />}
              />
              <button onClick={() => remove(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => append({ value: "" })}>
          Add new book
        </button>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

export default App;