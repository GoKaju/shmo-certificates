import express, { query } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { GenerateInformedConsentByOrder } from "./controllers/generate-informed-consent-by-order";
// import { GenerateCertificateController } from "./controllers/generate-certificate";
// import { GetFileController } from "./controllers/get-file";
// import { GenerateMedicalHistoryController } from "./controllers/generate-medical-history";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// cors
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(morgan("combined"));

const port = process.env.PORT || 3000;

app.get("/api/health", (_, res) => {
  res.send("OK");
  res.end();
});

app.get("/api/informed-consent/:code/:orderId", async (req, res) => {
  console.log(
    "Received request to generate pdf of informed consent for order",
    req.params.orderId
  );

  const document = await new GenerateInformedConsentByOrder().execute({
    order: req.params.orderId,
    templateCode: req.params.code,
  });

  res.setHeader("Content-Disposition", `inline; filename=${document.name}`);
  res.setHeader("Content-Type", document.mimeType);
  res.send(document.data);

  res.end();
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
