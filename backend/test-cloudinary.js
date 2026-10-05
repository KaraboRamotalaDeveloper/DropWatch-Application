const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
  try {
    console.log("Testing simplest possible upload...");

    const result = await cloudinary.uploader.upload(
      "./IMG-20230923-WA0030.jpg",
    );

    console.log("✅ UPLOAD SUCCESS");
    console.log("Public ID:", result.public_id);
    console.log("URL:", result.secure_url);
  } catch (error) {
    console.error("❌ UPLOAD FAILED");
    console.error("Message:", error.message);
    console.error("HTTP code:", error.http_code);
    console.error("Name:", error.name);
    console.error("Full error:", error);
  }
}

testUpload();
