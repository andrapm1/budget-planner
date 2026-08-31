const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body 

     if (!fullName || !email || !password) {
        return res.status(400).json({ messages: "Toate campurile sunt obligatorii" });
        }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email-ul  deja inregistrat" });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        res
            .status(500)
            .json({ message: "Am intampinat o eroare la inregistrare", error: err.message });
    }
};
   
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Toate campurile sunt obligatorii" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Email sau parola incorecta" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Am intampinat o eroare la autentificare", error: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilizatorul nu a fost gasit" });
        }
        res.status(200).json(user); 
    } catch (err) {
        res
            .status(500)
            .json({ message: "Am intampinat o eroare la preluarea informatiilor utilizatorului", error: err.message });
    }
};

exports.updateBudget = async (req, res) => {
    const { monthlyBudget } = req.body;

    if (monthlyBudget == null || monthlyBudget < 0) {
        return res.status(400).json({ message: "Bugetul trebuie sa fie o valoare pozitiva" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { monthlyBudget },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Utilizatorul nu a fost gasit" });
        }

        res.status(200).json(user);
    } catch (err) {
        res
            .status(500)
            .json({ message: "Am intampinat o eroare la actualizarea bugetului", error: err.message });
    }
};