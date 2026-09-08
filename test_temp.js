const cloudinary = require('cloudinary').v2;

async function runTest() {
    // DO NOT call cloudinary.config() globally. Instead, pass it in the options.
    const cloudinaryConfig = {
        cloud_name: "dfporfl8y",
        api_key: "244749221557343",
        api_secret: "jDkVlzvkhHjb81EvaLjYgtNtKsY",
    };

    try {
        console.log("Global config name (should be undefined/empty):", cloudinary.config().cloud_name);
        
        const dummyImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        console.log("Uploading dummy image using per-call options...");
        const result = await cloudinary.uploader.upload(dummyImg, {
            ...cloudinaryConfig,
            folder: "test"
        });
        console.log("Upload Success! URL:", result.secure_url);
    } catch (err) {
        console.error("Upload Failed:", err);
    }
}

runTest();
