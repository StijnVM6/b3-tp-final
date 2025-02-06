import { Router } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const loginRouter = Router();

const prisma = new PrismaClient();

loginRouter.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await prisma.user.findFirst({ where: { username } });
		if (!user)
			return res
				.status(401)
				.json({ message: `Incorrect login credentials.` });

		const passwordCheck = await bcrypt.compare(password, user.password);

		if (!passwordCheck)
			return res
				.status(401)
				.json({ message: `Incorrect login credentials.` });

		const secretKey = process.env.JWT_SECRET!;
		const token = jwt.sign({ userId: user.id }, secretKey);
		const tokenObject = { token: token };

		if (!token) {
			res.status(401).json({
				message: `Incorrect login credentials.`,
			});
		} else {
			res.status(200)
				.json({ message: "Login successful." })
				.json(tokenObject);
		}
	} catch (err) {
		res.status(500).json({ message: `Error logging in: ${err}` });
	}
});
