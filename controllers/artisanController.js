import * as ArtisanService from "../services/ArtisanService.js";

export const renderArtisansPage = async (req, res) => {
  try {

    // 1. Get artisans
    const artisanList = await ArtisanService.getAllArtisans();

    // 2. Get featuredArtisan
    let featuredArtisan = null;

    if (artisanList.length > 0) {
        featuredArtisan =
            artisanList[Math.floor(Math.random() * artisanList.length)];
    }
    
    // 3. Render page
    return res.render("artisan.ejs", { featuredArtisan, artisanList });

  } catch (err) {
    console.error("GET /artisans error:", err.message);
    return res.status(500).send("Internal server error");
  }
}

export const renderArtisanDashboard = async (req, res) => {
  try {
    // Fetch these from PostgreSQL later
    
    const stats = {
        orders: 0,
        revenue: 0,
        products: 0,
        customers: 0
    };

    const orders = [];
    const products = [];

    res.render("dashboard/artisan/overview", {
        user: req.user,
        stats,
        orders,
        products
    });

  } catch (err) {
    console.error("GET /customers/dashboard error:", err.message);
    return res.status(500).send("Internal server error");
  }
}