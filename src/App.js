import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "controls"
  });

  const [firstLoad, setFirstLoad] = useState(false);
  const [myFields, setMyFields] = useState([]);

  const formatDate = (date) => {
    var dateobj = new Date(date);
    var formatted = new Intl.DateTimeFormat("en-US", { dateStyle: 'full', timeStyle: 'long' }).format(dateobj);
    return formatted;
  }

  useEffect(() => {
    let fieldsFromStorage = localStorage.getItem('filteredArr');
    if (fieldsFromStorage && fieldsFromStorage.length > 0) {
      fieldsFromStorage = JSON.parse(fieldsFromStorage);
      if (fieldsFromStorage[0].value !== "") {
        const date = Date.parse(fieldsFromStorage[0].value);

        //var dateobj = new Date(fieldsFromStorage[0].value);
        //var formatted = new Intl.DateTimeFormat("en-US", { dateStyle: 'full', timeStyle: 'long' }).format(dateobj);
        console.log('formatted:', formatDate(fieldsFromStorage[0].value))
      }

      const formattedFieldsFromStorage = fieldsFromStorage.map(p =>
        p.value !== "" && p.type == "react-datepicker"
          ? { ...p, value: formatDate(p.value) }
          : p
      );

      console.log('formattedFieldsFromStorage:', formattedFieldsFromStorage)

      setMyFields(formattedFieldsFromStorage);
    }
    console.log('fieldsFromStorage:', fieldsFromStorage);
    //setMyFields([]);
    setFirstLoad(false);
  }, [firstLoad]);

  const handleOnSubmit = (data) => {
    console.log('submitted data:', data)
    const { controls } = data;
    const filteredArr = controls.map(({ value, type }, index) => {
      return {id:index, value, type};
    });

    console.log('filteredArr:', filteredArr);
    localStorage.setItem('filteredArr', JSON.stringify(filteredArr));
  };

  console.log('fields:', fields)

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
        <button type="button" onClick={() => {
          append({ value: "", type: "input" })
        }}>
          Add text box
        </button>
        <button type="button" onClick={() => {
          append({ value: "", type: "react-datepicker" })
        }}>
          Add react-datepicker
        </button>
          
        {myFields.map((item, index) => (
          <div key={item.id}>
            {item.type === "input" && <Controller
              name={`controls.${index}.value`}
              control={control}
              defaultValue={item.value}
              render={({ field }) => <input {...field} />}
            />}

            {item.type === "react-datepicker" && <Controller
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
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;