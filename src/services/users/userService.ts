import { userDTO } from "../../dto/Users/userDTO";
import User from "../../models/mongodb/userModels/user.model";
import { instanceToPlain, plainToClass } from "class-transformer";

class UserService {
    private static serviceInstance: UserService;

    // implement a singelton pattern
    private constructor() {};

    // return service instance
    static getServiceInstance() : UserService {
        if(!UserService.serviceInstance)
            UserService.serviceInstance = new UserService;
        return UserService.serviceInstance;
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

    // get user by id
    async getById(userID: string) : Promise<userDTO> {
        const retrievedUser = await User.findOne({userID});
        if(!retrievedUser)
            throw new Error('user not found!');
        return plainToClass(userDTO, retrievedUser.toObject());
    }

    // delete user service
    async removeUser(userID: string) : Promise<boolean> {
        const deletionResult = await User.deleteOne({userID});
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