const express = require("express");
const { createUser, validate, updateUser, changePassword } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const signinMiddleware = require("../middleware/signinMiddleware");
const signupMiddleware = require("../middleware/signupMiddleware");

router.post("/signup", signupMiddleware, async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const response = await createUser({ firstName, lastName, email, password });
    if (response.success) {
        res.status(201).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.post("/signin", signinMiddleware, async (req, res) => {
    const { password } = req.body;
    const user = req.user;
    const response = await validate(user, password);
    if (response.success) {
        res.status(200).json(
            {
             "token": response.token,
             "userDetails": {
                firstName:user.firstName,
                lastName : user.lastName,
                email : user.email,
                id: user._id
             }
            }
        );
    } else {
        res.status(400).json(response);
    }
});

router.put("/update", authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const updates = req.body;
    const response = await updateUser(userId, updates);
    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.put("/change-password", authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;
    const response = await changePassword(userId, currentPassword, newPassword);
    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

module.exports = router;
