import { userDTO } from "../../dto/Users/userDTO";
import User from "../../models/mongodb/userModels/user.model";
import { plainToClass } from "class-transformer";

class UserService {
    private static instance : UserService;

    // implement a singelton pattern
    private constructor() {};

    // return service instance
    static getServiceInstance() : UserService {
        if(!UserService.instance)
            UserService.instance = new UserService();
        return UserService.instance;
    }

    // create user service
    async createNewUser(userDetails: userDTO) : Promise<userDTO> {
        const newEntry = new User(userDetails);
        const savedEntry = await newEntry.save();
        if(!savedEntry)
            throw new Error('user creation failed!');
        return plainToClass(userDTO, savedEntry.toObject());
    }

    // get user by username and email service
    async getByNameEmail(username: String, email: String) : Promise<userDTO> {
        const retrievedUser = await User.findOne({
            username,
            email
        })
        if(!retrievedUser)
            throw new Error('user not found!');
        return plainToClass(userDTO, retrievedUser.toObject());
    }

    // get user by login
    async getBylogin(username: String, password: String) : Promise<userDTO> {
        const retrievedUser = await User.findOne({
            username,
            password
        })
        if(!retrievedUser)
            throw new Error('user not found!');
        return plainToClass(userDTO, retrievedUser.toObject());
    }

    // get user by id
    async getById(userId: string) : Promise<userDTO> {
        const retrievedUser = await User.findOne({userId});
        if(!retrievedUser)
            throw new Error('user not found!');
        return plainToClass(userDTO, retrievedUser.toObject());
    }

    // delete user service
    async removeUser(userId: string) : Promise<boolean> {
        const deletionResult = await User.deleteOne({userId});
        if(deletionResult.deletedCount == 1)
            return true;
        else
            throw new Error('user deletion failed, non-exitent!')
    }

    // get all users
    async getAllUsers() : Promise<userDTO[]> {
        const retrievedUsers = await User.find({});
        if(!retrievedUsers)
            throw new Error('users not found!');
        retrievedUsers.forEach((user) => plainToClass(userDTO, user));
        return retrievedUsers;
    }
}

export default UserService;