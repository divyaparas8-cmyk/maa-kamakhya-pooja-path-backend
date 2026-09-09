/**
 * Run this script once to create an admin user in MongoDB
 * Usage: node createAdmin.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DB = process.env.DB || "mongodb+srv://mohammadrehan00121:IMPvY4psRpwPo2mL@cluster0.l8l9u.mongodb.net/temple-ecomm";

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => { console.error("❌ DB Error:", err); process.exit(1); });

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
  avatar: { public_id: String, url: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@maakamakhya.com" });
    if (existingAdmin) {
      console.log("⚠️  Admin already exists!");
      console.log("📧 Email   : admin@maakamakhya.com");
      console.log("🔑 Password: Admin@1234");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@1234", 10);

    await User.create({
      name: "Maa Kamakhya Admin",
      email: "admin@maakamakhya.com",
      password: hashedPassword,
      role: "admin",
      avatar: {
        public_id: "admin_avatar",
        url: "https://i.imgur.com/HeIi0wU.png"
      }
    });

    console.log("\n✅ Admin Created Successfully!\n");
    console.log("================================");
    console.log("📧 Email   : admin@maakamakhya.com");
    console.log("🔑 Password: Admin@1234");
    console.log("================================\n");
    console.log("🌐 Login at: http://localhost:3001/login");
    console.log("🛡️  Admin Panel: http://localhost:3001/admin/dashboard\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
}

createAdmin();
