const express = require("express");
const projectController = require("../controller/projectController");
const router = express.Router();


router.get('/getAllProjects', projectController.getAllProjects);  
router.post('/addProject', projectController.addProject);         
router.put('/updateProject/:id', projectController.updateProject); 
router.delete('/deleteProject/:id', projectController.deleteProject); 
// status routes
router.post('/addProjectStatus', projectController.addProjectStatus);
router.get('/getAllProjectStatuses', projectController.getAllProjectStatuses); 
router.put('/updateProjectStatus/:id', projectController.updateProjectStatus);
router.delete('/deleteProjectStatus/:id', projectController.deleteProjectStatus); 

module.exports = router;
