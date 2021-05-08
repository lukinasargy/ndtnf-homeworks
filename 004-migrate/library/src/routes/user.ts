import express from "express";
const router = express.Router();

router.get("/login", (req:any, res:any) => {
    res.json({ id: 1, mail: "test@mail.ru" });
    res.status(201)
});
export const userRouter = router;