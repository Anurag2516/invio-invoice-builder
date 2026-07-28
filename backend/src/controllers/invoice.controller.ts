import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import { InvoiceInput, invoiceSchema } from "../schemas/invoice.schema";
import { Params } from "../types/params";

const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsedInvoice = invoiceSchema.safeParse(req.body);

    if (!parsedInvoice.success) {
      res.status(400).json({
        errors: parsedInvoice.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const invoice: InvoiceInput = parsedInvoice.data;
    const { lineItems, ...invoiceData } = invoice;

    const newInvoice = await prisma.invoice.create({
      data: {
        userId: req.user!.userId,
        ...invoiceData,
        lineItems: { create: lineItems },
      },
      omit: {
        userId: true,
        clientId: true,
      },
      include: {
        lineItems: {
          omit: {
            id: true,
            invoiceId: true,
          },
        },
        sender: {
          omit: {
            id: true,
            password: true,
            createdAt: true,
          },
        },
        client: {
          omit: { id: true, userId: true, createdAt: true, updatedAt: true },
        },
      },
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    next(error);
  }
};

const updateInvoice = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsedInvoice = invoiceSchema.safeParse(req.body);

    if (!parsedInvoice.success) {
      res.status(400).json({
        errors: parsedInvoice.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const invoice: InvoiceInput = parsedInvoice.data;
    const invoiceId = req.params.id;

    const exists = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!exists) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    const { lineItems, ...invoiceData } = invoice;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        userId: req.user!.userId,
        ...invoiceData,
        lineItems: {
          deleteMany: {},
          create: lineItems,
        },
      },
      omit: { userId: true, clientId: true },
      include: {
        lineItems: {
          omit: {
            id: true,
            invoiceId: true,
          },
        },
        sender: {
          omit: {
            id: true,
            password: true,
            createdAt: true,
          },
        },
        client: {
          omit: { id: true, userId: true, createdAt: true, updatedAt: true },
        },
      },
    });

    res.status(200).json(updatedInvoice);
  } catch (error) {
    next(error);
  }
};

const getInvoice = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const invoiceId = req.params.id;

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
      omit: {
        userId: true,
        clientId: true,
      },
      include: {
        lineItems: {
          omit: {
            id: true,
            invoiceId: true,
          },
        },
        sender: {
          omit: {
            id: true,
            password: true,
            createdAt: true,
          },
        },
        client: {
          omit: { id: true, userId: true, createdAt: true, updatedAt: true },
        },
      },
    });

    if (!invoice) {
      res.status(404).json({
        message: "Invoice not found",
      });
      return;
    }

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

const getInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const invoice = await prisma.invoice.findMany({
      omit: {
        userId: true,
        clientId: true,
      },
      include: {
        lineItems: {
          omit: {
            id: true,
            invoiceId: true,
          },
        },
        sender: {
          omit: {
            id: true,
            password: true,
            createdAt: true,
          },
        },
        client: {
          omit: { id: true, userId: true, createdAt: true, updatedAt: true },
        },
      },
    });

    if (!invoice) {
      res.status(404).json({
        message: "Invoices not found",
      });
      return;
    }

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const invoiceId = req.params.id;

    const invoiceExists = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

    if (!invoiceExists) {
      res.status(404).json({
        message: "Invoice not found",
      });
      return;
    }

    await prisma.invoice.delete({
      where: {
        id: invoiceId,
      },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export { createInvoice, updateInvoice, getInvoice, getInvoices, deleteInvoice };
