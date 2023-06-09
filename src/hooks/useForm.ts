import { useState, ChangeEvent, SyntheticEvent } from "react";

type useFormReturnType<T> = { form: T; onInputChange: (e: ChangeEvent<HTMLInputElement> | SyntheticEvent) => void; onChange: <K extends Object>(value: K, key: keyof T) => void; updateForm: (form: T) => void };

const useForm = <T extends object>(initialValues: T): useFormReturnType<T> => {
  const [formState, setFormState] = useState<T>(initialValues);

  const onInputChange = (e: ChangeEvent<HTMLInputElement> | SyntheticEvent) => {
    if ("target" in e) {
      const target = e.target as HTMLInputElement;
      const { name, value } = target;
      const updatedFormState = {
        ...formState,
        [name]: value,
      };
      setFormState(updatedFormState);
    }
  };

  const updateForm = (form: T) => {
    const updatedFormState = {
      ...formState,
      ...form,
    };
    // console.log(updatedFormState);
    setFormState(updatedFormState);
  };

  const onChange = <K extends Object>(value: K, key: keyof T) => {
    const updatedFormState = {
      ...formState,
      [key]: value,
    };
    setFormState(updatedFormState);
  };

  return { form: formState, onInputChange, onChange, updateForm };
};

export default useForm;
