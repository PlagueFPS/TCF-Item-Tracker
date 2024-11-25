import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

export const payloadInstance = async () => await getPayload({ config: payloadConfig })