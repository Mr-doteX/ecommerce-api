import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {
  try {
    console.log(req.file, RegExp.files);
    // check if user(client) has permission to add a product
    // upload the product image
    console.log(req.file);
    // validate product information
    const {error,value} = addProductValidator.validate({
      ...req.body,
      // image:req.file?.filename,
      pictures:req.file?.map((file) =>{
        return file.filename;
      }),
    });
    if(error){
      return res.status(422).json(error);
    }
    // save the product information to the database
    const result = await ProductModel.create(value);
    // return a response to the client
    res.status(201).json(result);
  } catch (error) {
    next (error);
  }
}

export const getProducts = async (req, res, next) => {
    try {
        // fetch product from database
        const result = await ProductModel.find();
        // Return response
      res.json(result);
    } catch (error) {
        next(error);
    }
};

export const countProducts = (req, res) => {
  res.send("All Product count!");
};

export const updateProduct = (req, res) => {
  res.send(`product with id ${req.params.id} updated!`);
};

export const deleteProduct = (req, res) => {
  res.send(`product with id ${req.params.id} deleted!`);
};
