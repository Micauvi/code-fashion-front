import React, { useEffect, useState } from "react";
import { getAllCategories } from "../utils/categories.utils";

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  const [allCategories, setAllCategories] = useState([]);

  const categoryHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    const categoriesSetter = async () => {
      setAllCategories(await getAllCategories());
    };
    categoriesSetter();
  }, []);
  return (
    <select
      name="categoryList"
      className="text-white w-32 text-center flex  bg-indigo-500 border-solid border-indigo-600 border-1 hover:text-white rounded-md text-sm my-1"
      onChange={categoryHandler}
    >
      <option value="all">Categorias</option> 
      {allCategories?.map((category, i) => {
        return (
          <option key={i} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
};

export default Categories;
