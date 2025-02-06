import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
	try {
		const prisma = new PrismaClient();
		const users = await prisma.user.findMany();
		res.json(users).status(200);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(404).json({ error: "Failed to fetch users." });
	}
});

usersRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const prisma = new PrismaClient();
		const user = await prisma.user.findUnique({
			where: { id: parseInt(id) },
		});
		res.json({ message: `User with id: ${id} found.`, user }).status(200);
	} catch (error) {
		console.error(`Error fetching user with id: ${id}`, error);
		res.status(404).json({
			error: `Failed to fetch user with id: ${id}`,
		});
	}
});

usersRouter.post("/", async (req, res) => {
	const { username, password } = req.body;
	try {
		const prisma = new PrismaClient();

		const saltRounds = parseInt(process.env.SALT_ROUNDS!);
		const hash = await bcrypt.hash(password, saltRounds);

		const user = await prisma.user.create({
			data: {
				username: username,
				password: hash,
			},
		});
		res.status(201).json(user);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Failed to create user." });
	}
});

usersRouter.put("/:id", async (req, res) => {
	const id = req.params.id;
	const { username, password } = req.body;
	try {
		const prisma = new PrismaClient();
		const user = await prisma.user.updateMany({
			where: { id: parseInt(id) },
			data: {
				username: username,
				password: password,
			},
		});
		res.status(200).json({ message: "User updated", data: user });
	} catch (error) {
		console.error(`Error updating user with id: ${id}`, error);
		res.status(500).json({
			error: `Error updating user with id: ${id}`,
		});
	}
});

usersRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const prisma = new PrismaClient();
		const user = await prisma.user.deleteMany({
			where: { id: parseInt(id) },
		});
		res.status(200).json({
			message: `User with id ${id} deleted.`,
			data: user,
		});
	} catch (error) {
		console.error(`Error deleting user with id: ${id}`, error);
		res.status(500).json({
			error: `Error deleting user with id: ${id}`,
		});
	}
});
