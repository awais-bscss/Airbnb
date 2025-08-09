const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const rootPath = require("../utils/pathUtil");
const filePath = path.join(rootPath, "data", "homes.json");

class Home {
  constructor(homeName, price, location, rating, PhotoURL) {
    this.id = crypto.randomBytes(16).toString("hex");
    this.homeName = homeName;
    this.price = parseFloat(price) || 0;
    this.location = location;
    this.rating = parseFloat(rating) || 0;
    this.PhotoURL = PhotoURL || "/images/default-home.jpg";
  }

  async save() {
    const homes = await Home.fetchAll();
    homes.push(this);
    await fs.writeFile(filePath, JSON.stringify(homes, null, 2));
  }

  static async fetchAll() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") return [];
      console.error("Error fetching homes:", error);
      return [];
    }
  }

  static async findById(homeId) {
    try {
      const homes = await Home.fetchAll();
      const home = homes.find((h) => h.id === homeId);
      if (!home) return null; // important: return null, not throw
      return home;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Home;
