const Home = require("../models/home");
const getHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Home Page" });
};
module.exports.getHome = getHome;
const postHome = (req, res, next) => {
  const home = new Home.Home(
    req.body.homeName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.PhotoURL
  );
  home.save();
  // registeredHomes.push(req.body);
  res.render("homeAdded", { pageTitle: "Home Added" });
};
module.exports.postHome = postHome;
const addHome = (req, res, next) => {
  const registeredHomes = Home.Home.fetchAll((registeredHomes) =>
    res.render("home.ejs", { home: registeredHomes, pageTitle: "Home Page" })
  );
};
module.exports.addHome = addHome;
const notFound = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "404 page" });
};
module.exports.notFound = notFound;
