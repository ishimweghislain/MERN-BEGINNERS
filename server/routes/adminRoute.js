import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin
} from "../controller/adminController.js";

const router = express.Router();

// Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/admins", getAdmins);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

export default router;
