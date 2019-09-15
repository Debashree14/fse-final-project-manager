package com.fse.sba.projectmanager.service;

import com.fse.sba.projectmanager.dto.ParentTaskDTO;
import com.fse.sba.projectmanager.entity.ParentTask;
import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.repository.ParentTaskRepository;
import com.fse.sba.projectmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParentService {

    @Autowired
    private ParentTaskRepository parentTaskRepository;

    public List<ParentTask> getAllParentTasks(){

        List<ParentTask> parentTasks = new ArrayList<ParentTask>();
        parentTaskRepository.findAll().forEach(parentTasks::add);
        return parentTasks;
    }

    public ParentTask addParentTask(ParentTask parentTask){


        parentTaskRepository.save(parentTask);
        return parentTask;


    }
    public ParentTask getParentTaskById(Integer parentTaskId){

        return parentTaskRepository.findById(parentTaskId).get();

    }

    public ParentTaskDTO generateParentTaskResponse(ParentTask parentTask){

        ParentTaskDTO parentTaskDTO=new ParentTaskDTO();
        parentTaskDTO.setParentTaskId(parentTask.getParentTaskId());
        parentTaskDTO.setParentTaskName(parentTask.getParentTaskName());

        return parentTaskDTO;

    }



}
