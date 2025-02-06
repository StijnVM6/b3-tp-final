import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

export const authJwtMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.headers.authorization?.split(" ")[0] !== "Bearer") {
		return res
			.status(401)
			.json({ message: `You are not authorized. Bearer token missing.` });
	}

	const token = req.headers.authorization?.split(" ")[1];
	// console.log("token is: ", token);

	if (!token) {
		return res
			.status(401)
			.json({ message: `You are not authorized. Token missing.` });
	}

	const secretKey = process.env.JWT_SECRET!;

	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				message: `You are not authorized. Invalid token.`,
			});
		} else {
			next();
		}
	});
};
