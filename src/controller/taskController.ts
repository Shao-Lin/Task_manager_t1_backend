// src/controllers/taskController.ts
import type { Request, Response, NextFunction } from "express";
import * as svc from "../services/taskServices.js";
import {
  Category,
  Criteria,
  Priority,
  Search,
  Status,
} from "../models/Task.js";

/**
 * HTTP controllers → delegate to service, map result to JSON/HTTP codes.
 * All functions are sync wrappers; service layer is sync (in‑memory).
 * If you swap repo to async DB, simply make these async and await svc.*
 */

export const getAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    const criteria: Criteria = {
      status: req.query.status as Status,
      category: req.query.category as Category,
      priority: req.query.priority as Priority,
      search: req.query.search as Search,
    };
    const tasks = svc.getAllTasks(criteria);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = svc.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = svc.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = svc.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  try {
    svc.removeTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
