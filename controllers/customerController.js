export const renderCustomerDashboard = async (req, res) => {
  try {
    // Fetch these from PostgreSQL later
    const stats = {
        activeOrders: 0,
        completedOrders: 0,
        wishlistCount: 0
    };

    const orders = [];

    const products = [];

    res.render("dashboard/customer/overview", {
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