import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  addClient,
  getClient,
  getClients,
  deleteClient,
} from "../controllers/client.controller";

const router = Router()

router.post("/addClient", isAuthenticated, addClient)
router.get("/client/:id", isAuthenticated, getClient);
router.get("/getClients", isAuthenticated, getClients);
router.delete("/client/:id", isAuthenticated, deleteClient);

export default router