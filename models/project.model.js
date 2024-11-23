import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  description: { type: String, required: true },
  objective: { type: String, required: true },
  scope: { type: String, required: true },
  deliverables: { type: [String], required: true },
  milestones: { type: Object, required: true },
  technologies: { type: Object, required: true },
  systemRequirements: { type: Object, required: true },
  developmentStage: { type: String, required: true },
  progress: { type: [String], required: true },
  skillsRequired: { type: [String], required: true },
  rolesAndResponsibilities: { type: Object, required: true },
  projectDuration: { type: String, required: true },
  keyDates: { type: Object, required: true },
  primaryContact: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    contact: { type: String, required: true },
  },
  communicationChannels: {
    email: { type: String, required: true },
    contact: { type: String, required: true },
  },
  demoLink: { type: String, required: false },
  tags: { type: Array, required: false },
});

export const Project = mongoose.model("Project", ProjectSchema);
