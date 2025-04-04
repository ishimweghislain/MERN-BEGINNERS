import Admin from "../model/adminModel.js";
import bcrypt from "bcryptjs";

// 📌 Register a New Admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully!", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// 📌 Login Admin
export const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({
        message: 'Login successful!',
        admin: { id: admin._id, email: admin.email },
      });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };

// 📌 Get All Admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, "email");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// 📌 Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const updatedFields = {};
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = await bcrypt.hash(password, 10);

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    res.status(200).json({ message: "Admin updated successfully!", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// 📌 Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
