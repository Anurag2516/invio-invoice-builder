import { NextFunction, Request, Response } from "express";
import {
  ClientInput,
  clientSchema,
  UpdateClientInput,
  updateClientSchema,
} from "../schemas/client.schema";
import { prisma } from "../config/db";
import { Params } from "../types/params";

const createClient = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsedClient = clientSchema.safeParse(req.body);

    if (!parsedClient.success) {
      res.status(400).json({
        errors: parsedClient.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const clientData: ClientInput = parsedClient.data;

    const addClient = await prisma.client.create({
      data: {
        userId: req.user.userId,
        ...clientData,
      },
    });

    res.status(201).json(addClient);
  } catch (error) {
    next(error);
  }
};

const updateClient = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsedClient = updateClientSchema.safeParse(req.body);

    if (!parsedClient.success) {
      res.status(400).json({
        errors: parsedClient.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const clientData: UpdateClientInput = parsedClient.data;

    const clientId = req.params.id;

    const updatedClient = await prisma.client.update({
      where: {
        userId: req.user.userId,
        id: clientId,
      },
      data: {
        ...clientData,
      },
    });

    res.status(201).json(updatedClient);
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
        userId: req.user.userId,
      },
      omit: {
        userId: true,
      },
    });

    if (!client) {
      res.status(404).json({
        message: "Client not found",
      });
      return;
    }

    res.status(200).json(client);
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
    const search = req.query.search as string | undefined;

    const clients = await prisma.client.findMany({
      where: {
        userId: req.user.userId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      omit: { userId: true },
    });

    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
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
        userId: req.user.userId,
      },
    });

    if (!clientExists) {
      res.status(404).json({
        message: "Client not found",
      });
      return;
    }

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export { createClient, updateClient, getClient, getClients, deleteClient };
