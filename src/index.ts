import { NextFunction, Request, Response } from "express";
import { PORT } from "./config";
import cors from "cors";
import express from "express";
import sampleRouter from "./routes/sample.router";
import authRouter from "./routes/auth.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/samples", sampleRouter);
app.use("/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  res.status(400).send(err.message);
});
app.listen(PORT, () => {
  console.log(`Server rining onport :${PORT}`);
});
