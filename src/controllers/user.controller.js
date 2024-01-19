import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler( async (req, res) => {

    // STEPS: 
        // get all the required data from frontend
        // validate those data
        // check if user already exists
        // check if any file needs to be uploaded: if so upload in cloudinary
        // now you have all the required data. so create a object with these data. now make a request to database
        // db will send a response. if successful then send this response to user. but need to remove password, refresh token from response. and if it is unsuccessful then send error message

    const {username, email, fullname, password} = req.body;

    // this way you have to write if() for all the field, so will use another technique 
    // if(username === ""){
    //     throw new ApiError(400, "username field is required");
    // }

    if(
        [username, email, fullname, password].some((field) =>
        field?.trim() === "")
        ){
            throw new ApiError(400, "all fields are required");
        }
    
    // this User is making a query to db to find if any user is already exist with email. if you want to search with only one value then you could go just like this : User.findOne({email}). but this way you can only pass a single value. to pass multiple values you have to use operators ($)
    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })
    if (existedUser){
        throw new ApiError(409, "user with username or email is already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){ throw new ApiError(400, "avatar is required")}

    const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })
    const userCreated = await User.findById(user?._id).select("-password -refreshToken");

    return res.status(201).json(
        new ApiResponse(201, userCreated, "User created successfully.")
    )

})

export {registerUser}