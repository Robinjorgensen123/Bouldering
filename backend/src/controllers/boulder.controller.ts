import { Response } from "express";
import { Boulder, IBoulder } from "../models/Boulder.js";
import { User } from "../models/User.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { getDisplayGrade } from "../utils/gradeConverter.js";

export const createBoulder = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, grade, location, imageUrl, annotations } =
      req.body;

    const newBoulder = new Boulder({
      title,
      description,
      grade,
      location,
      imageUrl,
      annotations,
      creator: req.user?.id,
    });

    await newBoulder.save();
    res.status(201).json({ success: true, data: newBoulder });
  } catch (error) {
    console.error("Fel vid skapande av boulder:", error);
    res.status(500).json({ success: false, message: "Kunde inte spara led" });
  }
};

export const getAllBoulders = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    const userPref = user?.preferredGradeSystem || "font";

    const boulders = await Boulder.find().populate("creator", "email");

    const formattedBoulders = boulders.map((boulder) => {
      const b = boulder.toObject() as IBoulder;

      b.displayGrade = getDisplayGrade(b.grade.value, b.grade.system, userPref);
      return b;
    });
    res.json({ success: true, data: formattedBoulders });
  } catch (error) {
    console.error("Fel vid hämtning av boulders:", error);
    res.status(500).json({ success: false, message: "Kunde inte hämta leder" });
  }
};

export const getBoulderById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const boulder = await Boulder.findById(id);

    if (!boulder) {
      return res
        .status(404)
        .json({ success: false, message: "Bouldern hittades inte" });
    }
    const user = await User.findById(req.user?.id);
    const userPref = user?.preferredGradeSystem || "font";

    const b = boulder.toObject() as IBoulder;
    b.displayGrade = getDisplayGrade(b.grade.value, b.grade.system, userPref);

    res.json({ success: true, data: b });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Serverfel vid hämtning av boulder" });
  }
};
