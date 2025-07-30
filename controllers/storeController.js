const Home = require("../models/home");

const addHome = async (req, res, next) => {
  try {
    const homes = await Home.fetchAll();
    res.render("store/home", { home: homes, pageTitle: "Home Listings" });
  } catch (err) {
    console.error("Error fetching homes:", err);
    res.render("store/home", { home: [], pageTitle: "Home Listings" });
  }
};
const bookings = (req, res, next) => {
  try {
    res.render("store/bookings", { pageTitle: "Bookings" });
  } catch (err) {
    console.error("Error rendering bookings:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Failed to load bookings",
    });
  }
};
const favouriteList = (req, res, next) => {
  try {
    res.render("store/favouriteList", { pageTitle: "Favourite List" });
  } catch (err) {
    console.error("Error rendering favourite list:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Failed to load favourite list",
    });
  }
};
const index = (req, res, next) => {
  try {
    res.render("store/index", { pageTitle: "Index Page" });
  } catch (err) {
    console.error("Error rendering index page:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Failed to load index page",
    });
  }
};
const homeBooked = async (req, res, next) => {
  const homeId = req.params.homeId;
  try {
    const homes = await Home.fetchAll();
    const bookedHome = homes.find((home) => home.id === homeId);
    if (!bookedHome) {
      return res.status(404).render("error", {
        pageTitle: "Error",
        error: "Home not found",
      });
    }
    res.render("store/bookings", {
      pageTitle: "Home Booked",
      home: bookedHome,
    });
  } catch (err) {
    console.error("Error fetching home:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Failed to book home",
    });
  }
};
const homeDetail = async (req, res, next) => {
  const homeId = req.params.homeId;
  try {
    const homes = await Home.fetchAll();
    const home = homes.find((h) => h.id === homeId);
    if (!home) {
      return res.status(404).render("error", {
        pageTitle: "Error",
        error: "Home not found",
      });
    }

    res.render("store/homeDetail", { home, pageTitle: "Home Detail" });
  } catch (err) {
    console.error("Error fetching home details:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Failed to load home details",
    });
  }
};

const notFound = (req, res, next) => {
  try {
    console.log(`404 triggered for: ${req.originalUrl}`);
    res.status(404).render("404", { pageTitle: "404 Page Not Found" });
  } catch (err) {
    console.error("Error rendering 404:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addHome,
  notFound,
  bookings,
  favouriteList,
  index,
  homeBooked,
  homeDetail,
};
