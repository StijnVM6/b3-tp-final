import cors from "cors";
import "dotenv/config";
import express from "express";

// importing routers
import { instrumentsRouter } from "./router/instruments";
import { usersRouter } from "./router/users";
import { loginRouter } from "./router/login";
import { reparationsRouter } from "./router/reparations";

// CREATE EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
const router = express.Router();
app.use("", router);
app.use("/instruments", instrumentsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/reparations", reparationsRouter);

app.use("/bananas/", (req, res) => {
	const color = req.query.couleur;
	if (color) {
		if (color === "jaune") {
			const object = { couleur: color, prix: 2.5 };
			res.status(200).json(object);
		} else {
			const object = { couleur: null, prix: 0.1 };
			res.status(202).json(object);
		}
	} else {
		const object = { couleur: null, prix: 0.1 };
		res.status(202).json(object);
	}
});

// START SERVER
app.listen(process.env.PORT, () => {
	console.log(
		`Chuis un débile-boulet-de-con-de-sa-mère, écoute Thomas iNtEnSéMeNt sur port: ${process.env.PORT}!`
	);
});
