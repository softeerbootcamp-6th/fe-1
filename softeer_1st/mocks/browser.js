import { setupWorker } from '../node_modules/msw/lib/browser/index.js';
import { handlers } from "./handlers.js";

export const worker = setupWorker(...handlers);
