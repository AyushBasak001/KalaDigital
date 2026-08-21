export const renderWorkingPage = async (req, res) => {
  try {
    // 1. Render page
    return res.render("working.ejs");

  } catch (err) {
    console.error("GET /working error:", err.message);
    return res.status(500).send("Internal server error");
  }
}