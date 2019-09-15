package com.fse.sba.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Project_ID")
    private int projectId;
    @Column(name="Project")
    private String projectName;
    @Column(name="Start_Date")
    private Date projectStartDate;
    @Column(name="End_Date")
    private  Date projectEndDate;
    @Column(name="Priority")
    private int projectPriority;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "User_ID")
    private User user;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "Project_ID")
    //@JsonManagedReference
    private List<Task> tasks;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projectId=" + projectId +
                ", projectName='" + projectName + '\'' +
                ", projectStartDate=" + projectStartDate +
                ", projectEndDate=" + projectEndDate +
                ", projectPriority=" + projectPriority +
                ", user=" + user +
                ", tasks=" + tasks +
                '}';
    }
}
