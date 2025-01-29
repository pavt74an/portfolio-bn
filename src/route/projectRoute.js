const express = require("express");
const projectController = require("../controller/projectController");
const statusController = require("../controller/statusController");
const linkController = require("../controller/linkController");
const router = express.Router();

router.get("/getAllProjects", projectController.getAllProjects);
router.post("/addProject", projectController.addProject);
router.put("/updateProject/:id", projectController.updateProject);
router.delete("/deleteProject/:id", projectController.deleteProject);
// status routes
router.post("/addProjectStatus", statusController.addProjectStatus);
router.get("/getAllProjectStatuses", statusController.getAllProjectStatuses);
router.put("/updateProjectStatus/:id", statusController.updateProjectStatus);
router.delete("/deleteProjectStatus/:id", statusController.deleteProjectStatus);

// link routes
router.post("/addLinkType", linkController.addLinkType);
router.get("/getAllLinkTypes", linkController.getAllLinkTypes);
router.put("/updateLinkType/:type_id", linkController.updateLinkType);
router.delete("/deleteLinkType/:type_id", linkController.deleteLinkType);

module.exports = router;
