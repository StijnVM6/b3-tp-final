import { Router } from "express";

export const instrumentsRouter = Router();

instrumentsRouter.get("/", async (req, res) => {
	try {
		// const instruments = await getinstruments();
		res.json(instruments);
	} catch (error) {
		console.error("Error fetching instruments:", error);
		res.status(404).json({ error: "Failed to fetch instruments." });
	}
});

instrumentsRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		// const instrument = await getinstrumentById(id);
		res.json({ message: `instrument with id: ${id} found.`, instrument });
	} catch (error) {
		console.error(`Error fetching instrument with id: ${id}`, error);
		res.status(404).json({
			error: `Failed to fetch instrument with id: ${id}`,
		});
	}
});

instrumentsRouter.post("/", async (req, res) => {
	const { firstName, lastName, classId } = req.body;
	try {
		// const instrument = await createinstruments(firstName, lastName, classId);
		res.status(201).json(instrument);
	} catch (error) {
		console.error("Error creating instrument:", error);
		res.status(500).json({ error: "Failed to create instrument." });
	}
});

instrumentsRouter.put("/:id", async (req, res) => {
	const id = req.params.id;
	const { firstName, lastName, classId } = req.body;
	try {
		// const instrument = await updateinstrument(id, firstName, lastName, classId);
		res.status(200).json({
			message: "instrument updated",
			data: instrument,
		});
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
		// const instrument = await deleteinstrumentById(id);
		res.status(200).json({
			message: `instrument with id ${id} deleted.`,
			data: instrument,
		});
	} catch (error) {
		console.error(`Error deleting instrument with id: ${id}`, error);
		res.status(500).json({
			error: `Error deleting instrument with id: ${id}`,
		});
	}
});
