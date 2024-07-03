import { Request, Response } from "express";
import { messageDTO } from "../../dto/messageDTO";
import UserService from "../../services/users/userService";
import { instanceToPlain } from "class-transformer";
import { userDTO } from "../../dto/Users/userDTO";
import { generateToken } from "../../middlewares/auth/jwt";
class UserController {
<<<<<<< HEAD
    private serviceInstance = UserService.getServiceInstance();

    // implement singelton pattern
    private constructor() {};

    // return controller instance
    static getControllerInstance() : UserController {
        return new UserController();
=======
    private serviceInstance : UserService;
    private static instance : UserController;

    // implement singelton pattern
    private constructor() {
        this.serviceInstance = UserService.getServiceInstance()
    };

    // return controller instance
    static getControllerInstance() : UserController {
        if(!UserController.instance)
            UserController.instance = new UserController();
        return UserController.instance;
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
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

    // login user
    async loginUser(req: Request, res: Response) : Promise<void> {
        const { username, email } = req.query as { username:string, email:string};
        this.serviceInstance.getBylogin(username, email)
        .then(async data => {
            // generate token
            const token = await generateToken(data);
            data.token = token;
            
            const message = new messageDTO(
                200,
                'user login success!',
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

<<<<<<< HEAD
     // getting user by email and username
=======
     // getting all users
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
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

<<<<<<< HEAD
=======
    // login user
    async loginUser(req: Request, res: Response) : Promise<void> {
        const { username, password } = req.body;
        this.serviceInstance.getBylogin(username, password)
        .then(data => {
            data.password 
            const message = new messageDTO(
                200,
                'user details fetch success!',
                data
            )
        })
        .catch(error => {
            const message = new messageDTO(
                500,
                error
            )
            res.status(500).send(instanceToPlain(message))
        })
    }
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
}

export default UserController;