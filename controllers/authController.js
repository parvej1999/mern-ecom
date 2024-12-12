import userModel from '../models/userModel.js'
import { hashPassword, comparePassword } from '../helpers/authHelper.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone || !address)
            console.log("some field is missing");

        const isExisting = await userModel.findOne({ email });
        if (isExisting) {
            console.log("user already exists");
            return res.status(200).send({
                success: false,
                message: "user already exists",
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await userModel({
            name, email, password: hashedPassword, phone, address,
        });
        await user.save()
        return res.status(201).send({
            success: true,
            message: "user created",
            user,
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "encoutered some error",
            error,
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Id Or Password Not Right",
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Does Not Exists",
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid user or password"
            })
        }
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: "7d" });
        console.log(`login ${match}`, token);
        return res.status(200).send({
            success: true,
            message: "login successfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
            },
            token,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "some error encountered",
            error,
        })
    }
}