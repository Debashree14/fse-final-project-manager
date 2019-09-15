package com.fse.sba.projectmanager.controller;

import com.fse.sba.projectmanager.dto.ParentTaskDTO;
import com.fse.sba.projectmanager.entity.ParentTask;
import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.service.ParentService;
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
public class ParentTaskController {

    @Autowired
    private ParentService parentService;

    @PostMapping(path="/parenttask/add")
    public ResponseEntity<Object>  addParentTask(@RequestBody ParentTask parentTask){
        parentService.addParentTask(parentTask);


        Map<Object,Object> response=new HashMap<Object,Object>();
        if(parentTask == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(parentTask != null && parentTask.getParentTaskName()==null){
            response.put("Message","Parent Task Name cannot be empty");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }
        else {
            ParentTask createdParentTask = parentService.addParentTask(parentTask);
            ParentTaskDTO parentTaskResponse=parentService.generateParentTaskResponse(createdParentTask);
            response.put("parentTaskResponse", parentTaskResponse);
            response.put("Message", "Successfully" + HttpStatus.CREATED);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
    }

    @GetMapping(path="/parenttask")
    public ResponseEntity<Object> getAllParentTasks(){

        List<ParentTask> parentTasks =new ArrayList<ParentTask>();
        parentTasks=parentService.getAllParentTasks();
        List<ParentTaskDTO> parentTaskResponseList=parentTasks.stream().map(parentTaskEntity->parentService.generateParentTaskResponse(parentTaskEntity)).collect(Collectors.toList());
        Map<Object,Object> response=new HashMap<Object,Object>();
        response.put("parentTaskResponseList",parentTaskResponseList);
        response.put("List Size",parentTaskResponseList.size());
        response.put("Message","Success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
