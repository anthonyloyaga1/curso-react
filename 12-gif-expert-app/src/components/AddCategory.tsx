import { ChangeEvent, FormEvent, useState } from 'react';

interface AddCategoryProps {
  onAddCategory: (newCategory: string) => void;
}

export const AddCategory = ({ onAddCategory }: AddCategoryProps) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim().length <= 1) return;

    onAddCategory(inputValue);
    setInputValue('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Buscar gifs" value={inputValue} onChange={onInputChange}></input>
    </form>
  );
};
