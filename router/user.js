import express from "express";
import {
  verifyTokenandAdmin,
  verifyTokenandAuthorization,
} from "../middleware/tokenVer.js";
import { User } from "../models/users.js";
const router = express.Router();

router.put("/:id", verifyTokenandAuthorization, async (req, res) => {
  if (req.body.password) {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete method
router.delete("/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user
router.get("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all user
router.get("/", verifyTokenandAdmin, async (req, res) => {
  const query = req.query;
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user stats
router.get("/stats", verifyTokenandAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const userRoute = router;
