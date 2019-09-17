package com.fse.sba.projectmanager.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.entity.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectDTO {


    private int projectId;
    private int key;
    private String projectName;
    private Date projectStartDate;
    private Date projectEndDate;
    private int projectPriority;
    private int managerId;
    private String managerName;
    private String managerFirstName;
    private String managerLastName;
    private String managerEmployeedId;
    private int totalTasks;
    private int tatalCompletedTasks;

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Date getProjectStartDate() {
        return projectStartDate;
    }

    public void setProjectStartDate(Date projectStartDate) {
        this.projectStartDate = projectStartDate;
    }

    public Date getProjectEndDate() {
        return projectEndDate;
    }

    public void setProjectEndDate(Date projectEndDate) {
        this.projectEndDate = projectEndDate;
    }

    public int getProjectPriority() {
        return projectPriority;
    }

    public void setProjectPriority(int projectPriority) {
        this.projectPriority = projectPriority;
    }

    public int getManagerId() {
        return managerId;
    }

    public void setManagerId(int managerId) {
        this.managerId = managerId;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerFirstName() {
        return managerFirstName;
    }

    public void setManagerFirstName(String managerFirstName) {
        this.managerFirstName = managerFirstName;
    }

    public String getManagerLastName() {
        return managerLastName;
    }

    public void setManagerLastName(String managerLastName) {
        this.managerLastName = managerLastName;
    }

    public String getManagerEmployeedId() {
        return managerEmployeedId;
    }

    public void setManagerEmployeedId(String managerEmployeedId) {
        this.managerEmployeedId = managerEmployeedId;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
    }

    public int getTatalCompletedTasks() {
        return tatalCompletedTasks;
    }

    public void setTatalCompletedTasks(int tatalCompletedTasks) {
        this.tatalCompletedTasks = tatalCompletedTasks;
    }

    
    public int getKey() {
		return key;
	}

	public void setKey(int key) {
		this.key = key;
	}

	@Override
    public String toString() {
        return "ProjectDTO{" +
                "projectId=" + projectId +
                ", projectName='" + projectName + '\'' +
                ", projectStartDate=" + projectStartDate +
                ", projectEndDate=" + projectEndDate +
                ", projectPriority=" + projectPriority +
                ", managerId=" + managerId +
                ", managerName='" + managerName + '\'' +
                ", managerFirstName='" + managerFirstName + '\'' +
                ", managerLastName='" + managerLastName + '\'' +
                ", managerEmployeedId='" + managerEmployeedId + '\'' +
                ", totalTasks=" + totalTasks +
                ", tatalCompletedTasks=" + tatalCompletedTasks +
                '}';
    }
}
