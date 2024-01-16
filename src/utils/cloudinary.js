import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// this uploadOnCloudinary function is responsible for uploading file in the cloudinary.
// localFilePath is the path of that file which is stored in local server for temporary

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log(response, "File uploaded successfully");
        return response; 
    } catch (error) {
        // if any error happens, removing/unlinking the file from server 
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { console.log(result); });