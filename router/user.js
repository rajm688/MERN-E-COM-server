import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("from userRoute");
});
router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send({ username, password });
});
export const userRoute = router;
