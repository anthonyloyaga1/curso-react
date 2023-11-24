import { useState } from 'react';

import { AddCategory, GifGrid } from './components';

export default function GifExpertApp() {
  const [categories, setCategories] = useState<string[]>(['One Punch Man']);

  const onAddCategory = (newCategory: string) => {
    const existCategory = categories.find((category) => category == newCategory);
    if (existCategory) return;
    setCategories([newCategory, ...categories]);
  };

  return (
    <>
      <h1>GifExpertApp</h1>

      <AddCategory onAddCategory={onAddCategory} />

      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}

      {/* Gif Item */}
    </>
  );
}
