// import { expoDb } from "@/db/client";
import { Stack } from "expo-router";

export default function RootLayout() {
  // expoDb.execSync(`
  //   CREATE TABLE IF NOT EXISTS todos (
  //     id INTEGER PRIMARY KEY AUTOINCREMETN,
  //     title TEXT NOT NULL,
  //     done INTEGE NOT NULL DEFAULT 0
  //   )
  // `)
  return <Stack />;
}
