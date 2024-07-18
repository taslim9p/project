import React from 'react';

function Category({ url, name,slug }) {
  return (
    <a href={`/category/${slug}`}>
    <div className="flex flex-col items-center mt-5">
      <div className="h-28 w-28 rounded-full border-t-2 border-y-2 border-black overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <img src={url} alt={name} className="h-20 mt-4 w-full object-contain" />
      </div>
      <h1 className="text-center mt-2 text-md">{name}</h1>
    </div>
    </a>
    
  );
}

export default Category;
