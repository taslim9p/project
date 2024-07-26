import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);  
      toast.error("Something went wrong in getting categories");
    }
  };


  useEffect(() => {
    getAllCategories();
  }, []);
 
   //create product function
   const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <AdminMenu />
        </div>
        <div className="col-span-4 ml-5 mr-5">
          <h1 className="text-4xl font-light text-center mt-5 mb-8">Create Product</h1>
          <div className="mb-4">
            <Select
              variant={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              value={description}
              placeholder="Write a description"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              value={price}
              placeholder="Write a price"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              value={quantity}
              placeholder="Write a quantity"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {/* <div className="mb-4">
            <Select
              variant={false}
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div> */}
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
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCreate}
            >
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
