const { Project, LinkType } = require("../model/projectSchema");


exports.addLinkType = async (req, res) => {
    try {
        const { type_id, type_name } = req.body;

    
        const existingType = await LinkType.findOne({ type_id });
        if (existingType) {
            return res.status(400).json({ message: "Type ID already exists" });
        }

        const newLinkType = new LinkType({ type_id, type_name });
        await newLinkType.save();

        res.status(201).json({ message: "Link type added successfully", linkType: newLinkType });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllLinkTypes = async (req, res) => {
    try {
        const linkTypes = await LinkType.find();
        res.status(200).json(linkTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateLinkType = async (req, res) => {
    try {
        const { type_id } = req.params;
        const { type_name } = req.body;

        const updatedLinkType = await LinkType.findOneAndUpdate(
            { type_id },
            { type_name },
            { new: true }
        );

        if (!updatedLinkType) {
            return res.status(404).json({ message: "Link type not found" });
        }

        res.status(200).json({ message: "Link type updated successfully", linkType: updatedLinkType });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteLinkType = async (req, res) => {
    try {
        const { type_id } = req.params;
        const deletedLinkType = await LinkType.findOneAndDelete({ type_id });

        if (!deletedLinkType) {
            return res.status(404).json({ message: "Link type not found" });
        }

        res.status(200).json({ message: "Link type deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
