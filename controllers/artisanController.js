export const renderArtisansPage = async (req, res) => {
  try {
    // 1. Render page
    return res.render("artisan.ejs");

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