import * as ProductService from "../services/productServices.js";
import * as OrderService from "../services/orderServices.js";
import * as UserService from "../services/userServices.js";

export const manageUsers = async (req,res) => {
    try {
        // 1. Get users
        const userList = await UserService.getAllUsers();
    
        // 2. Render page
        return res.render("admin/manageUsers.ejs", { userList });

    } catch (err) {
        console.error("GET /admin/users error:", err.message);
        return res.status(500).send("Failed to load users");
    }
}

export const manageProducts = async (req,res) => {
    try {
        // 1. Get products
        const productList = await ProductService.getAllProducts();
    
        // 2. Render page
        return res.render("admin/manageProducts.ejs", { productList });

    } catch (err) {
        console.error("GET /admin/products error:", err.message);
        return res.status(500).send("Failed to load products");
    }
}

export const manageOrders = async (req,res) => {
    try {
        // 1. Get orders
        const orderList = await OrderService.getAllOrders();
    
        // 2. Render page
        return res.render("admin/manageOrders.ejs", { orderList });

    } catch (err) {
        console.error("GET /admin/orders error:", err.message);
        return res.status(500).send("Failed to load orders");
    }
}

export const manageAdminProfile = async (req,res) => {
    try {
        const userId = req.user.id;

        // 1. Get user details
        const user = await UserService.getUserProfileById(userId);

        // 2. Render page
        return res.render("admin/manageAdminProfile.ejs", {user});

    } catch (err) {
        console.error("GET /admin/profile error:", err.message);
        return res.status(500).send("Failed to load profile");
    }
}