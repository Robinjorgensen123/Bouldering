import { Response } from "express";
import { User } from "../models/User.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const updateUserSettings = async (req: AuthRequest, res: Response) => {
  try {
    const { preferredGradeSystem } = req.body;

    if (!["font", "v-scale"].includes(preferredGradeSystem)) {
      return res.status(400).json({
        success: false,
        message: "Ogiltigt graderingssystem. Välj 'font' eller 'v-scale'.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      { preferredGradeSystem },
      { new: true }
    ).select("-passwordHash");

    res.json({
      success: true,
      message: "Inställningar uppdaterade",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kunde inte uppdatera inställningarna",
    });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-passwordHash");
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kunde inte hämta profil",
    });
  }
};
