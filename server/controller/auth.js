const authModel = require("../model/auth")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");



// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: 'kunalpipaliya67@gmail.com',
        pass: 'pzvbwwzylwuenzfo',
    }, tls: {
        // This is the fix for the self-signed certificate error
        rejectUnauthorized: false
    }
});

const sendMail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: 'kunalpipaliya67@gmail.com', // sender address
            to: email, // list of recipients
            subject: "Hello", // subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello, ${email} this mail is sent using nodemailer</b>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

exports.viewUsers = async (req, res) => {
    try {
        const data = await authModel.find()
        res.status(200).json({
            status: "success",
            message: "Data Found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const data = req.body
        data.profile=req.file.filename
        data.password = await bcrypt.hash(data.password, 10)
        const user = await authModel.create(data)
        sendMail(user.email).catch(err => console.log(err))
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = await authModel.findByIdAndDelete(id)
        res.status(200).json({
            status: "Success",
            message: "User deleted successfully",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const update = await authModel.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json({
            status: "Success",
            message: "User details updated succcessfully",
            data: update
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authModel.findOne({ email });

        if (!user) {
            // CRITICAL: You must use 'return' so the code stops here
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // If you forget this line, the frontend waits forever
            return res.status(200).json({ status: "success", data: user });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        // If an error happens here and you don't send a response, it stays silent
        return res.status(500).json({ message: error.message });
    }
};