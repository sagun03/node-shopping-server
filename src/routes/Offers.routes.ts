import express, { Request, Response } from 'express';
import OfferController from '../controllers/Inventory/Offer.controller';

const router = express.Router();
const offerController = OfferController.getInstance();

// CREATE a new offer
router.post('/', async (req: Request, res: Response) => {
  await offerController.createOffer(req, res);
});

// UPDATE an existing offer
router.put('/:id', async (req: Request, res: Response) => {
  await offerController.updateOffer(req, res);
});

// DELETE an offer
router.delete('/:id', async (req: Request, res: Response) => {
  await offerController.deleteOffer(req, res);
});

// GET an offer by ID
router.get('/:id', async (req: Request, res: Response) => {
  await offerController.getOfferById(req, res);
});

// GET ALL offers
router.get('/', async (req: Request, res: Response) => {
  await offerController.getAllOffers(req, res);
});

export default router;
