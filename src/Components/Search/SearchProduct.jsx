import React, { useMemo, useState } from "react";
import "../Search/SearchProduct.css";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { searchProduct } from "../../Reducer/ProductSlice";

const SearchProduct = () => {
  const [searchValue, setSearchValue] = useState("");
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

   const handleChange = (e) =>{
    setSearchValue(e.target.value);
    dispatch(searchProduct(e.target.value))

   }

  const handleDebouncedChange = useMemo(() => {
    return debounce(handleChange, 300);
  }, [products]);

  return (
    <div className="Search-box">
      <input
        className="Search-input"
        type="text"
        placeholder="Search product"
        onChange={handleDebouncedChange}
      />
    </div>
  );
};

export default SearchProduct;
