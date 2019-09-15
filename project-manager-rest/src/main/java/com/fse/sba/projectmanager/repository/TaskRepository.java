package com.fse.sba.projectmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fse.sba.projectmanager.entity.Task;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TaskRepository extends JpaRepository <Task,Integer> {


}
