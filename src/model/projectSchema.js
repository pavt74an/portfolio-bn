const mongoose = require("mongoose");
const { type } = require("os");


const linkTypeSchema = new mongoose.Schema({
    type_id: { type: Number, required: true, unique: true },
    type_name: { type: String, required: true } 
});


const linkSchema = new mongoose.Schema({
    type_id: { type: Number, required: true }, 
    link_type: { type: String, required: true }, 
    url: { type: String, required: true },
});


const projectStatusSchema = new mongoose.Schema({
    status_id: {
        type: Number,
        required: true,
    },
    status_name: { type: String, required: true },
});


const projectDetailSchema = new mongoose.Schema({
    project_name: { type: String, required: true },
    project_description: { type: String, required: true },
    project_tools: { type: [String], required: true },
    project_start_date: { type: Date, required: true },
    project_end_date: { type: Date, required: true }
});


const projectSchema = new mongoose.Schema({
    project_Id: { type: String, required: true, unique: true },
    project_detail: { type: projectDetailSchema, required: true },
    project_status: { type: projectStatusSchema, required: true },
    links: { type: [linkSchema], default: [] },
});

const LinkType = mongoose.model("LinkType", linkTypeSchema);
const ProjectStatus = mongoose.model("ProjectStatus", projectStatusSchema);
const ProjectDetail = mongoose.model("ProjectDetail", projectDetailSchema);
const Project = mongoose.model("Project", projectSchema);

module.exports = { LinkType,Project, ProjectDetail, ProjectStatus };
