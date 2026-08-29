import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  createClient,
  updateClient,
  getClient,
  getClients,
  deleteClient,
} from "../controllers/client.controller";

const router = Router()

router.post("/createClient", isAuthenticated, createClient)
router.put("/updateClient/:id", isAuthenticated, updateClient);
router.get("/client/:id", isAuthenticated, getClient);
router.get("/getClients", isAuthenticated, getClients);
router.delete("/client/:id", isAuthenticated, deleteClient);

export default router