// test-cloudinary.js

const cloudinary = require("cloudinary").v2;
const path = require("path");
const dotenv = require("dotenv");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
  try {
    // const envResult = dotenv.config({ path: path.join(__dirname, ".env") });
    // console.log("Environment Variables Loaded:", envResult.parsed);

    // if (envResult.error) {
    //   console.error("Dotenv Error:", envResult.error);
    // } else {
    //   console.log(
    //     "Dotenv loaded successfully from path:",
    //     path.join(__dirname, ".env"),
    //   );
    //   console.log("Parsed keys:", Object.keys(envResult.parsed || {}));
    // }

    console.log("Cloudinary Verification:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "MISSING",
      api_key: process.env.CLOUDINARY_API_KEY ? "LOADED" : "MISSING",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING",
    });
    console.log(
      "Testing upload to Cloud name:",
      process.env.CLOUDINARY_CLOUD_NAME,
    );
    // Uploads a tiny sample base64 red pixel to test your keys
    const result = await cloudinary.uploader.upload(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      { folder: "test_folder" },
    );
    console.log("SUCCESS! Image uploaded at:", result.secure_url);
  } catch (error) {
    console.error("FAILED! Cloudinary returned error:");
    console.error(error);
  }
}

testUpload();
