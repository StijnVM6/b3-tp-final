import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authJwtMiddleware } from "../middleware/authJwtMiddleware";

export const instrumentsRouter = Router();

instrumentsRouter.get("/", async (req, res) => {
	try {
		const prisma = new PrismaClient();
		const instruments = await prisma.instrument.findMany();

		if (instruments.length === 0) {
			return res.status(404).json({ error: "No instruments found." });
		} else {
			res.status(200).json(instruments);
		}
	} catch (error) {
		console.error("Error fetching instruments:", error);
		res.status(404).json({ error: "Failed to fetch instruments." });
	}
});

instrumentsRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const prisma = new PrismaClient();
		const instrument = await prisma.instrument.findUnique({
			where: { id: parseInt(id) },
		});
		if (!instrument) {
			return res
				.status(404)
				.json({ error: `No instrument with id: ${id} found.` });
		} else {
			res.status(200).json({
				message: `instrument with id: ${id} found.`,
				instrument,
			});
		}
	} catch (error) {
		console.error(`Error fetching instrument with id: ${id}`, error);
		res.status(404).json({
			error: `Failed to fetch instrument with id: ${id}`,
		});
	}
});

instrumentsRouter.post("/", authJwtMiddleware, async (req, res) => {
	const { name, weight, color, price } = req.body;
	try {
		const prisma = new PrismaClient();

		const instrument = await prisma.instrument.create({
			data: {
				name: name,
				weight: weight,
				color: color,
				price: price,
			},
		});
		res.status(201).json(instrument);
	} catch (error) {
		console.error("Error creating instrument:", error);
		res.status(500).json({ error: "Failed to create instrument." });
	}
});

instrumentsRouter.put("/:id", async (req, res) => {
	const id = req.params.id;
	const { name, weight, color, price } = req.body;
	try {
		const prisma = new PrismaClient();
		const instrument = await prisma.instrument.updateMany({
			where: { id: parseInt(id) },
			data: {
				name: name,
				weight: weight,
				color: color,
				price: price,
			},
		});
		if (instrument.count === 0) {
			return res
				.status(404)
				.json({ error: `No instrument with id: ${id} found.` });
		} else {
			res.status(200).json({ message: "instrument updated" });
		}
	} catch (error) {
		console.error(`Error updating instrument with id: ${id}`, error);
		res.status(500).json({
			error: `Error updating instrument with id: ${id}`,
		});
	}
});

instrumentsRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const prisma = new PrismaClient();
		const instrument = await prisma.instrument.deleteMany({
			where: { id: parseInt(id) },
		});

		if (instrument.count === 0) {
			return res.status(404).json({
				error: `No instrument with id: ${id} found.`,
				instrument,
			});
		} else {
			res.status(200).json({
				message: `instrument with id ${id} deleted.`,
				data: instrument,
			});
		}
	} catch (error) {
		console.error(`Error deleting instrument with id: ${id}`, error);
		res.status(500).json({
			error: `Error deleting instrument with id: ${id}`,
		});
	}
});
