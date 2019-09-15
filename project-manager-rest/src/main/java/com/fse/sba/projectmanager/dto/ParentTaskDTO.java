package com.fse.sba.projectmanager.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ParentTaskDTO{

    private int parentTaskId;
    private String parentTaskName;

    public int getParentTaskId() {
        return parentTaskId;
    }

    public void setParentTaskId(int parentTaskId) {
        this.parentTaskId = parentTaskId;
    }

    public String getParentTaskName() {
        return parentTaskName;
    }

    public void setParentTaskName(String parentTaskName) {
        this.parentTaskName = parentTaskName;
    }

    @Override
    public String toString() {
        return "ParentTask{" +
                "parentTaskId=" + parentTaskId +
                ", parentTaskName='" + parentTaskName + '\'' +
                '}';
    }
}
