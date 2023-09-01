import { hashPassword, comparePassword } from "../helpers/authhelper.js";
import orderModel from "../models/orderModel.js";
import users from "../models/userModels.js"
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "praveshkumar1062002@gmail.com",
        pass: "yqdiibfirtxndqnb"
    }
})

export const registerController = async (req, res) => {
    try {
        //    console.log("here we called" )
        const { name, email, password, phone, address } = req.body;
        const userfind = await users.findOne({ email: email });
        if (!userfind) {
            const hashedpassword = await hashPassword(password);
            const userdata = new users({ name, email, password: hashedpassword, phone, address })
            await userdata.save();
            // console.log("user registerd succefully");
            return res.status(201).send({
                status: 201,
                success: true,
                message: "User register successfully",
                userdata
            })
        }
        else {
            return res.status(200).send({
                success: false,
                message: "Given email already exists"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error
        })
    }
}
export const updateProfileController = async (req, res) => {
    try {
        // console.log("is there any error ");
        const { name, phone, address } = req.body;
        const Data = await users.findById(req.user._id);
        const user = await users.findByIdAndUpdate({ _id: Data._id }, {
            name: name || Data.name,
            phone: phone || Data.phone,
            address: address || Data.address
        }, { new: true });
        res.status(200).send({
            success: true,
            user
        })
    } catch (error) {

        console.log(error, "brohter some error");
        res.status(401).send({
            success: false,
            error,
            message: "some thing error in updating profile"
        })
    }
}
export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email: email });
        if (!user) {
            return res.status(401).send({ message: "this email id is not registered", success: false });
        }
        else {
            const role = user.role;
            const match = await comparePassword(user.password, password);
            if (match) {
                const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.status(200).send({ status: 200, message: "user login successfully", user, token, role });
            }
            else {
                return res.status(500).send({ message: "password is not matching" });
            }
        }

    } catch (error) {
        res.status(404).send({ error, message: "login error" });
    }
}

export const passwordreset = async (req, res) => {
    try {
        const { email } = req.body;
        const userFind = await users.findOne({ email });

        if (!userFind) {
            return res.status(404).send({ status: 404, message: "Email does not exist" });
        } else {
            const token = jwt.sign({ _id: userFind._id }, process.env.JWT_SECRET, { expiresIn: 300 });
            const setusertoken = await users.findByIdAndUpdate(
                userFind._id,
                { token: token },
                { new: true }
            );

            if (setusertoken) {
                sendPasswordResetEmail(email, userFind._id, token); // Separate function for sending emails
                return res.status(201).send({ status: 201, message: "Email sent successfully" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Something went wrong" });
    }
};

// Separate function to send password reset email
function sendPasswordResetEmail(email, userId, token) {
    const mailOptions = {
        from: "praveshkumar1062002@gmail.com",
        to: email,
        subject: "Sending Email for Password Reset",
        text: `This Link is valid for 5 minutes only: https://pink-tasty-lion.cyclic.app/Forgotpassword/${userId}/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}


export const testController = (req, res) => {

    try {
        res.send("protected routes");
    } catch (error) {
        res.send(error);
    }

}
export const updatepasswordController = async (req, res) => {

    try {
        const { id, token } = req.params;
        const validUser = await users.findOne({ _id: id });

        if (validUser) {
            const verification = jwt.verify(token, process.env.JWT_SECRET);
            if (verification) {
                const { password } = req.body;
                const hashedpassword = await hashPassword(password);
                const result = await users.findByIdAndUpdate({ _id: id }, { password: hashedpassword }, { new: true });

                return res.status(201).send({ status: 201, message: "yep your password is upadted" });
            }
            else {
                return res.status(404).send({ status: 205, message: "link is expired" });
            }

        }

    } catch (error) {

        console.log(error)
        res.status(404).send({ error, message: "something is  error " });
    }
}

//orders 
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
        res.json(orders);
        // res.status(200).send({
        //     orders
        // })


    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "error in fetching orders",
            error
        })

    }
}
export const getAllOrdersController = async (req, res) => {
    try {
        const allOrders = await orderModel.find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" })
        res.json(allOrders);

    } catch (error) {
        console.log(error);
        res.json(error)

    }
}

export const orderStatusController = async (req, res) => {
    //  console.log("bhai yha koi hai kya")

    try {
        const { orderId } = req.params;
        //    console.log(orderId);
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })

        res.status(200).send({
            success: true,
            orders
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error during status updation ",
            error
        })
    }
}