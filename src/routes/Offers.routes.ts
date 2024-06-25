import express, { Request, Response } from 'express';
import OfferController from '../controllers/Inventory/Offer.controller';
import { validateOfferData,validateOfferId } from '../middlewares/InventoryManagement/OfferMiddleware';

const router = express.Router();
const offerController = OfferController.getInstance();

// POST - CREATE a new offer
router.post('/', validateOfferData(), async (req: Request, res: Response) => {
  await offerController.createOffer(req, res);
});

// PUT - UPDATE an existing offer by ID
router.put('/:id', validateOfferId(), validateOfferData(), async (req: Request, res: Response) => {
  await offerController.updateOffer(req, res);
});

// DELETE - DELETE an offer by ID
router.delete('/:id', validateOfferId(), async (req: Request, res: Response) => {
  await offerController.deleteOffer(req, res);
});

// GET - GET an offer by ID
router.get('/:id', validateOfferId(), async (req: Request, res: Response) => {
  await offerController.getOfferById(req, res);
});

// GET - GET ALL offers
router.get('/', async (req: Request, res: Response) => {
  await offerController.getAllOffers(req, res);
});

export default router;
