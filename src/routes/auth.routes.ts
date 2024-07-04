import { Request, Response, Router } from "express";
import UserController from "../controllers/users/user.controller";
import { User, validateUser } from "../middlewares/user/userValidation";


const router = Router();
const controller = UserController.getControllerInstance();

// swagger
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Auth Management API
 */
// end-point for getting user by login credentials
// expects: username and email as request body
// swagger
/**
 * @swagger
 * /user/login:
 *   get:
 *     summary: Login user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 */
router.get('/login', async (req: Request, res: Response) => {
  await controller.loginUser(req, res);
});

// end-point for creating new user
// expects: request body with username, email, password at least
// swagger
/**
* @swagger
* /user/register:
*   post:
*     summary: Create a new user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserDTO'
*     responses:
*       200:
*         description: User created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserDTO'
*/
router.post('/register', validateUser(User), async (req: Request, res: Response) => {
  await controller.createUser(req, res);
});


export default router;
