import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [photo, setPhoto] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", name);
      if (photo) {
        categoryData.append("photo", photo);
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        categoryData
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
        setPhoto("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot get categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-1">
          <AdminMenu />
        </div>
        <div className="col-span-4 ml-8 mr-8">
          <h1 className="text-3xl font-bold mb-4 text-center mb-10">Manage Categories</h1>
          <hr className="mb-10"/>
          <div>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              photo={photo}
              setPhoto={setPhoto}
            />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-slate-400">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        href="#"
                        className="font-medium text-blue-600 hover:underline mr-14"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(category.name);
                          setSelected(category);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        href="#"
                        className="font-medium text-blue-600 hover:underline ml-14"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
