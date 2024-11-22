import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "../controlers/project.controler.js";

const router = express.Router();

// Route to create a new project
router.post("/projects", createProject);

// Route to get all projects
router.get("/projects", getAllProjects);

// Route to get a specific project by ID
router.get("/projects/:id", getProjectById);

// Route to update a specific project by ID
router.put("/projects/:id", updateProjectById);

// Route to delete a specific project by ID
router.delete("/projects/:id", deleteProjectById);

export default router;
