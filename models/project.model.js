import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userName: { type: String, required: true }, // Added by the controller
  title: { type: String, required: true, unique: true }, // Matches the title field in the example
  overview: { type: String, required: true }, // Matches the overview field in the example
  description: { type: String, required: true }, // Matches the description field in the example
  objective: { type: String, required: true }, // Matches the objective field in the example
  scope: { type: String, required: true }, // Matches the scope field in the example
  deliverables: { type: [String], required: true }, // Matches the array of deliverables
  milestones: { type: Object, required: true }, // Matches the milestones object
  technologies: { type: Object, required: true }, // Matches the technologies object
  systemRequirements: { type: Object, required: true }, // Matches the systemRequirements object
  developmentStage: { type: String, required: true }, // Matches the developmentStage string
  progress: { type: [String], required: true }, // Matches the array of progress percentages
  skillsRequired: { type: [String], required: true }, // Matches the array of skillsRequired
  rolesAndResponsibilities: { type: Object, required: true }, // Matches rolesAndResponsibilities object
  projectDuration: { type: String, required: true }, // Matches the projectDuration string
  keyDates: { type: Object, required: true }, // Matches the keyDates object
  primaryContact: {
    name: { type: String, required: true }, // Matches primaryContact.name
    role: { type: String, required: true }, // Matches primaryContact.role
    contact: { type: String, required: true }, // Matches primaryContact.contact
  },
  communicationChannels: {
    email: { type: String, required: true }, // Matches communicationChannels.email
    contact: { type: String, required: true }, // Matches communicationChannels.contact
  },
  demoLink: { type: String, required: false, default: "" }, // Matches the optional demoLink field
  tags: { type: [String], required: false, default: [] }, // Matches the optional tags array
});

export const Project = mongoose.model("Project", ProjectSchema);
