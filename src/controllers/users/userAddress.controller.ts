import { Request, Response } from "express";
import { messageDTO } from "../../dto/messageDTO";
import UserAddressService from "../../services/users/userAddressService";
import { instanceToPlain } from "class-transformer";

class UserAddressController {
  private serviceInstance: UserAddressService;
  private static instance: UserAddressController;

  // implement singelton pattern
  private constructor() {
    this.serviceInstance = UserAddressService.getServiceInstance();
  }

  // return controller instance
  static getControllerInstance(): UserAddressController {
    if (!UserAddressController.instance) {
      UserAddressController.instance = new UserAddressController();
    }
    return UserAddressController.instance;
  }

  // creating new address entry for user
  async putEntry(req: Request, res: Response): Promise<void> {
    const transact = req.body;
    try {
      const data = await this.serviceInstance.createAddress(transact);
      const message = new messageDTO(200, "address entry creation success", {
        data,
      });
      res.status(200).send(instanceToPlain(message));
    } catch (err: any) {
      console.error("Error creating address entry: ", err); // Log the error
      const message = new messageDTO(500, "Internal Server Error", err.message);
      res.status(500).send(instanceToPlain(message));
    }
  }

  // get existing points entry
  async getEntry(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    this.serviceInstance
      .getAddressEntry(userId)
      .then((data) => {
        const message = new messageDTO(200, "address entry found!", data);
        res.status(200).send(instanceToPlain(message));
      })
      .catch((err) => {
        const message = new messageDTO(500, err);
        res.status(500).send(instanceToPlain(message));
      });
  }

  // delete Entry
  async deleteEntry(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    this.serviceInstance
      .deleteEntry(userId)
      .then((data) => {
        const message = new messageDTO(200, "address entry deletion success!", {
          data,
        });
        res.status(200).send(instanceToPlain(message));
      })
      .catch((err) => {
        const message = new messageDTO(500, err);
        res.status(500).send(instanceToPlain(message));
      });
  }
}

export default UserAddressController;
