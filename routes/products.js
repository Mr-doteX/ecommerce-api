import { Router } from "express";
import {
    addProduct,
    countProducts,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../controllers/products.js";
import {productImageUpload,productPicturesUpload,} from "../middlewares/upload.js";

// create product router
const productRouter = Router();

// define the product routes
productRouter.post(
    "/products",
    //   productImageUpload.single("image"),
    productPicturesUpload.array("pictures", 3),
    addProduct); //middleware to uplaod images

productRouter.get("/products", getProducts);

productRouter.get("/products/count", countProducts);

productRouter.patch("/products/:id", isAuthenticated,updateProduct);

productRouter.put("/products/:id", isAuthenticated, productPicturesUpload.array("pictures", 3),replaceProduct);

productRouter.delete("/products/:id",isAuthenticated, deleteProduct);

// export the product router
export default productRouter;
