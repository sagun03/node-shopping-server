import { Request, Response } from "express";
import OfferService from "../../services/Inventory/OfferServices";
import { OfferDTO, OfferInputDTO } from "../../dto/Inventory/OfferDTO";

class OfferController {
  private static instance: OfferController;
  private offerService: OfferService;

  private constructor() {
    this.offerService = new OfferService();
  }

  static getInstance(): OfferController {
    if (!OfferController.instance) {
      OfferController.instance = new OfferController();
    }
    return OfferController.instance;
  }

  // CREATE a new offer
  async createOffer(req: Request, res: Response): Promise<void> {
    try {
      const offerInput: OfferInputDTO = req.body;
      const createdOffer: OfferDTO = await this.offerService.createOffer(offerInput);
      res.status(201).json(createdOffer);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create offer", error: error.message });
    }
  }

  // UPDATE an existing offer
  async updateOffer(req: Request, res: Response): Promise<void> {
    try {
      const offerId: string = req.params.id;
      const offerInput: OfferInputDTO = req.body;
      const updatedOffer: OfferDTO | null = await this.offerService.updateOffer(offerId, offerInput);
      if (updatedOffer) {
        res.status(200).json(updatedOffer);
      } else {
        res.status(404).json({ message: "Offer not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update offer", error: error.message });
    }
  }

  // DELETE an offer
  async deleteOffer(req: Request, res: Response): Promise<void> {
    try {
      const offerId: string = req.params.id;
      await this.offerService.deleteOffer(offerId);
      res.status(200).json({ message: "Offer has been deleted" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to delete offer", error: error.message });
    }
  }

  // GET an offer by ID
  async getOfferById(req: Request, res: Response): Promise<void> {
    try {
      const offerId: string = req.params.id;
      const offer: OfferDTO | null = await this.offerService.getOfferById(offerId);
      if (offer) {
        res.status(200).json(offer);
      } else {
        res.status(404).json({ message: "Offer not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get offer", error: error.message });
    }
  }

  // GET ALL offers
  async getAllOffers(req: Request, res: Response): Promise<void> {
    try {
      const offers: OfferDTO[] = await this.offerService.getAllOffers();
      res.status(200).json(offers);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get offers", error: error.message });
    }
  }
}

export default OfferController;
