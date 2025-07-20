import { setupWorker } from 'https://esm.sh/msw@2.10.4/browser';
import { handlers } from "./handlers.js";

export const worker = setupWorker(...handlers);
