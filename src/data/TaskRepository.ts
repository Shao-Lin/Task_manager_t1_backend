// src/data/taskRepository.ts
import { Criteria, Task } from "../models/Task.js";
import { v4 as uuid } from "uuid";

/**
 * In‑memory task storage implemented via
 * module‑level closure + pure accessor functions.
 */

const tasks: Task[] = [
  {
    id: "1",
    title: "Задача номер 1",
    description:
      "Описание задачи таково,какаво никакаво иначе,а может и такава",
    category: "Documentation",
    status: "Done",
    priority: "High",
    date: "Jun 10 2014",
  },
  {
    id: "2",
    title: "Задача номер 1",
    description:
      "Описание задачи таково,какаво никакаво иначе,а может и такава",
    category: "Documentation",
    status: "In Progress",
    priority: "High",
    date: "Jun 10 2014",
  },
  {
    id: "3",
    title: "Задача номер 1",
    description:
      "Описание задачи таково,какаво никакаво иначе,а может и такава",
    category: "Documentation",
    status: "To Do",
    priority: "Low",
    date: "Jun 10 2014",
  },
];

export const passesSearch = (task: Task, query?: string): boolean => {
  if (!query) return true;
  const q = query.toLowerCase();

  const inTitle = task.title.toLowerCase().includes(q);
  const inDesc = task.description
    ? task.description.toLowerCase().includes(q)
    : false; // ← нет описания — нет совпадения

  return inTitle || inDesc;
};

export const getAll = (c: Criteria): Task[] =>
  tasks.filter(
    (item) =>
      (!c.category || item.category === c.category) &&
      (!c.priority || item.priority === c.priority) &&
      (!c.status || item.status === c.status) && // ★ здесь "===", не "!=="
      passesSearch(item, c.search)
  );

export const getById = (id: string): Task | undefined =>
  tasks.find((t) => t.id === id);

export const create = (data: Omit<Task, "id">): Task => {
  const task: Task = {
    id: uuid(),
    ...data,
  };
  tasks.unshift(task);
  return task;
};

export const update = (id: string, delta: Partial<Task>): Task | undefined => {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  tasks[idx] = { ...tasks[idx], ...delta };
  return tasks[idx];
};

export const remove = (id: string): boolean => {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
};
