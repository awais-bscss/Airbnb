const Home = require("../models/home");

const getHome = async (req, res, next) => {
  try {
    res.render("host/addHome", { pageTitle: "Add Home", error: null });
  } catch (err) {
    console.error("Error rendering addHome:", err);
    res
      .status(500)
      .render("error", { pageTitle: "Error", error: "Server error" });
  }
};

const postHome = async (req, res, next) => {
  try {
    const { homeName, price, location, rating, PhotoURL } = req.body;
    if (!homeName || !price || !location) {
      return res.status(400).render("host/addHome", {
        pageTitle: "Add Home",
        error: "Please provide home name, price, and location",
      });
    }

    const home = new Home(
      homeName,
      price,
      location,
      parseFloat(rating) || 0,
      PhotoURL || "/images/fallback.jpg"
    );
    await home.save();
    res.render("host/homeAdded", { pageTitle: "Home Added" });
  } catch (err) {
    console.error("Error adding home:", err);
    res
      .status(500)
      .render("error", { pageTitle: "Error", error: "Failed to add home" });
  }
};

const hostList = async (req, res, next) => {
  try {
    const homes = await Home.fetchAll();
    res.render("host/hostList", { home: homes, pageTitle: "Host List" });
  } catch (err) {
    console.error("Error fetching homes:", err);
    res.render("host/hostList", { home: [], pageTitle: "Host List" });
  }
};

module.exports = { getHome, postHome, hostList };
