const { default: mongoose } = require("mongoose");
const { Project } = require("../model/projectSchema");
const exp = require("constants");
const { ProjectStatus } = require("../model/projectSchema");
const { v4: uuidv4 } = require('uuid'); 

// CREATE: Add a new project status
exports.addProjectStatus = async (req, res) => {
    try {
        const { status_id, status_name } = req.body;

        // Check if the status_id already exists
        const existingStatus = await ProjectStatus.findOne({ status_id });
        if (existingStatus) {
            return res.status(400).json({ message: "Status ID already exists" });
        }

        // Create a new status
        const newStatus = new ProjectStatus({
            status_id,
            status_name,
        });

        await newStatus.save();

        res.status(201).json({ message: "Project status created successfully", status: newStatus });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

// READ: Get all project statuses
exports.getAllProjectStatuses = async (req, res) => {
    try {
        const statuses = await ProjectStatus.find();
        res.status(200).json(statuses);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE: Update a project status by ID
exports.updateProjectStatus = async (req, res) => {
    try {
        const { id } = req.params; // This is the `status_id`
        const { status_name } = req.body;

        const updatedStatus = await ProjectStatus.findOneAndUpdate(
            { status_id: id },
            { status_name },
            { new: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ message: "Project status not found" });
        }

        res.status(200).json({ message: "Project status updated successfully", status: updatedStatus });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE: Delete a project status by ID
exports.deleteProjectStatus = async (req, res) => {
    try {
        const { id } = req.params; // This is the `status_id`

        const deletedStatus = await ProjectStatus.findOneAndDelete({ status_id: id });
        if (!deletedStatus) {
            return res.status(404).json({ message: "Project status not found" });
        }

        res.status(200).json({ message: "Project status deleted successfully" });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};
