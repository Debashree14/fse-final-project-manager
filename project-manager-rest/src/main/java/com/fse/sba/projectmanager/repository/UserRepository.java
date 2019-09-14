package com.fse.sba.projectmanager.repository;

import com.fse.sba.projectmanager.entity.Task;
import com.fse.sba.projectmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
}
