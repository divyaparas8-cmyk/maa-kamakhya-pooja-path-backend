const uploadCloudinary = require('./middleware/multipleimageupload');
const { createProduct } = require('./controllers/productController');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// We will also import index.js or just run the cloudinary config from index.js to simulate the exact overwrite!
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

async function runMockAPI() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB Connected.");

    // Mock 1x1 gif file buffer for images, freeParasad, paidRemedy
    const imgBuffer = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
    
    const req = {
        body: {
            name: "Pooja Test",
            description: "Test description",
            price: 150,
            category: "Pooja",
            location: "Indore"
        },
        files: {
            images: [
                {
                    mimetype: "image/gif",
                    buffer: imgBuffer,
                    size: imgBuffer.length
                }
            ],
            freeParasad: [
                {
                    mimetype: "image/gif",
                    buffer: imgBuffer,
                    size: imgBuffer.length
                }
            ],
            paidRemedy: [
                {
                    mimetype: "image/gif",
                    buffer: imgBuffer,
                    size: imgBuffer.length
                }
            ],
        }
    };

    const res = {
        status(code) {
            console.log("Response Status:", code);
            return this;
        },
        json(data) {
            console.log("Response JSON:", JSON.stringify(data, null, 2));
            return this;
        }
    };

    const next = (err) => {
        if (err) {
            console.error("Next called with error:", err);
        } else {
            console.log("Next called (moving to controller)...");
            // Call the controller!
            createProduct(req, res, next).catch(controllerErr => {
                console.error("Controller threw uncaught error:", controllerErr);
            });
        }
    };

    console.log("Running uploadCloudinary middleware...");
    try {
        await uploadCloudinary(req, res, next);
    } catch (err) {
        console.error("Middleware threw uncaught error:", err);
    }
}

runMockAPI().catch(console.error);
