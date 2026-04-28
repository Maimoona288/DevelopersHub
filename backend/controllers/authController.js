const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user._id, role: user.role, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 🔴 DEBUG 1: what is coming from frontend
//     console.log("EMAIL RECEIVED:", email);
//     console.log("PASSWORD RECEIVED:", password);

//     const user = await User.findOne({ email });

//     // 🔴 DEBUG 2: DB result
//     console.log("USER FOUND:", user);

//     if (!user) {
//       console.log("USER NOT FOUND");
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     // 🔴 DEBUG 3: password match result
//     console.log("PASSWORD MATCH:", isMatch);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         role: user.role,
//         email: user.email,
//       },
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };