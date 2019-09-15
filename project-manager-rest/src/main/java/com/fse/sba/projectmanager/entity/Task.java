package com.fse.sba.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Task_ID")
    private int taskId;
    @Column(name="Task")
    private String taskName;
    @Column(name="Start_Date")
    private Date startDate;
    @Column(name="End_Date")
    private Date endDate;
    @Column(name="Priority")
    private int priority;
    @Column(name="Status")
    private String status;
    @ManyToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name="User_ID")
    private User user;
    @ManyToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name="Parent_ID")
    private ParentTask parentTask;
    @ManyToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name="Project_ID")
    //@JsonBackReference
    private Project project;

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ParentTask getParentTask() {
        return parentTask;
    }

    public void setParentTask(ParentTask parentTask) {
        this.parentTask = parentTask;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }


}
