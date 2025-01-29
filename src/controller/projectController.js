const { default: mongoose } = require("mongoose");
const { Project,ProjectStatus,LinkType } = require("../model/projectSchema");
const exp = require("constants");
const { v4: uuidv4 } = require('uuid'); 


const generateProjectId = () => {
    return `pj-${uuidv4()}`;
};


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
        const { project_name, project_description, project_tools, project_start_date, project_end_date, status_id, links } = req.body;

        
        const projectStatus = await ProjectStatus.findOne({ status_id });
        if (!projectStatus) {
            return res.status(400).json({ message: "Invalid project status ID" });
        }

        const project_Id = generateProjectId();

        let projectLinks = [];
        if (Array.isArray(links)) {
            for (const link of links) {
                const linkType = await LinkType.findOne({ type_id: link.type_id });
                if (!linkType) {
                    return res.status(400).json({ message: `Invalid link type ID: ${link.type_id}` });
                }
                projectLinks.push({
                    type_id: link.type_id,
                    link_type: linkType.type_name, // ดึงชื่อประเภทลิงก์จาก LinkType
                    url: link.url
                });
            }
        }

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
            links: projectLinks, 
        });

        await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: newProject });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addProject = async (req, res) => {
    try {
        const { project_name, project_description, project_tools, project_start_date, project_end_date, status_id, links } = req.body;


        const projectStatus = await ProjectStatus.findOne({ status_id });
        if (!projectStatus) {
            return res.status(400).json({ message: "Invalid project status ID" });
        }

        const project_Id = generateProjectId();

        let projectLinks = [];
        if (Array.isArray(links)) {
            for (const link of links) {
                const linkType = await LinkType.findOne({ type_id: link.type_id });
                if (!linkType) {
                    return res.status(400).json({ message: `Invalid link type ID: ${link.type_id}` });
                }
                projectLinks.push({
                    type_id: link.type_id,
                    link_type: linkType.type_name,
                    url: link.url
                });
            }
        }

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
            links: projectLinks, 
        });

        await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: newProject });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


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


exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const existingProject = await Project.findOne({ project_Id: id });
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

		if (updateData.links) {
            let updatedLinks = [];
            for (const link of updateData.links) {
                const linkType = await LinkType.findOne({ type_id: link.type_id });
                if (!linkType) {
                    return res.status(400).json({ message: `Invalid link type ID: ${link.type_id}` });
                }
                updatedLinks.push({
                    type_id: link.type_id,
                    link_type: linkType.type_name,
                    url: link.url
                });
            }
            updateData.links = updatedLinks;
        }

        const updatedProject = await Project.findOneAndUpdate(
            { project_Id: id },
            updateData,
            { new: true }
        );

        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

