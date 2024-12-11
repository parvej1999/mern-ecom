import userModel from '../models/userModel.js'
import { hashPassword, comparePassword } from '../helpers/authHelper.js'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone || !address)
            console.log("some field is missing");

        const isExisting = userModel.findOne({ email });
        if (isExisting) {
            console.log("user already exists");
            return res.status(200).send({
                success: true,
                message: "user already exists",
                user,
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await userModel({
            name, email, password: hashedPassword, phone, address,
        });
        user.save()
        return res.status(201).send({
            sucess: true,
            message: "user created",
            user,
        })
    }
    catch (error) {
        send.status(500).send({
            success: false,
            message: "encoutered some error",
        })
    }
}