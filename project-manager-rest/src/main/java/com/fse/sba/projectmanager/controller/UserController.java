package com.fse.sba.projectmanager.controller;

import com.fse.sba.projectmanager.dto.ProjectDTO;
import com.fse.sba.projectmanager.dto.TaskDTO;
import com.fse.sba.projectmanager.dto.UserDTO;
import com.fse.sba.projectmanager.entity.User;
import com.fse.sba.projectmanager.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fse.sba.projectmanager.service.UserService;
import com.fse.sba.projectmanager.entity.User;
import com.fse.sba.projectmanager.entity.ParentTask;

@RestController
@RequestMapping("/projectmanager/api")
public class UserController {

    @Autowired
    private UserService userService;


   /* @RequestMapping("/test")
    public String test(){
        return "First IntelIJSetup";
    }*/

    @GetMapping(path="/user")
    public ResponseEntity<Object> getAllUsers(){

        List<User> users =new ArrayList<User>();

        users=userService.getAllUsers();
        List<UserDTO> userResponseList =users.stream().map(userEntity-> userService.generateUserResponse(userEntity)).collect(Collectors.toList());

        Map<Object,Object> response=new HashMap<Object,Object>();
        response.put("userResponseList",userResponseList);
        response.put("List Size",users.size());
        response.put("Message","Success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path="/user/add")
    public ResponseEntity<Object>  addUser(@RequestBody User user){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(user == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }else if(user != null && (user.getFirstName()==null || user.getLastName()==null || user.getEmployeeId()==null)){
            response.put("Message","User First Name,Last Name,Employee Id cannot be empty");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }
        else {
            User createdUser = userService.addUpdateUser(user);

            UserDTO userResponse=userService.generateUserResponse(createdUser);

            response.put("userResponse", userResponse);
            response.put("Message", "Successfully" + HttpStatus.CREATED);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
    }

    @PutMapping(path="/user/update")
    public ResponseEntity<Object> updateProject(@RequestBody User user){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(user == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(user != null && user.getUserId() == 0){
            response.put("Message","User Id must be provided to update a user");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }else {

            User updatedUser = userService.addUpdateUser(user);

            UserDTO userResponse=userService.generateUserResponse(updatedUser);
            response.put("userResponse", userResponse);
            response.put("Message", "Successfully Updated");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @GetMapping(path="/user/userById/{userId}")
    public ResponseEntity<Object> getUserById(@PathVariable("userId") Integer userId ){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(userId == null){
            response.put("Message", "User Id must be provided");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            User fetchedUser = userService.getUserById(userId);
            UserDTO userResponse=userService.generateUserResponse(fetchedUser);

            response.put("userResponse", userResponse);
            response.put("Message", "Successfully Fetched");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @DeleteMapping(path="/user/delete")
    public ResponseEntity<Object> deleteUser(@RequestBody User user){
        Map<Object,Object> response=new HashMap<Object,Object>();
        if(user == null){
            response.put("Message", "Invalid Request");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if(user != null && user.getUserId() == 0){
            response.put("Message","User Id must be provided to delete a user");
            return new ResponseEntity<>(response,HttpStatus.FORBIDDEN);
        }else {

            User deletedUser = userService.deleteUser(user);
            UserDTO userResponse=userService.generateUserResponse(deletedUser);

            response.put("userResponse",userResponse);
            response.put("Message", "Successfully Deleted");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }
}
