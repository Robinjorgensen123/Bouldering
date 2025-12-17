import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "E-postadressen används redan",
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      passwordHash: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Användare skapad",
    });
  } catch (error) {
    console.error("Registreringsfel:", error);
    res.status(500).json({
      message: "Serverfel",
    });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Fel e-post eller lösenord"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                sucess: false,
                message: "Fel e-post eller lösenord"
            })
        }
    }
}
