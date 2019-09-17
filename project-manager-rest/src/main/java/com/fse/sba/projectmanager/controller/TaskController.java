package com.fse.sba.projectmanager.controller;


import com.fse.sba.projectmanager.dto.ParentTaskDTO;
import com.fse.sba.projectmanager.dto.ProjectDTO;
import com.fse.sba.projectmanager.dto.TaskDTO;
import com.fse.sba.projectmanager.entity.ParentTask;
import com.fse.sba.projectmanager.entity.Project;
import com.fse.sba.projectmanager.entity.Task;
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

@CrossOrigin(origins = {"http://localhost:9000"})
@RestController
@RequestMapping("/projectmanager/api")
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ParentService parentService;

    @RequestMapping("/test")
    public String test(){
        return "First IntelIJSetup";
    }

    @GetMapping(path="/task")
    public ResponseEntity<Object> getAllTasks(){

    List<Task> tasks =new ArrayList<Task>();
        tasks=taskService.getAllTasks();

        List<TaskDTO> taskResponseList =tasks.stream().map(taskEntity-> taskService.generateTaskResponse(taskEntity)).collect(Collectors.toList());

        Map<Object,Object> response=new HashMap<Object,Object>();
        response.put("taskResponseList",taskResponseList);
        response.put("List Size",taskResponseList.size());
        response.put("Message","Success");
    return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path="/task/tasksByProjectId/{projectId}")
    public ResponseEntity<Object> getAllTasksByProjectId(@PathVariable("projectId") Integer projectId  ){

        List<Task> tasks =new ArrayList<Task>();
        tasks=taskService.getAllTasksByProjectId(projectId);

        List<TaskDTO> taskResponseList =tasks.stream().map(taskEntity-> taskService.generateTaskResponse(taskEntity)).collect(Collectors.toList());

        Map<Object,Object> response=new HashMap<Object,Object>();
        response.put("taskResponseList",taskResponseList);
        response.put("List Size",taskResponseList.size());
        response.put("Message","Success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path="/task/add")
    public ResponseEntity<Object>  addTask(@RequestBody Task task){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(task == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(task != null && task.getTaskName()==null){
            response.put("Message","Task Name cannot be empty");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }
         else {
            User user=userService.getUserById(task.getUser().getUserId());
            Project project=projectService.getProjectById(task.getProject().getProjectId());
            ParentTask parentTask=parentService.getParentTaskById(task.getParentTask().getParentTaskId());
            task.setUser(user);
            task.setProject(project);
            task.setParentTask(parentTask);
            Task createdTask = taskService.addUpdateTask(task);

            TaskDTO taskResponse=taskService.generateTaskResponse(createdTask);

            response.put("taskResponse", taskResponse);
            response.put("Message", "Successfully" + HttpStatus.CREATED);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
    }

    @PutMapping(path="/task/update")
    public ResponseEntity<Object> updateTask(@RequestBody Task task){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(task == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(task != null && task.getTaskId() == 0){
            response.put("Message","Task Id must be provided to update a task");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }else {
            User user=userService.getUserById(task.getUser().getUserId());
            Project project=projectService.getProjectById(task.getProject().getProjectId());
            ParentTask parentTask=parentService.getParentTaskById(task.getParentTask().getParentTaskId());
            task.setUser(user);
            task.setProject(project);
            task.setParentTask(parentTask);

            Task updatedTask = taskService.addUpdateTask(task);

            TaskDTO taskResponse=taskService.generateTaskResponse(updatedTask);
            response.put("taskResponse", taskResponse);
            response.put("Message", "Successfully Updated");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @GetMapping(path="/task/taskById/{taskId}")
    public ResponseEntity<Object> getTaskById(@PathVariable("taskId") Integer taskId ){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(taskId == null){
            response.put("Message", "Task Id must be provided");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            Task fetchedTask = taskService.getTaskById(taskId);

            TaskDTO taskResponse=taskService.generateTaskResponse(fetchedTask);
            response.put("taskResponse", taskResponse);
            response.put("Message", "Successfully Fetched");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @DeleteMapping(path="/task/delete")
    public ResponseEntity<Object> deleteTask(@RequestBody Task task){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(task == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(task != null && task.getTaskId() == 0){
            response.put("Message","Task Id must be provided to delete a task");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }else {

            Task deletedTask = taskService.deleteTask(task);
            TaskDTO taskResponse=taskService.generateTaskResponse(deletedTask);
            response.put("taskResponse", taskResponse);
            response.put("Message", "Successfully Deleted");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }
}
