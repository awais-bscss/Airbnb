const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const rootPath = require("../utils/pathUtil");
const filePath = path.join(rootPath, "data", "homes.json");

class Home {
  constructor(homeName, price, location, rating, PhotoURL) {
    this.id = crypto.randomBytes(16).toString("hex"); // Unique ID for each home
    this.homeName = homeName;
    this.price = parseFloat(price) || 0;
    this.location = location;
    this.rating = parseFloat(rating) || 0;
    this.PhotoURL = PhotoURL || "/images/default-home.jpg";
  }

  async save() {
    // Pehle saare homes fetch karein
    const homes = await Home.fetchAll();
    // Naye ghar ko array mein shamil karein
    homes.push(this);
    // Poore array ko wapas file mein likh dein
    await fs.writeFile(filePath, JSON.stringify(homes, null, 2));
  }

  static async fetchAll() {
    try {
      // File se data parhne ki koshish karein
      const data = await fs.readFile(filePath, "utf8");
      // Data ko parse karein
      return JSON.parse(data);
    } catch (error) {
      // Agar koi bhi error aaye (jaise file nahi hai, ya khali hai)
      // to ek khali array return karein.
      // Is se application crash nahi hogi.
      if (error.code === "ENOENT") {
        // ENOENT ka matlab "Error NO ENTry" ya file not found
        return []; // File nahi hai, to khali array theek hai
      }
      // Kisi aur error ki surat mein usay console par dikhayein
      console.error("Error fetching homes:", error);
      return []; // Phir bhi khali array return karein taake app chalti rahe
    }
  }
  static findById(homeId, callback) {
    Home.fetchAll()
      .then((homes) => {
        const home = homes.find((h) => h.id === homeId);
        if (home) {
          callback(null, home);
        } else {
          callback(new Error("Home not found"));
        }
      })
      .catch((err) => {
        console.error("Error fetching home by ID:", err);
        callback(err);
      });
  }
}

module.exports = Home;
