package com.fse.sba.projectmanager.service;

import com.fse.sba.projectmanager.config.ProjectManagerConstants;
import com.fse.sba.projectmanager.dto.ProjectDTO;
import com.fse.sba.projectmanager.dto.TaskDTO;
import com.fse.sba.projectmanager.entity.Project;
import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks(){

        List<Task> tasks = new ArrayList<Task>();
        //taskRepository.findAll().forEach(tasks::add);
        return  taskRepository.findAll();
        //return tasks;
    }

    public Task addUpdateTask(Task task){
        taskRepository.save(task);
        return task;
    }

       public Task getTaskById(Integer taskId){

         return taskRepository.findById(taskId).get();
  }



    public Task deleteTask(Task task){

        taskRepository.delete(task);
        return task;
   }

    public List<Task> getAllTasksByProjectId(Integer projectId){

       return taskRepository.findAll().stream().filter(taskByPrjctId-> projectId.equals(taskByPrjctId.getProject().getProjectId())).collect(Collectors.toList());
    }


    public TaskDTO generateTaskResponse(Task task){

        TaskDTO taskDTO=new TaskDTO();

        taskDTO.setTaskId(task.getTaskId());
        taskDTO.setTaskName(task.getTaskName());
        taskDTO.setParentTaskId(task.getParentTask().getParentTaskId());
        taskDTO.setParentTaskName(task.getParentTask().getParentTaskName());
        taskDTO.setStartDate(task.getStartDate());
        taskDTO.setEndDate(task.getEndDate());
        taskDTO.setPriority(task.getPriority());
        taskDTO.setProjectId(task.getProject().getProjectId());
        taskDTO.setProjectName(task.getProject().getProjectName());
        taskDTO.setUserId(task.getUser().getUserId());
        taskDTO.setUserEmployeeId(task.getUser().getEmployeeId());
        taskDTO.setUserFirstName(task.getUser().getFirstName());
        taskDTO.setUserLastName(task.getUser().getLastName());
        taskDTO.setUserName(task.getUser().getFirstName().concat(ProjectManagerConstants.SPACE_STR).concat(task.getUser().getLastName()));

        return taskDTO;

    }

}
