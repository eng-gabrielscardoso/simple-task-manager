import { TaskStatus } from "@/interfaces/task";
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, 'The title must have at least 3 characters').max(120, 'The title must have at most 120 characters'),
  description: z.string().min(3, 'The title must have at least 3 characters').max(120, 'The title must have at most 120 characters').optional(),
  status: z.nativeEnum(TaskStatus).optional(),
})

export const updateTaskSchema = z.object({
  id: z.number(),
  title: z.string().min(3, 'The title must have at least 3 characters').max(120, 'The title must have at most 120 characters').optional(),
  description: z.string().min(3, 'The title must have at least 3 characters').max(120, 'The title must have at most 120 characters').optional(),
  status: z.nativeEnum(TaskStatus).optional(),
})
