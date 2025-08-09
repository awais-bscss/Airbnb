const fs = require("fs").promises;
const path = require("path");
// const crypto = require("crypto");
const rootPath = require("../utils/pathUtil");
const filePath = path.join(rootPath, "data", "favourite.json");

class Favourite {
  static async addToFavourites(homeId) {
    try {
      // Pehle saare favourites fetch karein
      const favourites = await Favourite.getFavourite();
      // Naya favourite ID shamil karein
      // if (favourites.some(fav => fav.id === homeId)) {
      //   console.log("Home already in favourites");
      //   return; // Agar already favourite hai, to kuch nahi karna
      // }
      if (favourites.includes(homeId)) {
        console.log("Home already in favourites");
        // Agar already favourite hai, to kuch nahi karna
      } else {
        favourites.push(homeId);
        // Poore array ko wapas file mein likh dein
        await fs.writeFile(filePath, JSON.stringify(favourites, null, 2));
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  }
  static async getFavourite() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      return []; // Agar koi error aaye, to khali array return karein
    }
  }
}
module.exports = Favourite;
