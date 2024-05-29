import mongoose from "mongoose";
import { connectToMongoDB, disposeConnection} from "../../config/mongoDB";
import { UserDTO } from "../../dto/products/UserDTO";
import { User } from "../../models/mongodb/user.model";

export class UserService {
    constructor() {
        connectToMongoDB().then(client => {
            mongoose.createConnection().setClient(client);
        }).catch(error => console.log("Error establishing connection to mongoDB server."));
    }

    // map user entry to UserDTO
    private mapUserToDTO(entry: any): UserDTO {
        return {
            id: entry._id,
            Username: entry.Username,
            Email: entry.Email,
            Password: entry.Password,
            PointsBalance: entry.PointsBalance,
            ReferralCode: entry.ReferralCode,
            ReferralUserId: entry.ReferralUserId,
            Role: entry.Role
        };
    }

    // create new user 
    public async createUser(userInput: any): Promise<UserDTO> {
        const userInputToDTO: UserDTO = this.mapUserToDTO(userInput);
        const newUser = new User(userInputToDTO);
        const savedEntry = await newUser.save();
        return this.mapUserToDTO(savedEntry);
    }

    // return all user
    public async getAllUser(): Promise<UserDTO[]> {
        const users = await User.find();
        return users.map(this.mapUserToDTO);
    }

    // dispose connection
    public dispose(): void {
        mongoose.connection.close();
        disposeConnection();
    }
}
