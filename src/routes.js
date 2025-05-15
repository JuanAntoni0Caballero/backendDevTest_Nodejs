import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

export default router;
