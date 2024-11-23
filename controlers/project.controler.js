import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
// CREATE a new project
export const createProject = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) return next(createError(404, "User not found!"));
    const project = new Project({ ...req.body, userName: user.userName });
    await project.save();
    res
      .status(201)
      .json({ message: "Project created successfully", newProject: project });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create project", error: error.message });
  }
};

// GET All Projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects: projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};

// GET Single Project by ProjectID
export const getProjectByProjectId = async (req, res) => {
  try {
    const { projectid } = req.params;
    const project = await Project.findById(projectid);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch project", error: error.message });
  }
};
// GET Single Project by ProjectTitle
export const getProjectByProjectTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const searchedProject = await Project.find({ title: title });
    if (!searchedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(searchedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch project", error: error.message });
  }
};

// UPDATE Project by ProjectID
export const updateProjectByProjectId = async (req, res) => {
  try {
    const { projectid } = req.params;
    const user = await User.findById(req.userId);
    const project = await Project.findById(projectid);

    if (!user) return next(createError(404, "User not found!"));
    if (!(user.userName == project.userName))
      return next(createError(404, "Not authenticated to update!"));
    const updatedProject = await Project.findByIdAndUpdate(
      projectid,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update project", error: error.message });
  }
};

// DELETE Project by ProjectID
export const deleteProjectById = async (req, res) => {
  try {
    const { projectid } = req.params;
    const user = await User.findById(req.userId);
    const project = await Project.findById(projectid);

    if (!user) return next(createError(404, "User not found!"));
    if (!(user.userName == project.userName))
      return next(createError(404, "Not authenticated to delete!"));
    const deletedProject = await Project.findByIdAndDelete(projectid);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete project", error: error.message });
  }
};
