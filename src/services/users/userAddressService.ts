import { plainToClass } from "class-transformer";
import User from "../../models/mongodb/userModels/user.model";
import userAddress from "../../models/mongodb/userModels/userAddress.model";
import { userAddressDTO } from "../../dto/Users/userAddressDTO";

class UserAddressService {
    private static instance : UserAddressService;

    private constructor() {}

    static getServiceInstance() {
        if(!UserAddressService.instance)
            UserAddressService.instance = new UserAddressService;
        return UserAddressService.instance;
    }

    // create user address service
    async createAddress(transact: any) : Promise<userAddressDTO> {
        const document = await User.findOne({ userId: transact.userId });
        if(!document)
            throw new Error('User not found!');
        const addressDetail = new userAddressDTO(transact.userId, transact.street, transact.city, transact.country, transact.zipCode);
        const newEntry = new userAddress(addressDetail);
        const savedEntry = await newEntry.save();
        if(!savedEntry)
            throw new Error('failed to save address entry!');
        return plainToClass(userAddressDTO, savedEntry.toObject());
    }

    // get user address service
    async getAddressEntry(userId:string) : Promise<userAddressDTO> {
        const document = await userAddress.findOne({userId});
        if(!document)
            throw new Error('Unable to find address entry for user!');
        return plainToClass(userAddress, document.toObject());
    }

    // delete entry
    async deleteEntry(userId:string) : Promise<Boolean> {
        const deletionResult = await userAddress.deleteOne({userId});
        if(deletionResult.deletedCount == 1)
            return true;
        else
            throw new Error('address deletion failed, non-exitent!')
    }
}

export default UserAddressService;