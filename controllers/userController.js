import * as CategoryService from "../services/categoryServices.js";

export const renderMarketplace = async (req, res) => {
    try {
        // 1. Get categories
        const categories = await CategoryService.getAllCategories();

        // 2. Render page
        return res.render("user/userMarketplace.ejs", { categories });

    } catch (err) {
        console.error("GET /user/marketplace error:", err.message);
        return res.status(500).send("Failed to load marketplace");
    }
};