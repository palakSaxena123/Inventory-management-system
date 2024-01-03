import { useRef, useState, useEffect, useContext } from "react";
import { addProduct, editProduct } from "../../Reducer/ProductSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import { ProductSchema } from "../../Validation/ValidationSchema";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../../Components/SideBar/SideBar";
import { LogInContext } from "../../Context/LogInContext";

const AddProduct = () => {
  const { setUser, user } = useContext(LogInContext);
  const location = useLocation();
  const { state } = location;
  const productToEdit = state ? state.productToEdit : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      model: "",
      modelNumber: "",
      sku: "",
      description: "",
      image: [],
      category: "",
      subcategory: "",
      status: "",
      price: "",
      weight: "",
      dimensions: "",
      manufacturer: "",
      quantity: "",
      selectedImages: [],
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      handleFormSubmission(values);
    },
  });

  useEffect(() => {
    // Populate form fields with existing product data when available
    if (productToEdit) {
      formik.setValues({
        name: productToEdit.name || "",
        brand: productToEdit.brand || "",
        model: productToEdit.model || "",
        modelNumber: productToEdit.modelNumber || "",
        sku: productToEdit.sku || "",
        description: productToEdit.description || "",
        image: productToEdit.image || "",
        category: productToEdit.category || "",
        subcategory: productToEdit.subcategory || "",
        status: productToEdit.status || "",
        price: productToEdit.price || "",
        weight: productToEdit.weight || "",
        dimensions: productToEdit.dimensions || "",
        manufacturer: productToEdit.manufacturer || "",
        quantity: productToEdit.quantity || "",
        selectedImages: productToEdit.selectedImages || [],
      });
    }
  }, [productToEdit, formik.setValues]);

  const handleFormSubmission = (values) => {
    // Check if productToEdit exists
    if (productToEdit) {
      // If productToEdit exists, dispatch editProduct action
      dispatch(editProduct({ id: productToEdit.id, ...values }));
      toast.success("product updated successfully");
    } else {
      // If productToEdit doesn't exist, generate a new id and dispatch addProduct action
      console.log(values);
      const id = nanoid();
      const numericWeight = parseFloat(values.weight);
      const numericQuantity = parseInt(values.quantity, 10) || 0;
      dispatch(addProduct({ ...values, weight: numericWeight, inventory : numericQuantity ,id }));
      toast.success("Product added sucessfully");
    }

    navigate("/productList");
  };

  const handleLabelClick = () => {
    fileInputRef.current?.click();
    formik.setFieldTouched("selectedImages");
  };

  const handleImageChange = (event, formik) => {
    const files = event.target.files;

    if (files) {
      const imagesArray = Array.from(files).slice(0, 4);

      // Convert images to Base64 strings
      const imagePromises = imagesArray.map((image) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
          };
          reader.readAsDataURL(image);
        });
      });

      // Set selectedImages field value as an array of Base64 strings
      Promise.all(imagePromises).then((base64Images) => {
        formik.setFieldValue("selectedImages", base64Images);
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <SideBar />
        <div className="p-4 xl:ml-80 ">
          <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
              <div className="capitalize">
                <nav aria-label="breadcrumb" className="w-max">
                  <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                    <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                      <a>
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                          dashboard
                        </p>
                      </a>
                      <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                        /
                      </span>
                    </li>
                    <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        Add Product
                      </p>
                    </li>
                  </ol>
                </nav>
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
                  Product Information
                </h6>
              </div>
              <div className="flex items-center">
                <button
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      strokeWidth={3}
                      className="h-6 w-6 text-blue-gray-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                <a >
                  <button
                    className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
                    type="button"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQey3S6VQ4qIppedXehx8CQYDshaMBwU1UwpQ&usqp=CAU"
                      style={{
                        borderRadius: "50px",
                        width: "40px",
                      }}
                      alt=""
                    />
                    {user.email}
                  </button>
                </a>
                {/* ----------Setting Button ---------------- */}
                <button
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 text-blue-gray-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {/* --------------Notifcation BTN ------------ */}
                <button
                  aria-expanded="false"
                  aria-haspopup="menu"
                  id=":r2:"
                  className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 text-blue-gray-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </nav>

          {/* ---------- Form Start ------------- */}
          <div className="FORM">
            <form onSubmit={formik.handleSubmit}>
              <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    {/* =====> Product name */}
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product name
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          autocomplete="given-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.name && formik.errors.name && (
                        <div style={errorStyle}>{formik.errors.name}</div>
                      )}
                    </div>
                    {/* =====> Product Brand */}
                    <div class="sm:col-span-3">
                      <label
                        for="brand"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product brand
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="brand"
                          id="brand"
                          onChange={formik.handleChange}
                          value={formik.values.brand}
                          autocomplete="family-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.brand && formik.errors.brand && (
                        <div style={errorStyle}>{formik.errors.brand}</div>
                      )}
                    </div>
                    {/* =====> Product Model */}
                    <div class="sm:col-span-3">
                      <label
                        for=" model"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Model
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="model"
                          id="model"
                          onChange={formik.handleChange}
                          value={formik.values.model}
                          autocomplete="given-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.model && formik.errors.model && (
                        <div style={errorStyle}>{formik.errors.model}</div>
                      )}
                    </div>
                    {/* =====> Product Model Number */}
                    <div class="sm:col-span-3">
                      <label
                        for="modelNumber"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Model Number
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="modelNumber"
                          id="modelNumber"
                          onChange={formik.handleChange}
                          value={formik.values.modelNumber}
                          autocomplete="family-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.modelNumber &&
                        formik.errors.modelNumber && (
                          <div style={errorStyle}>
                            {formik.errors.modelNumber}
                          </div>
                        )}
                    </div>
                    {/* =====> SKU */}
                    <div class="sm:col-span-2 sm:col-start-1">
                      <label
                        for="sku"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        SKU
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="sku"
                          id="sku"
                          onChange={formik.handleChange}
                          value={formik.values.sku}
                          autocomplete="address-level2"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.sku && formik.errors.sku && (
                        <div style={errorStyle}>{formik.errors.sku}</div>
                      )}
                    </div>
                    {/* =====> Price */}
                    <div class="sm:col-span-2">
                      <label
                        for="price"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          onChange={formik.handleChange}
                          value={formik.values.price}
                          autocomplete="address-level1"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.price && formik.errors.price && (
                        <div style={errorStyle}>{formik.errors.price}</div>
                      )}
                    </div>
                    {/* =====> Weight */}
                    <div class="sm:col-span-2">
                      <label
                        for="weight"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Item Weight
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="weight"
                          id="weight"
                          onChange={formik.handleChange}
                          value={formik.values.weight}
                          autocomplete="weight"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.weight && formik.errors.weight && (
                        <div style={errorStyle}>{formik.errors.weight}</div>
                      )}
                    </div>
                    {/* =====> Quantity */}
                    <div class="sm:col-span-2">
                      <label
                        for="quantity"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Item Quantity
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="quantity"
                          id="quantity"
                          onChange={formik.handleChange}
                          value={formik.values.quantity}
                          autocomplete="quantity"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.quantity && formik.errors.quantity && (
                        <div style={errorStyle}>{formik.errors.quantity}</div>
                      )}
                    </div>
                    {/* ====> Dimensions */}
                    <div class="sm:col-span-4">
                      <label
                        for="dimensions"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Dimensions
                      </label>
                      <div class="mt-2">
                        <input
                          id="dimensions"
                          name="dimensions"
                          type="dimensions"
                          onChange={formik.handleChange}
                          value={formik.values.dimensions}
                          autocomplete="dimensions"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.dimensions &&
                        formik.errors.dimensions && (
                          <div style={errorStyle}>
                            {formik.errors.dimensions}
                          </div>
                        )}
                    </div>
                    {/* ====> Manufacturer */}
                    <div class="sm:col-span-4">
                      <label
                        for="manufacturer"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Manufacturer
                      </label>
                      <div class="mt-2">
                        <input
                          id="manufacturer"
                          name="manufacturer"
                          type="manufacturer"
                          onChange={formik.handleChange}
                          value={formik.values.manufacturer}
                          autocomplete="dimensions"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.manufacturer &&
                        formik.errors.manufacturer && (
                          <div style={errorStyle}>
                            {formik.errors.manufacturer}
                          </div>
                        )}
                    </div>
                    {/* Category */}
                    <div class="sm:col-span-3">
                      <label
                        for="category"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div class="mt-2">
                        <select
                          id="category"
                          name="category"
                          onChange={formik.handleChange}
                          value={formik.values.category}
                          autocomplete="category-name"
                          class="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="">Select Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                        </select>
                      </div>
                      {formik.touched.category && formik.errors.category && (
                        <div style={errorStyle}>{formik.errors.category}</div>
                      )}
                    </div>
                    {/* Subcategory */}
                    <div class="sm:col-span-3">
                      <label
                        for="subcategory"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Subcategory
                      </label>
                      <div class="mt-2">
                        <select
                          id="subcategory"
                          name="subcategory"
                          onChange={formik.handleChange}
                          value={formik.values.subcategory}
                          autocomplete="subcategory-name"
                          class="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Select subcategory</option>
                          {formik.values.category === "electronics" && (
                            <>
                              <option value="smartphones">Smartphones</option>
                              <option value="laptops">Laptops</option>
                              <option value="watches">watches</option>
                            </>
                          )}
                          {formik.values.category === "clothing" && (
                            <>
                              <option value="shirts">Shirts</option>
                              <option value="pants">Pants</option>
                              <option value="Jeans">Jeans</option>
                              <option value="tops">Tops</option>
                            </>
                          )}
                        </select>
                      </div>
                      {formik.touched.subcategory &&
                        formik.errors.subcategory && (
                          <div style={errorStyle}>
                            {formik.errors.subcategory}
                          </div>
                        )}
                    </div>
                    {/* Status */}
                    <div class="sm:col-span-3">
                      <label
                        for="status"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Status
                      </label>
                      <div class="mt-2">
                        <select
                          id="status"
                          name="status"
                          onChange={formik.handleChange}
                          value={formik.values.status}
                          autocomplete="status"
                          class="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      {formik.touched.status && formik.errors.status && (
                        <div style={errorStyle}>{formik.errors.status}</div>
                      )}
                    </div>
                    {/* ====> Image */}
                    <div class="sm:col-span-4">
                      <label
                        for="selectedImages"
                        onClick={handleLabelClick}
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Images
                      </label>
                      <div class="mt-2">
                        <input
                          id="selectedImages"
                          name="selectedImages"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(event) => {
                            handleImageChange(event, formik);
                            formik.setFieldValue(
                              "selectedImages",
                              Array.from(event.currentTarget.files || [])
                            );
                          }}
                          ref={fileInputRef}
                          className="hidden"
                          autocomplete="dimensions"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.selectedImages &&
                        formik.errors.selectedImages && (
                          <div style={errorStyle}>
                            {formik.errors.selectedImages}
                          </div>
                        )}

                      {formik.values.selectedImages.length > 0 && (
                        <div className="uploaded-images">
                          {formik.values.selectedImages.map((image, index) => (
                            <div key={index}>
                              <p>{image.name}</p>
                              <img alt="Product" src={image} />
                              <br />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* ====> Description */}
                    <div class="sm:col-span-5">
                      <label
                        for="description"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div class="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows="2"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          class="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                        {formik.touched.description &&
                          formik.errors.description && (
                            <div style={errorStyle}>
                              {formik.errors.description}
                            </div>
                          )}
                      </div>
                      <p class="mt-3 text-sm leading-6 text-gray-600">
                        Write a detailed description about your product.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/dashboard">
                  <button
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {" "}
                  {productToEdit ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
          {/* ----------MY Form End------------- */}
          <div className="text-blue-gray-600 mt-2">
            <footer className="py-2">
              <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
                  © 2024, made with{" "}
                  <svg
                    xmlns="#"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="-mt-0.5 inline-block h-3.5 w-3.5"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>{" "}
                  by{" "}
                  <a
                    href="#"
                    target="_blank"
                    className="transition-colors hover:text-blue-500"
                  >
                    Palak Saxena
                  </a>{" "}
                  for a better web.{" "}
                </p>
                <ul className="flex items-center gap-4">
                  <li>
                    <a
                      href="#"
                      target="_blank"
                      className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      target="_blank"
                      className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      target="_blank"
                      className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
  marginTop: "5px",
};

export default AddProduct;
