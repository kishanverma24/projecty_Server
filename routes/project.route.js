import express from "express";
import {
  createProject,
  getAllProjects,
  deleteProjectById,
  getProjectByProjectId,
  getProjectByProjectTitle,
  updateProjectByProjectId,
} from "../controlers/project.controler.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
// Crud on projects ---> "/api/project"
// Route to create a new project
router.post("/", verifyToken, createProject);

// Route to get all projects
router.get("/projects", getAllProjects);

// Route to get a specific project by projectID
router.get("/:projectid", getProjectByProjectId);

// Route to get a specific project by projectTitle
router.get("/title/:title", getProjectByProjectTitle);

// Route to update a specific project by projectID
router.put("/:projectid", verifyToken, updateProjectByProjectId);

// Route to delete a specific project by projectID
router.delete("/:projectid", verifyToken, deleteProjectById);

export default router;
