package com.fse.sba.projectmanager.service;

import com.fse.sba.projectmanager.config.ProjectManagerConstants;
import com.fse.sba.projectmanager.dto.ParentTaskDTO;
import com.fse.sba.projectmanager.dto.ProjectDTO;
import com.fse.sba.projectmanager.entity.ParentTask;
import com.fse.sba.projectmanager.entity.Project;
import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
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

    public ProjectDTO generateProjectResponse(Project project){

        ProjectDTO projectDTO=new ProjectDTO();
        projectDTO.setProjectId(project.getProjectId());
        projectDTO.setProjectName(project.getProjectName());
        projectDTO.setProjectStartDate(project.getProjectStartDate());
        projectDTO.setProjectEndDate(project.getProjectEndDate());
        projectDTO.setProjectPriority(project.getProjectPriority());
        projectDTO.setManagerId(project.getUser().getUserId());
        projectDTO.setManagerEmployeedId(project.getUser().getEmployeeId());
        projectDTO.setManagerFirstName(project.getUser().getFirstName());
        projectDTO.setManagerLastName(project.getUser().getLastName());
        projectDTO.setManagerName(project.getUser().getFirstName().concat(ProjectManagerConstants.SPACE_STR).concat(project.getUser().getLastName()));
        //System.out.println("**********project1="+project);
        projectDTO.setTotalTasks(project.getTasks() != null ? project.getTasks().size():0);
       // System.out.println("**********project="+project);
        projectDTO.setTatalCompletedTasks(project.getTasks() !=null ?((int)project.getTasks().stream().filter(projectEntity-> projectEntity.getStatus().equals(ProjectManagerConstants.COMPLETED_STS)).count()):0);
        projectDTO.setKey(project.getProjectId());
        return projectDTO;

    }

}
