import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authJwtMiddleware } from "../middleware/authJwtMiddleware";

export const reparationsRouter = Router();

reparationsRouter.post("/", authJwtMiddleware, async (req, res) => {
	const { name, price, instrumentId } = req.body;
	try {
		const prisma = new PrismaClient();

		const reparation = await prisma.reparation.create({
			data: {
				name: name,
				price: price,
				instrument: {
					connect: { id: instrumentId },
				},
			},
		});
		res.status(201).json(reparation);
	} catch (error) {
		console.error("Error creating reparation:", error);
		res.status(500).json({ error: "Failed to create reparation." });
	}
});

reparationsRouter.delete("/:id", authJwtMiddleware, async (req, res) => {
	const id = req.params.id;
	try {
		const prisma = new PrismaClient();

		const reparation = await prisma.reparation.deleteMany({
			where: { id: parseInt(id) },
		});
		if (reparation.count === 0) {
			return res.status(404).json({ error: "Reparation not found." });
		}
		res.status(200).json({
			message: `reparation with id ${id} deleted.`,
			data: reparation,
		});
	} catch (error) {
		console.error(`Error deleting reparation with id: ${id}`, error);
		res.status(500).json({
			error: `Error deleting reparation with id: ${id}`,
		});
	}
});
