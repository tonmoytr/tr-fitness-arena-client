// import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// export const { POST, GET } = toNextJsHandler(auth);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("tr_fitness_arena");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Dynamic User Custom Roles Schema Extension
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },
  // Default Database-Backed Session Configuration
  session: {
    expiresIn: 7 * 24 * 60 * 60, // Session duration: 7 days
    updateAge: 24 * 60 * 60, // Refresh session cookie timestamp daily
  },
});

export const { POST, GET } = toNextJsHandler(auth);
