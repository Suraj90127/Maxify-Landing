import express from "express"
import { contactForm } from "../controller/ContactController.js"
const router = express.Router()

router.post("/contact", contactForm)

export default router