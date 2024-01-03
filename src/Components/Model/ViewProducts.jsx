import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import "../Model/Model.css";

const ViewProducts = ({ show, close, product }) => {

      return (
        <Dialog open={show} onClose={close} maxWidth="xs" fullWidth>
          <DialogTitle className="DialogTitle">Product Details</DialogTitle>
          <DialogContent className="DialogContent">
             <p><strong>Image:</strong> 
             {product.selectedImages[0] &&
                      typeof product.selectedImages[0] === "string" && (
                        <img
                          src={product.selectedImages[0]}
                          alt="Product Images"
                          className="image"
                        />
                      )}</p>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Model:</strong> {product.model}</p>
            <p><strong>ModelNumber:</strong> {product.modelNumber}</p>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Subcategory:</strong> {product.subcategory}</p>
            <p><strong>Status:</strong> {product.status ? "Active" : "Inactive"}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Description:</strong> {product. description}</p>
            <p><strong>Weight:</strong> {product.weight}</p>
            <p><strong>Dimensions:</strong> {product.dimensions}</p>
            <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
       
           
          </DialogContent>
          <DialogActions className="DialogActions">
            <Button className="Button" onClick={close} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

export default ViewProducts;
