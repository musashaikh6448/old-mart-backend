import { createUserService, loginService, getUsersService, updateUserServiceById, deleteUserService, getOneUserService } from "../services/userService.js";
import jwt from 'jsonwebtoken';

// Controller function to create a new user 
const createUser = async (req, res) => {
    try {
      // Create a new user using the createUserService from userService
      const newUserResponse = await createUserService(req.body);
  
      // Check if user creation was successful
      if (newUserResponse.success) {
        const { user } = newUserResponse;
  
        // Exclude the password field from the user object
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
  
        return res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
      } else {
        const { error } = newUserResponse;
  
        // Check if the error is due to a duplicate user
        if (error === 'Mobile number or email is already taken') {
          return res.status(401).json({ error: 'User already exists' });
        }
  
        return res.status(400).json({ error });
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

 

// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const loginData = req.body;

        // Use the loginService from userService to authenticate the user
        const result = await loginService(loginData);



        // Check if login was successful
        if (result.success) {
            res.status(200).json({success:true, message: result.message, token: result.token,user:result.user,orders:result.orders });
        } else {
            res.status(401).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to get all users
const getUsers = async (req, res) => {
    try {
        // Use the getUsersService from userService to retrieve all users
        const users = await getUsersService();

        // Check if user retrieval was successful
        if (users.success) {
            res.status(200).json({ users: users });
        } else {
            res.status(500).json({ error: users.error });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Update user using the updateUserService from userService
        const updatedUser = await updateUserServiceById(userId, updateData);

        // Check if the user update was successful
        if (updatedUser.success) {
            console.log('User updated successfully. Updated User:', updatedUser);
            res.status(200).json({ message: 'User updated successfully', updatedUser: updatedUser });
        } else {
            console.error('Error updating user:', updatedUser.error);
            res.status(404).json({ error: updatedUser.error });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete user using the deleteUserService from userService
        const result = await deleteUserService(userId);

        // Check if the user deletion was successful
        if (result) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: result });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};



const getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Get user using the getOneUserService from userService
        const user = await getOneUserService(userId);

        // Check if the user retrieval was successful
        if (user.success) {
            console.log('User retrieved successfully.');
            res.status(200).json({ user: user });
        } else {
            console.error('Error retrieving user:', user.error);
            res.status(404).json({ error: user.error });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};


// Export the controller functions for use in routes
export { createUser, loginUser, updateUserById, getUsers, deleteUser, getOneUser };
