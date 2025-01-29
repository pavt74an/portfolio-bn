const { default: mongoose } = require("mongoose");
const { Project } = require("../model/projectSchema");
const exp = require("constants");
const { ProjectStatus } = require("../model/projectSchema");
const { v4: uuidv4 } = require('uuid'); 


const generateProjectId = () => {
    return `pj-${uuidv4()}`;
};

// function to get all projects
exports.getAllProjects = async (req, res) => {
	try {
		const projects = await Project.find(); 
		res.status(200).json(projects);
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.addProject = async (req, res) => {
    try {
        const { project_name, project_description, project_tools, project_start_date, project_end_date, status_id } = req.body;

        // ตรวจสอบว่า status_id ที่ให้มามีอยู่ในฐานข้อมูลหรือไม่
        const projectStatus = await ProjectStatus.findOne({ status_id });
        if (!projectStatus) {
            return res.status(400).json({ message: "Invalid project status ID" });
        }

        // สร้าง project_Id ใหม่โดยใช้ UUID
        const project_Id = generateProjectId();

        // สร้างและบันทึกโปรเจกต์ใหม่
        const newProject = new Project({
            project_Id,
            project_detail: {
                project_name,
                project_description,
                project_tools,
                project_start_date,
                project_end_date,
            },
            project_status: projectStatus,
        });

        await newProject.save();

        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// Function to delete a project by ID
exports.deleteProject = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedProject = await Project.findOneAndDelete({ project_Id: id });
		if (!deletedProject) {
			return res.status(404).json({ message: "Project not found" });
		}

		res.status(200).json({ message: "Project deleted successfully" });
	} catch (error) {
		console.error(`Error: ${error}`);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Function to update a project by ID
exports.updateProject = async (req, res) => {
	try {
		const { id } = req.params;
		const updateData = req.body;

		const updatedProject = await Project.findOneAndUpdate({ project_Id: id }, updateData, { new: true });
		if (!updatedProject) {
			return res.status(404).json({ message: "Project not found" });
		}

		res.status(200).json({ message: "Project updated successfully", project: updatedProject });
	} catch (error) {
		console.error(`Error: ${error}`);
		res.status(500).json({ message: "Internal server error" });
	}
};
