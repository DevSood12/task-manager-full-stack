import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ BONUS: /api/tasks/stats
router.get("/stats", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    high: tasks.filter((t) => t.priority === "High").length,
  };

  res.json(stats);
});

// GET /api/tasks (all tasks of logged-in user)
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks (create)
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id,
  });

  res.json(task);
});

// GET /api/tasks/:id
router.get("/:id", auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
});

// PUT /api/tasks/:id (update)
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Task not found" });

  res.json(updated);
});

// DELETE /api/tasks/:id
router.delete("/:id", auth, async (req, res) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!deleted) return res.status(404).json({ message: "Task not found" });

  res.json({ success: true });
});

export default router;
