// src/models/Task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  category: Category;
  status: Status;
  priority: Priority;
}

export type Category =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";
export type Status = "To Do" | "In Progress" | "Done";
export type Priority = "Low" | "Medium" | "High";

export type Search = string | undefined;
export interface Criteria {
  status?: Status;
  category?: Category;
  priority?: Priority;
  search?: string; // строка или undefined
}
