import { db } from "@/db/client";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const useTodos = () => {
  const addTodo = async (title: string) => {
    if (title.trim() === "") {
      return;
    }
    await db.insert(todos).values({
      title,
    });
  };

  const toggleTodo = async (id: number, currentDone: boolean) => {
    await db.update(todos).set({ done: !currentDone }).where(eq(todos.id, id));
  };

  const deleteTodo = async (id: number) => {
    await db.delete(todos).where(eq(todos.id, id));
  };

  const readAllTodos = async () => {
    return await db.select().from(todos);
  };

  const readOneTodo = async (id: number) => {
    return await db.select().from(todos).where(eq(todos.id, id));
  };

  return {
    addTodo,
    toggleTodo,
    deleteTodo,
    readAllTodos,
    readOneTodo,
  };
};
