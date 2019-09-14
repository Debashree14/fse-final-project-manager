package com.fse.sba.projectmanager.service;

import com.fse.sba.projectmanager.entity.Project;
import com.fse.sba.projectmanager.entity.User;
import com.fse.sba.projectmanager.repository.ProjectRepository;
import com.fse.sba.projectmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    public List<User> getAllUsers(){

        List<User> users = new ArrayList<User>();
        //projectRepository.findAll().forEach(tasks::add);
        return  userRepository.findAll();
        //return tasks;
    }

    public User addUpdateUser(User user){
        userRepository.save(user);
        return user;
    }

    public User getUserById(Integer userId){

        return userRepository.findById(userId).get();
    }



    public User deleteUser(User user){

        userRepository.delete(user);
        return user;
    }
}
