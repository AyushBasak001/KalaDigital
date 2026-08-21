export const renderAdminDashboard = async (req, res) => {
  try {
    // Fetch these from PostgreSQL later
    
    const stats = {
        users: 0,
        artisans: 0,
        products: 0,
        orders: 0,
        pendingArtisans: 0,
        pendingProducts: 0,
        reportedProducts: 0
    };

    const activity = [];
    const orders = [];

    res.render("dashboard/admin/overview", {
        user: req.user,
        stats,
        activity,
        orders
    });

  } catch (err) {
    console.error("GET /customers/dashboard error:", err.message);
    return res.status(500).send("Internal server error");
  }
}