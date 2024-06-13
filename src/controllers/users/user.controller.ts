import { Request, Response } from "express";
import { messageDTO } from "../../dto/messageDTO";
import UserService from "../../services/users/userService";
import { instanceToPlain } from "class-transformer";
import { userDTO } from "../../dto/Users/userDTO";

class UserController {
    private serviceInstance = UserService.getServiceInstance();

    // implement singelton pattern
    private constructor() {};

    // return controller instance
    static getControllerInstance() : UserController {
        return new UserController();
    }

    // creating new user
    async createUser(req: Request, res: Response) : Promise<void> {
        const userDetails = new userDTO(
            req.body.username,
            req.body.email,
            req.body.password
        );
        this.serviceInstance.createNewUser(userDetails)
        .then(data => {
            const message = new messageDTO(
                200,
                'user created successfully!',
                data
            )
            res.status(200).send(instanceToPlain(message));
        })
        .catch(error => {
            const message = new messageDTO(
                500,
                error
            )
            res.status(500).send(instanceToPlain(message))
        })
    }

    // getting user by id
    async getUserByID(req: Request, res: Response) : Promise<void> {
        this.serviceInstance.getById(req.params.id as string)
        .then(data => {
            const message = new messageDTO(
                200,
                'user details fetch success!',
                data
            )
            res.status(200).send(instanceToPlain(message));
        })
        .catch(error => {
            const message = new messageDTO(
                500,
                error
            )
            res.status(500).send(instanceToPlain(message))
        })
    }

    // getting user by email and username
    async getUserByNameEmail(req: Request, res: Response) : Promise<void> {
        const { username, email } = req.query as { username:string, email:string};
        this.serviceInstance.getByNameEmail(username, email)
        .then(data => {
            const message = new messageDTO(
                200,
                'user details fetch success!',
                data
            )
            res.status(200).send(instanceToPlain(message));
        })
        .catch(error => {
            const message = new messageDTO(
                500,
                error
            )
            res.status(500).send(instanceToPlain(message))
        })
    }

     // getting user by email and username
     async getallUsers(req: Request, res: Response) : Promise<void> {
        this.serviceInstance.getAllUsers()
        .then(data => {
            const message = new messageDTO(
                200,
                'user details fetch success!',
                data
            )
            res.status(200).send(instanceToPlain(message));
        })
        .catch(error => {
            const message = new messageDTO(
                500,
                error
            )
            res.status(500).send(instanceToPlain(message))
        })
    }


    // delete existing user 
    async deleteUser(req: Request, res: Response) : Promise<void> {
        this.serviceInstance.removeUser(req.params.userID as string)
        .then(data => {
            const message = new messageDTO(
                200,
                'user removal success!',
                data
            )
            res.status(200).send(instanceToPlain(message));
        })
        .catch(error => {
            const message = new messageDTO(
                500,
                error
            )
            res.status(500).send(instanceToPlain(message))
        })
    }

}

export default UserController;