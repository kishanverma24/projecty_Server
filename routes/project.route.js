import express from "express";
import {
  createProject,
  getAllProjects,
  deleteProjectById,
  getProjectByProjectId,
  getProjectByProjectTitle,
  updateProjectByProjectId,
  getAllProjectsOfUsername,
} from "../controlers/project.controler.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
// Crud on projects ---> "/api/project"
// Route to create a new project
router.post("/", verifyToken, createProject); // create project

// Route to get all projects
router.get("/projects", getAllProjects); // get all project

// Route to get all project of given username
router.get("/projects/profileprojects/:username", getAllProjectsOfUsername); // get all project

// Route to get a specific project by projectID
router.get("/:projectid", getProjectByProjectId); // get project by project id

// Route to get a specific project by projectTitle
router.get("/title/:title", getProjectByProjectTitle); // get project by title

// Route to update a specific project by projectID
router.put("/:projectid", verifyToken, updateProjectByProjectId); // update project by project id

// Route to delete a specific project by projectID
router.delete("/:projectid", verifyToken, deleteProjectById); // delete project by project id

export default router;
