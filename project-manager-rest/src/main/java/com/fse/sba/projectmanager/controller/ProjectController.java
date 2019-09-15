package com.fse.sba.projectmanager.controller;

import com.fse.sba.projectmanager.dto.ParentTaskDTO;
import com.fse.sba.projectmanager.dto.ProjectDTO;
import com.fse.sba.projectmanager.entity.ParentTask;
import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.entity.Project;
import com.fse.sba.projectmanager.entity.User;
import com.fse.sba.projectmanager.service.ParentService;
import com.fse.sba.projectmanager.service.ProjectService;
import com.fse.sba.projectmanager.service.TaskService;
import com.fse.sba.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projectmanager/api")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserService userService;


  /*  @RequestMapping("/test")
    public String test(){
        return "First IntelIJSetup";
    }*/

    @GetMapping(path="/project")
    public ResponseEntity<Object> getAllProjects(){

        List<Project> projects =new ArrayList<Project>();
        projects=projectService.getAllProjects();
        List<ProjectDTO> projectResponseList =projects.stream().map(projectEntity-> projectService.generateProjectResponse(projectEntity)).collect(Collectors.toList());
        Map<Object,Object> response=new HashMap<Object,Object>();
        response.put("projectResponseList",projectResponseList);
        response.put("List Size",projectResponseList.size());
        response.put("Message","Success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path="/project/add")
    public ResponseEntity<Object>  addUser(@RequestBody Project project){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(project == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(project != null && project.getProjectName()==null ){
            response.put("Message","Project Name cannot be empty");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }
        else {
            User user=userService.getUserById(project.getUser().getUserId());
            project.setUser(user);
            Project createdProject = projectService.addUpdateProject(project);

            ProjectDTO projectResponse=projectService.generateProjectResponse(createdProject);

            response.put("projectResponse", projectResponse);
            response.put("Message", "Successfully" + HttpStatus.CREATED);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
    }

    @PutMapping(path="/project/update")
    public ResponseEntity<Object> updateProject(@RequestBody Project project){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(project == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(project != null && project.getProjectId() == 0){
            response.put("Message","Project Id must be provided to update a project");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }else {

            User user=userService.getUserById(project.getUser().getUserId());
            project.setUser(user);
            Project updatedProject = projectService.addUpdateProject(project);

            ProjectDTO projectResponse=projectService.generateProjectResponse(updatedProject);
            response.put("project", projectResponse);
            response.put("Message", "Successfully Updated");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @GetMapping(path="/project/projectById/{projectId}")
    public ResponseEntity<Object> getUserById(@PathVariable("projectId") Integer projectId ){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(projectId == null){
            response.put("Message", "Project Id must be provided");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            Project fetchedUser = projectService.getProjectById(projectId);
            ProjectDTO projectResponse=projectService.generateProjectResponse(fetchedUser);
            response.put("projectResponse", projectResponse);
            response.put("Message", "Successfully Fetched");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @DeleteMapping(path="/project/delete")
    public ResponseEntity<Object> deleteUser(@RequestBody Project project){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(project == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(project != null && project.getProjectId() == 0){
            response.put("Message","Project Id must be provided to delete a project");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }else {

            Project deletedUser = projectService.deleteProject(project);
            ProjectDTO projectResponse=projectService.generateProjectResponse(deletedUser);

            response.put("projectResponse", projectResponse);
            response.put("Message", "Successfully Deleted");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }
}