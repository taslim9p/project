import React, { useState } from "react";

function CategoryForm({ handleSubmit, value, setValue,photo, setPhoto }) {
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category_name"
            id="category_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label
            htmlFor="category_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-900 peer-focus:dark:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Category Name
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center justify-center border border-gray-300 rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default CategoryForm;
