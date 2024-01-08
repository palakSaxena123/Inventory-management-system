import { useRef,  useEffect} from "react";
import { addProduct, editProduct } from "../../Reducer/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import { ProductSchema } from "../../Validation/Validation";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../../Components/SideBar/SideBar";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const AddProduct = () => {
  const location = useLocation();
  const { state } = location;
  const productToEdit = state ? state.productToEdit : null;
  const products = useSelector((state)=>state.product.products);
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
      const existingProductWithName = products.find(
        (product) => product.name === values.name && product.id !== productToEdit.id
      );
  
      const existingProductWithSKU = products.find(
        (product) => product.sku === (values.sku ?? "") && product.id !== productToEdit.id
      );
  
      if (existingProductWithName || existingProductWithSKU) {
        toast.error("Product with the same name or SKU already exists");
      } else {
        // If productToEdit exists, dispatch editProduct action
        dispatch(editProduct({ id: productToEdit.id, ...values }));
        toast.success("Product updated successfully");
        navigate("/productlist");
      }
    } else {
      // Check if a product with the same name or SKU already exists
      const existingProductWithName = products.find(
        (product) => product.name === values.name
      );
  
      const existingProductWithSKU = products.find(
        (product) => product.sku === (values.sku ?? "")
      );
  
      if (existingProductWithName || existingProductWithSKU) {
        toast.error("Product with the same name or SKU already exists");
      } else {
        // If productToEdit doesn't exist, generate a new id and dispatch addProduct action
        const id = nanoid();
        const numericWeight = parseFloat(values.weight);
        const numericQuantity = parseInt(values.quantity, 10) || 0;
  
        dispatch(
          addProduct({
            ...values,
            weight: numericWeight,
            inventory: numericQuantity,
            id,
          })
        );
  
        toast.success("Product added successfully");
        navigate("/productList");
      }
    }
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
          <Header />

          {/* ---------- Form Start ------------- */}
          <div className="FORM">
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    {/* =====> Product name */}
                    <div className="sm:col-span-3">
                      <label
                        for="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          onBlur={formik.handleBlur}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.name && formik.errors.name && (
                        <div style={errorStyle}>{formik.errors.name}</div>
                      )}
                    </div>
                    {/* =====> Product Brand */}
                    <div className="sm:col-span-3">
                      <label
                        for="brand"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product brand
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="brand"
                          id="brand"
                          onChange={formik.handleChange}
                          value={formik.values.brand}
                          onBlur={formik.handleBlur}
                          autocomplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.brand && formik.errors.brand && (
                        <div style={errorStyle}>{formik.errors.brand}</div>
                      )}
                    </div>
                    {/* =====> Product Model */}
                    <div className="sm:col-span-3">
                      <label
                        for=" model"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Model
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="model"
                          id="model"
                          onChange={formik.handleChange}
                          value={formik.values.model}
                          onBlur={formik.handleBlur}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.model && formik.errors.model && (
                        <div style={errorStyle}>{formik.errors.model}</div>
                      )}
                    </div>
                    {/* =====> Product Model Number */}
                    <div className="sm:col-span-3">
                      <label
                        for="modelNumber"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Model Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="modelNumber"
                          id="modelNumber"
                          onChange={formik.handleChange}
                          value={formik.values.modelNumber}
                          onBlur={formik.handleBlur}
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        for="sku"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        SKU
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="sku"
                          id="sku"
                          onChange={formik.handleChange}
                          value={formik.values.sku}
                          onBlur={formik.handleBlur}
                          autocomplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.sku && formik.errors.sku && (
                        <div style={errorStyle}>{formik.errors.sku}</div>
                      )}
                    </div>
                    {/* =====> Price */}
                    <div className="sm:col-span-2">
                      <label
                        for="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          onChange={formik.handleChange}
                          value={formik.values.price}
                          onBlur={formik.handleBlur}
                          autocomplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.price && formik.errors.price && (
                        <div style={errorStyle}>{formik.errors.price}</div>
                      )}
                    </div>
                    {/* =====> Weight */}
                    <div className="sm:col-span-2">
                      <label
                        for="weight"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Item Weight
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="weight"
                          id="weight"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.weight}
                          autocomplete="weight"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.weight && formik.errors.weight && (
                        <div style={errorStyle}>{formik.errors.weight}</div>
                      )}
                    </div>
                    {/* =====> Quantity */}
                    <div className="sm:col-span-2">
                      <label
                        for="quantity"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Item Quantity
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="quantity"
                          id="quantity"
                          onChange={formik.handleChange}
                          value={formik.values.quantity}
                          onBlur={formik.handleBlur}
                          autocomplete="quantity"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.quantity && formik.errors.quantity && (
                        <div style={errorStyle}>{formik.errors.quantity}</div>
                      )}
                    </div>
                    {/* ====> Dimensions */}
                    <div className="sm:col-span-4">
                      <label
                        for="dimensions"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Dimensions
                      </label>
                      <div className="mt-2">
                        <input
                          id="dimensions"
                          name="dimensions"
                          type="dimensions"
                          onChange={formik.handleChange}
                          value={formik.values.dimensions}
                          onBlur={formik.handleBlur}
                          autocomplete="dimensions"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <div className="sm:col-span-4">
                      <label
                        for="manufacturer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Manufacturer
                      </label>
                      <div className="mt-2">
                        <input
                          id="manufacturer"
                          name="manufacturer"
                          type="manufacturer"
                          onChange={formik.handleChange}
                          value={formik.values.manufacturer}
                          onBlur={formik.handleBlur}
                          autocomplete="dimensions"
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <div className="sm:col-span-3">
                      <label
                        for="category"
                     className="block text-sm font-medium leading-6 text-gray-900"
                      >
                      Category
                      </label>
                      <div className="mt-2">
                        <select
                          id="category"
                          name="category"
                          onChange={formik.handleChange}
                          value={formik.values.category}
                          onBlur={formik.handleBlur}
                          autocomplete="category-name"
                       className="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                    <div className="sm:col-span-3">
                      <label
                        for="subcategory"
                     className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Subcategory
                      </label>
                      <div className="mt-2">
                        <select
                          id="subcategory"
                          name="subcategory"
                          onChange={formik.handleChange}
                          value={formik.values.subcategory}
                          onBlur={formik.handleBlur}
                          autocomplete="subcategory-name"
                       className="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                      Status
                      </label>
                      <div className="mt-2">
                        <select
                          id="status"
                          name="status"
                          onChange={formik.handleChange}
                          value={formik.values.status}
                          onBlur={formik.handleBlur}
                          autoComplete="status"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                    <div className="sm:col-span-4">
                      <label
                        for="selectedImages"
                        onClick={handleLabelClick}
                     className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Images
                      </label>
                      <div className="mt-2">
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
                              <img alt="Product" 
                              src={image}    
                              style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "contain" }}/>
                              <br />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* ====> Description */}
                    <div className="sm:col-span-5">
                      <label
                        for="description"
                     className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows="2"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          onBlur={formik.handleBlur}
                       className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                        {formik.touched.description &&
                          formik.errors.description && (
                            <div style={errorStyle}>
                              {formik.errors.description}
                            </div>
                          )}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a detailed description about your product.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/productList">
                  <button
                    type="button"
                 className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {" "}
                  {productToEdit ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
          {/* ----------Form End------------- */}
          <div className="text-blue-gray-600 mt-2">
            <Footer/>
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
