import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from '../../context/Search';

function SearchInput() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API}/api/v1/product/search/${values.keyword}`
          );
          setValues({ ...values, results: data });
          navigate("/search");
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                className="rounded-xl w-full text-center text-black"
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                placeholder="Search products..."
            />
            <button type="submit" className="ml-2 text-white">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-md"
                />
            </button>
        </form>
    );
}

export default SearchInput;
