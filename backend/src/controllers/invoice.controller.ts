import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import {
  AutoSaveInput,
  autoSaveSchema,
  CreateDraftInput,
  createDraftSchema,
  InvoiceInput,
  invoiceSchema,
} from "../schemas/invoice.schema";
import { Params } from "../types/params";

export async function getNextInvoiceNumber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const lastInvoice = await prisma.invoice.findFirst({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: "desc" },
      select: { invoiceNumber: true },
    });

    let nextNumber = "INV-001";

    if (lastInvoice) {
      const last = parseInt(lastInvoice.invoiceNumber.split("-")[1]);
      nextNumber = `INV-${String(last + 1).padStart(3, "0")}`;
    }

    res.status(200).json(nextNumber);
  } catch (error) {
    next(error);
  }
}

const createDraftInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      omit: {
        id: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const parsed = createDraftSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        errors: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const invoice: CreateDraftInput = parsed.data;
    const { invoiceNumber } = invoice;

    const newInvoice = await prisma.invoice.create({
      data: {
        userId: req.user!.userId,
        invoiceNumber,
        status: "Draft",
        senderName: user?.name,
        senderEmail: user?.email,
        senderCompany: user?.companyName,
        senderAddress: user?.address,
        senderPhone: user?.phone,
        senderWebsite: user?.website,
        accountHolderName: user?.accountHolderName,
        accountNumber: user?.accountNumber,
        bankName: user?.bankName,
      },
      select: {
        id: true,
      },
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    next(error);
  }
};

const autoSaveInvoice = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const parsed = autoSaveSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        errors: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }
    const { lineItems, ...invoiceData }: AutoSaveInput = parsed.data;
    const invoiceId = req.params.id;

    const invoiceExists = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoiceExists) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        ...invoiceData,
        ...(lineItems && {
          lineItems: {
            deleteMany: {},
            create: lineItems,
          },
        }),
      },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const saveInvoice = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
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
    const { lineItems, ...invoice }: InvoiceInput = parsedInvoice.data;
    const invoiceId = req.params.id;

    const invoiceExists = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

    if (!invoiceExists) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    if (invoiceExists.status !== "Draft") {
      res.status(403).json({ message: "Only draft invoices can be edited" });
    }

    const savedInvoice = await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        ...invoice,
        lineItems: {
          deleteMany: {},
          create: lineItems,
        },
      },
      include: {
        lineItems: { omit: { invoiceId: true } },
      },
      omit: {
        userId: true,
      },
    });

    res.status(200).json(savedInvoice);
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
      },
      include: {
        lineItems: {
          omit: {
            invoiceId: true,
          },
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
    const user = req.user;
    const invoice = await prisma.invoice.findMany({
      where: {
        userId: user.userId,
      },
      omit: {
        userId: true,
      },
      include: {
        lineItems: {
          omit: {
            invoiceId: true,
          },
        },
      },
    });

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

export {
  createDraftInvoice,
  autoSaveInvoice,
  saveInvoice,
  getInvoice,
  getInvoices,
  deleteInvoice,
};
