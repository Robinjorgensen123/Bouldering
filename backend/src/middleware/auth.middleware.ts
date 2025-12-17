import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as TokenPayload;

      req.user = {
        id: decoded.id,
      };
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Ej auktoriserad, ogiltig token",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Ej auktoriserad, ingen token",
    });
  }
};
