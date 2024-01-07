import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct} from '../../Reducer/ProductSlice';
import ViewProducts from "../Model/ViewProducts";
import SearchProduct from "../Search/SearchProduct";
import { nanoid } from "@reduxjs/toolkit";
import Model from "../Model/DeleteModel";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";

const List = () => {

  const [deleteModalOpen, setdeleteModelOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [newProduct, setNewProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const searchTerm = useSelector((state) => state.product.searchTerm);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const IndexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = IndexOfLastPage - postPerPage;
  const Currentproducts = newProduct.slice(indexOfFirstPage, IndexOfLastPage);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.name.includes(searchTerm)
      );
      setNewProduct(filteredProducts);
    } else {
      setNewProduct(products);
    }
  }, [searchTerm, products]);

  const handleDelete = (id) => {
    setDeleteIndex(id)
    setdeleteModelOpen(true);
  };

  const handleConfirmDelete = (id) => {
    setDeleteIndex(id)
    dispatch(deleteProduct({ id: deleteIndex }));
    toast.error("product deleted sucessfully");
    setDeleteIndex(null);
    setdeleteModelOpen(false);

  }
  const handleConfirmCancel = () => {
    setDeleteIndex(null);
    setdeleteModelOpen(false);
  }

  const handleEdit = (productId) => {
    const productToEdit = newProduct.find((product) => product.id === productId);

    if (productToEdit) {
      navigate(`/addproduct/${productId}`, { state: { productToEdit } });
    } else {
      toast.error("Product not found");
    }
  };

  const handleOpenView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseView = () => {
    setSelectedProduct(null);
  };
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-around pb-6">
        <div>
			<h2 class="text-gray-600 font-semibold">Product List</h2>
			<span class="text-xs">All products item</span>
		</div>
        <div className="flex items-center justify-around">
          <SearchProduct/>

          <div className="lg:ml-40 ml-10 space-x-8">
            <Link to='/addproduct'>
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                Add Product
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subcategory
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Currentproducts.map((product) => {
                 return <tr key={nanoid()}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12">
                          {product.selectedImages[0] &&
                            typeof product.selectedImages[0] === "string" && (  
                              <img
                                className='w-full h-full rounded'
                                src={product.selectedImages[0]}
                                alt="Product Images"
                              />
                            )}
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{product.category}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {product.subcategory}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden=""
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        />
                        <span className="relative"> {product.status === "active" ? "Active" : "Inactive"}</span>

                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {/* =-----Delete BTN ----- */}
                      <span className="relative inline-block px-3 mx-2 py-1 font-semibold text- -900 leading-tight">
                        <span
                          aria-hidden=""
                          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        />
                        <span className="relative">
                          <button
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                        </span>
                      </span>
                      {/* --------Edit-------  */}
                      <span className="relative inline-block px-3 mx-2 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden=""
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        />
                        <span className="relative">
                        <button
                            onClick={() => handleEdit(product.id)}
                          >
                            Edit
                          </button>
                        </span>
                      </span>
                      {/* ------View------- */}
                      <span className="relative inline-block px-3 mx-2 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden=""
                          className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                        />
                        <span className="relative">
                         
                        <button
                            onClick={() => handleOpenView(product)}
                          >
                            View
                          </button>
                        </span>
                      </span>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
        </div>
        
      </div>
      <div
						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                        <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={newProduct.length}
              postPerPage={postPerPage}
            />
					</div>
     
      {selectedProduct && (
        <ViewProducts
          show={true}
          close={handleCloseView}
          product={selectedProduct}
        />
      )}
      {deleteModalOpen && (
        <Model
          isOpen={deleteModalOpen}
          onClose={handleConfirmCancel}
          onConfirm={handleConfirmDelete}
          title='Delete Task'
          message='Are you sure you want to delete this task?'
        />
      )}

    </div>
  )
}

export default List;