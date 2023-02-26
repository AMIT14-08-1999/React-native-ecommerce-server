import express from "express";
import { getAllProducts, getProductDetails, createProduct, updateProduct, addProductImages, deleteProductImage, deleteProduct, addCategory, getAllCategory, deleteCategory, getAdminProducts } from "../controllers/product.js";
import {isAuthenticated,isAdmin} from '../middlewares/auth.js';
import {singleUpload} from '../middlewares/multer.js'
const router=express.Router();

router.get("/all",getAllProducts);
router.get("/admin",isAuthenticated,isAdmin,getAdminProducts);
router
.route("/single/:id")
    .get(getProductDetails)
    .put(isAuthenticated,isAdmin,updateProduct)
    .delete(isAuthenticated,isAdmin,deleteProduct);

router.post("/new",isAuthenticated,isAdmin,singleUpload,createProduct);

router
    .route("/images/:id")
    .post(isAuthenticated,isAdmin,singleUpload,addProductImages)
    .delete(isAuthenticated,isAdmin,deleteProductImage)

router.post('/category',isAuthenticated,isAdmin,addCategory);
router.get('/categories',getAllCategory);
router.delete('/category/:id',isAuthenticated,isAdmin,deleteCategory);
export default router;
