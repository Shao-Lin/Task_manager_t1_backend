import {
  Category,
  Criteria,
  Priority,
  Search,
  Status,
  Task,
} from "../models/Task.js";
import * as repo from "../data/TaskRepository.js";

/**
 * Thin service layer with pure functions;
 * throws errors for exceptional cases.
 */

export const getAllTasks = (criterias: Criteria) => {
  return repo.getAll(criterias);
};

export const getTaskById = (id: string) => {
  const task = repo.getById(id);
  if (!task) throw new Error("Task not found");
  return task;
};

export const createTask = (dto: Omit<Task, "id">) => {
  if (!dto.title?.trim()) {
    throw new Error("Title is required");
  }
  return repo.create(dto);
};

export const updateTask = (id: string, dto: Partial<Task>) => {
  const updated = repo.update(id, dto);
  if (!updated) throw new Error("Task not found");
  return updated;
};

export const removeTask = (id: string) => {
  const ok = repo.remove(id);
  if (!ok) throw new Error("Task not found");
};
