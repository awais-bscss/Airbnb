const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "../data/homes.json");

// GET: Show Add Home Page
const getHome = async (req, res) => {
  try {
    res.render("host/editHome", {
      pageTitle: "Add Home",
      error: null,
      edit: false,
      home: {},
    });
  } catch (err) {
    console.error("Error rendering addHome:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Server error",
    });
  }
};

// POST: Save New Home
const postHome = async (req, res) => {
  try {
    const { homeName, price, location, rating, PhotoURL } = req.body;

    if (!homeName || !price || !location) {
      return res.status(400).render("host/editHome", {
        pageTitle: "Add Home",
        error: "Please provide home name, price, and location",
        edit: false,
        home: { homeName, price, location, rating, PhotoURL },
      });
    }

    const newHome = {
      id: crypto.randomUUID(),
      homeName,
      price: parseFloat(price),
      location,
      rating: parseFloat(rating) || 0,
      PhotoURL: PhotoURL || "/images/fallback.jpg",
    };

    const data = await fs.readFile(filePath, "utf8");
    const homes = JSON.parse(data || "[]");

    homes.push(newHome);

    await fs.writeFile(filePath, JSON.stringify(homes, null, 2));
    res.redirect("/host/hostList");
  } catch (err) {
    console.error("Error adding home:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Failed to add home",
    });
  }
};

// GET: Show All Hosted Homes
const hostList = async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const homes = JSON.parse(data || "[]");

    res.render("host/hostList", {
      home: homes,
      pageTitle: "Host List",
    });
  } catch (err) {
    console.error("Error fetching homes:", err);
    res.render("host/hostList", {
      home: [],
      pageTitle: "Host List",
      error: "Could not fetch homes",
    });
  }
};

// GET: Edit Home by ID
const getEditHome = async (req, res) => {
  const homeId = req.params.homeId;
  const edit = req.query.edit === "true";

  if (!edit) {
    return res.redirect("/host/hostList");
  }

  try {
    const data = await fs.readFile(filePath, "utf8");
    const homes = JSON.parse(data || "[]");

    const home = homes.find((h) => h.id === homeId);

    if (!home) {
      return res.redirect("/host/hostList");
    }

    res.render("host/editHome", {
      home,
      pageTitle: "Edit Home",
      edit,
      homeId,
      error: null,
    });
  } catch (err) {
    console.error("Error fetching home for edit:", err.message);
    res.redirect("/host/hostList");
  }
};

// POST: Update Edited Home
const postEditHome = async (req, res) => {
  const homeId = req.params.homeId;
  const { homeName, price, location, rating, PhotoURL } = req.body;

  try {
    const data = await fs.readFile(filePath, "utf8");
    const homes = JSON.parse(data || "[]");

    const index = homes.findIndex((h) => h.id === homeId);

    if (index === -1) {
      return res.redirect("/host/hostList");
    }

    homes[index] = {
      ...homes[index],
      homeName: homeName || homes[index].homeName,
      price: parseFloat(price) || homes[index].price,
      location: location || homes[index].location,
      rating: parseFloat(rating) || homes[index].rating,
      PhotoURL: PhotoURL || homes[index].PhotoURL,
    };

    await fs.writeFile(filePath, JSON.stringify(homes, null, 2));

    res.redirect("/host/hostList");
  } catch (err) {
    console.error("Error updating home:", err);
    res.status(500).render("error", {
      pageTitle: "Error",
      error: "Failed to update home",
    });
  }
};

module.exports = {
  getHome,
  postHome,
  hostList,
  getEditHome,
  postEditHome,
};
