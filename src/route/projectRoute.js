const express = require("express");
const projectController = require("../controller/projectController");
const statusController = require('../controller/statusController');
const router = express.Router();


router.get('/getAllProjects', projectController.getAllProjects);  
router.post('/addProject', projectController.addProject);         
router.put('/updateProject/:id', projectController.updateProject); 
router.delete('/deleteProject/:id', projectController.deleteProject); 
// status routes
router.post('/addProjectStatus', statusController.addProjectStatus);
router.get('/getAllProjectStatuses', statusController.getAllProjectStatuses); 
router.put('/updateProjectStatus/:id', statusController.updateProjectStatus);
router.delete('/deleteProjectStatus/:id', statusController.deleteProjectStatus); 

module.exports = router;
