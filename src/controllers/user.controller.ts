import { Request, Response } from "express";
import { UserService } from "../services/products/UserService";

class UserController {
    private static controllerInstance: UserController;
    private serviceInstance: UserService;

    constructor() {
        this.serviceInstance = new UserService;
    }

    public static getControllerInstance(): UserController{
        if(!UserController.controllerInstance) {
            UserController.controllerInstance = new UserController();
        }
        return UserController.controllerInstance;
    }

    // get all users
    public async getAllUsers(res: Response, req: Request): Promise<void> {
        this.serviceInstance.getAllUser().then(data => {
            res.status(200).json(data);
        }).catch(error => {
            res.status(500).json({
                message: "Error fetching users!",
                error: error.message
            })
        })
    }

    // create new user
    public async postUser(res: Response, req: Request): Promise<void> {
        const userResource: any = req.body;
        this.serviceInstance.createUser(userResource).then(data => {
            res.status(200).json(data);
        }).catch(error => {
            res.status(500).json({
                message: "Error creating new user!",
                error: error.message
        })
        })
    }

    // clean-up
    public dispose(): void {
        this.serviceInstance.dispose();
    }
}

export default UserController;