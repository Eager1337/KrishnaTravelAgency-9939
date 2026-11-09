import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("travel_enquiries", {
  reference: text("reference").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departure: text("departure").notNull(),
  returnDate: text("return_date"),
  travellers: integer("travellers").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("received"),
  createdAt: text("created_at").notNull(),
  consentAt: text("consent_at").notNull(),
});
