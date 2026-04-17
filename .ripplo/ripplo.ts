import { config } from "dotenv";
import { createRipplo } from "@ripplo/testing";
import { z } from "zod";

config({ path: new URL(".env", import.meta.url), quiet: true });

const env = z
  .object({
    RIPPLO_WEBHOOK_SECRET: z.string().min(1, "RIPPLO_WEBHOOK_SECRET is required"),
  })
  .parse(process.env);

const ripplo = createRipplo({
  appUrl: "http://localhost:3000",
  preconditionsUrl: "http://localhost:3000/ripplo/preconditions",
  projectId: "cmo3eqse2004m0wticfeizk5v",
  webhookSecret: env.RIPPLO_WEBHOOK_SECRET,
});

export default ripplo;
