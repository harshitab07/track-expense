import express from "express";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/helper.js";

export const signupController = async (req, res) => {
  try {
    console.log('API call signupController');
    const { name, email, password, answer } = req.body;

    // validation
    if (!name || !email || !password || !answer) {
      return res.send({
        success: false,
        message: "User information is incomplete",
      });
    }

    // make sure its unique
    const user = await userModel.findOne({ email });
    if (user) {
      return res.send({
        success: false,
        message: "User already registered. Please LogIn",
      });
    }

    // save user
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name, email, password: hashedPassword, answer
    }).save();

    console.log('Success in API call signupController');
    return res.status(200).send({
      success: true,
      message: "User registered successfully!",
      newUser,
    });
  } catch (err) {
    console.log('Failure in call signupController');
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: err?.message || err
    });
  }
};

export const loginController = async (req, res) => {
  try {
    console.log('API call loginController');
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }
    // create token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log('Success in API call loginController');
    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      user: {
        name: user.name,
        email: user.email,
        dob: user.dob,
      },
      token,
    });
  } catch (err) {
    console.log('Failure in call loginController');
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: err?.message || err
    });
  }
};

// change password controller
export const forgotPasswordController = async (req, res) => {
    try {
      console.log('API call forgotPasswordController');
        const { email, password, answer } = req.body;

        if (!email || !password || !answer) {
            res.send({
                success: false,
                message: 'Email, password and answer are required!',
            });
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.send({
                success: false,
                message: 'Invalid email',
            });
        }

        if (user.answer !== answer) {
            return res.send({
                success: false,
                message: 'Incorrect answer',
            });
        }

        const hashedPassword = await hashPassword(password);

        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
        console.log('Success in API call forgotPasswordController');
        res.status(200).send({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
      console.log('Failure in API call forgotPasswordController');
        res.status(500).send({
            success: false,
            message: 'Failed to change password',
            error
        });
    }
}

const router = express.Router();

router.post("/login", loginController);
router.post("/register", signupController);
router.post('/forgot-password', forgotPasswordController);

export default router;
