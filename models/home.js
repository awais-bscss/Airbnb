let registeredHomes = [];
const fs = require("fs");
const path = require("path");
const rootPath = require("../utils/pathUtil");
const filePath = path.join(rootPath, "data", "homes.json");

class Home {
  constructor(homeName, price, location, rating, PhotoURL) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.PhotoURL = PhotoURL;
  }
  save() {
    Home.fetchAll((homes) => {
      homes.push(this);
      const homePath = path.join(rootPath, "data", "homes.json");
      fs.writeFile(homePath, JSON.stringify(homes), (err) => {
        if (err) {
          console.error("Error writing to file", err);
        }
      });
    });
  }
  static fetchAll(callback) {
    const homePath = path.join(rootPath, "data", "homes.json");
    fs.readFile(homePath, (err, fileContent) => {
      if (!err) {
        callback(JSON.parse(fileContent));
      } else {
        callback([]);
      }
    });
  }
}
exports.Home = Home;
