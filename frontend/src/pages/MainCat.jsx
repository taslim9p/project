import React, { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import axios from "axios";
import Category from "./Category";
import useCategory from "../hooks/useCategory";


function MainCat() {
  const categories = useCategory();
  const [photo, setPhoto] = useState("");
  // //get all categories
  // const getAllCategory = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API}/api/v1/category/get-category`
  //     );
  //     if (data?.success) {
  //       setCategories(data?.category);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     toast.error("something went wrong while getting categories");
  //   }
  // };

  // useEffect(() => {
  //   getAllCategory();
  // }, []);

  return (
    <div className="flex justify-evenly">
      {categories.map((c) => {
        return (
          <a href="" key={c._id}>
            <Category
              url={`${
                import.meta.env.VITE_API
              }/api/v1/category/category-photo/${c._id}`}
              name={c.name}
              slug={c.slug}
            />
          {/* <Category/> */}
          </a>
        );
      })}
    </div>
  );
}

export default MainCat;
