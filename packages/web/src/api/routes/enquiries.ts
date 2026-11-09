import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { and, eq } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import { enquiries as table } from "../database/schema";

const services = [
  "Flights",
  "Holidays",
  "Business travel",
  "Visa assistance",
  "Hotel bookings",
  "Car rentals",
  "Travel insurance",
] as const;
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(
    (v) => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v,
    "Enter a valid date",
  );
const inputSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z
      .email()
      .max(254)
      .transform((v) => v.toLowerCase().trim()),
    phone: z
      .string()
      .trim()
      .min(7)
      .max(25)
      .regex(/^[+\d\s()-]+$/, "Enter a valid phone number"),
    service: z.enum(services),
    origin: z.string().trim().min(2).max(100),
    destination: z.string().trim().min(2).max(100),
    departure: date.refine(
      (v) => v >= new Date().toISOString().slice(0, 10),
      "Choose today or a future date",
    ),
    returnDate: z.union([date, z.literal("")]).optional(),
    travellers: z.number().int().min(1).max(30),
    notes: z.string().trim().max(2000).default(""),
    consent: z.literal(true),
    website: z.string().max(0).default(""),
  })
  .refine((v) => !v.returnDate || v.returnDate >= v.departure, {
    message: "Return date must follow departure",
    path: ["returnDate"],
  });

// Per-instance abuse protection. Add edge-level protection before a public campaign.
const attempts = new Map<string, { count: number; until: number }>();
function limit(key: string, maximum: number) {
  const now = Date.now();
  if (attempts.size > 5000) for (const [k, v] of attempts) if (v.until < now) attempts.delete(k);
  const existing = attempts.get(key);
  const entry = existing && existing.until > now ? existing : { count: 0, until: now + 600_000 };
  entry.count += 1;
  attempts.set(key, entry);
  if (entry.count > maximum)
    throw new ORPCError("TOO_MANY_REQUESTS", {
      message: "Too many attempts. Please wait ten minutes or contact us directly.",
    });
}

export const enquiries = {
  create: base.input(inputSchema).handler(async ({ input }) => {
    limit(`create:${input.email}`, 5);
    const reference = `KT-${crypto.randomUUID().replaceAll("-", "").slice(0, 20).toUpperCase()}`;
    const createdAt = new Date().toISOString();
    const { consent: _consent, website: _website, ...data } = input;
    await db.insert(table).values({
      ...data,
      returnDate: input.returnDate || null,
      reference,
      createdAt,
      consentAt: createdAt,
      status: "received",
    });
    return { reference, createdAt, status: "received" as const };
  }),
  track: base
    .input(
      z.object({
        reference: z
          .string()
          .trim()
          .regex(/^KT-[A-F0-9]{20}$/i),
        email: z.email().transform((v) => v.toLowerCase().trim()),
      }),
    )
    .handler(async ({ input }) => {
      limit(`track:${input.email}`, 20);
      const [enquiry] = await db
        .select({ reference: table.reference, status: table.status, createdAt: table.createdAt })
        .from(table)
        .where(
          and(eq(table.reference, input.reference.toUpperCase()), eq(table.email, input.email)),
        )
        .limit(1);
      if (!enquiry)
        throw new ORPCError("NOT_FOUND", {
          message: "No matching enquiry. Check your reference and the email used to submit it.",
        });
      return enquiry;
    }),
};
