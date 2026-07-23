import { NextFunction, Request, Response } from "express";
import { ClientInput, clientSchema } from "../schemas/client.schema";
import { prisma } from "../config/db";
import { Params } from "../types/params";

const addClient = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsedClient = clientSchema.safeParse(req.body.client);

    if (!parsedClient.success) {
      res.status(400).json({
        success: false,
        message: "Invalid Profile Details",
        errors: parsedClient.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const client: ClientInput = parsedClient.data;

    const { email, ...updatableFields } = client;

    const addClient = await prisma.client.upsert({
      where: {
        userId_email: { userId: req.user.userId, email: client.email },
      },
      update: { ...updatableFields },
      create: { userId: req.user.userId, ...client },
    });

    res.status(200).json({
      success: true,
      message: "Client added successfully",
      data: addClient,
    });
  } catch (error) {
    next(error);
  }
};

const getClient = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const clientId = req.params.id;

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
      omit: {
        userId: true,
      },
    });

    if (!client) {
      res.status(404).json({
        success: false,
        message: "Client not found",
      });
      return;
    }

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

const getClients = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const clients = await prisma.client.findMany({
      omit: {
        userId: true,
      },
    });

    if (!clients) {
      res.status(404).json({
        success: false,
        message: "Clients not found",
      });
      return;
    }

    res.status(200).json({ success: true, data: clients });
  } catch (error) {}
};

const deleteClient = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const clientId = req.params.id;

    const clientExists = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!clientExists) {
      res.status(404).json({
        success: false,
        message: "Client not found",
      });
      return;
    }

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { addClient, getClient, getClients, deleteClient };
