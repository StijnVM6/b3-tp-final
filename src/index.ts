import cors from "cors";
import "dotenv/config";
import express from "express";

// importing routers
import { instrumentsRouter } from "./router/instruments";

// CREATE EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
const router = express.Router();
app.use("", router);
router.use("/instruments", instrumentsRouter);

// START SERVER
app.listen(process.env.PORT, () => {
	console.log(
		`Chuis un débile-boulet-de-con-de-sa-mère, écoute Thomas iNtEnSéMeNt sur port: ${process.env.PORT}!`
	);
});
