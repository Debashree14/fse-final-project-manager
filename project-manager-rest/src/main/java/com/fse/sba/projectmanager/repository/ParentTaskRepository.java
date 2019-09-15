package com.fse.sba.projectmanager.repository;

import com.fse.sba.projectmanager.entity.ParentTask;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ParentTaskRepository extends JpaRepository <ParentTask,Integer>{
}
