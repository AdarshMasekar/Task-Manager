const bcrypt = require("bcryptjs")
const {SALT_ROUNDS,JWT_SECRET} = require("../config/dotenv");
const User = require("../model/User");
const jwt = require("jsonwebtoken")


const createUser = async({firstName,lastName,email,password})=>{
    try{
        const hashedPassword = await bcrypt.hashSync(password,SALT_ROUNDS);
        await User.create({firstName,lastName,email,password:hashedPassword});
        return {
            "success":true,
            "error":"user registration successfull!"
        };
    }
    catch(error){
        return {
            "success":false,
            "error":"user registration failed!"+ error
        };
    }
}

const validate = async(user,password) =>{
    try {
        const userId = user._id;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const email = user.email;
        const storedPassword = user.password;
        const isValidCredentials = await bcrypt.compareSync(password,storedPassword)
        if(!isValidCredentials){
            return {
                "success":false,
                "message":"invalid credentials!"
            }
        }

        const token = 'Bearer ' + jwt.sign({userId,firstName,lastName,email},JWT_SECRET,{ expiresIn: '1h' })
        return {
            "success":true,
            "token":token
        }

    } catch (error) {
        return {
            "success":false,
            "message":"user authentication failed!"+error
        }
    }

}

const updateUser = async (userId, updates) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        return {
            success: true,
            updatedUser
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to update user profile: " + error.message
        };
    }
};

const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { success: false, error: "User not found." };
        }
        const isMatch = await bcrypt.compareSync(currentPassword, user.password);
        if (!isMatch) {
            return { success: false, error: "Invalid current password." };
        }
        const hashedPassword = await bcrypt.hashSync(newPassword, SALT_ROUNDS);
        user.password = hashedPassword;
        await user.save();
        return { success: true, message: "Password changed successfully." };
    } catch (error) {
        return { success: false, error: "Failed to change password: " + error.message };
    }
};

const verifyToken = (token) => {
    try {
        const actualToken = token.split(" ")[1];
        const decoded = jwt.verify(actualToken, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = {
    createUser,
    validate,
    updateUser,
    changePassword,
    verifyToken
}
