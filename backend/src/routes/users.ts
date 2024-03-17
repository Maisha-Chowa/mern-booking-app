import { Request, Response, Router } from "express";
import User from "../models/users";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = Router();
router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          message: "User Already Exist",
        });
      }

      user = await new User(req.body).save();
      // json web token
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({
        message: "User Registered Ok",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Something Went Wrong",
      });
    }
  }
);

export default router;
