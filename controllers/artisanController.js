export const renderArtisansPage = async (req, res) => {
  try {
    // 1. Render page
    return res.render("artisan.ejs");

  } catch (err) {
    console.error("GET /artisans error:", err.message);
    return res.status(500).send("Internal server error");
  }
}