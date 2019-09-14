package com.fse.sba.projectmanager.service;

import com.fse.sba.projectmanager.entity.Project;
import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    public List<Project> getAllProjects(){

        List<Project> projects = new ArrayList<Project>();
        //projectRepository.findAll().forEach(tasks::add);
        return  projectRepository.findAll();
        //return tasks;
    }

    public Project addUpdateProject(Project project){
        projectRepository.save(project);
        return project;
    }

    public Project getProjectById(Integer taskId){

        return projectRepository.findById(taskId).get();
    }



    public Project deleteProject(Project task){

        projectRepository.delete(task);
        return task;
    }

}
