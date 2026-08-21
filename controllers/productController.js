export const renderProductsPage = async (req, res) => {
  try {
    // 1. Render page
    return res.render("product.ejs");

  } catch (err) {
    console.error("GET /products error:", err.message);
    return res.status(500).send("Internal server error");
  }
}