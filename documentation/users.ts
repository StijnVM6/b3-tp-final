import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
	try {
		const users = await getUsers();
		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(404).json({ error: "Failed to fetch users." });
	}
});

usersRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const user = await getUserById(id);
		res.json({ message: `User with id: ${id} found.`, user });
	} catch (error) {
		console.error(`Error fetching user with id: ${id}`, error);
		res.status(404).json({
			error: `Failed to fetch user with id: ${id}`,
		});
	}
});

usersRouter.post("/", async (req, res) => {
	const { username, password, role } = req.body;
	try {
		const user = await createUsers(username, password, role);
		res.status(201).json(user);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Failed to create user." });
	}
});

usersRouter.put("/:id", async (req, res) => {
	const id = req.params.id;
	const { username, password, role } = req.body;
	try {
		const user = await updateUser(id, username, password, role);
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
		const user = await deleteUserById(id);
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
