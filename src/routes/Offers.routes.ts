import express, { Request, Response } from 'express';
import OfferController from '../controllers/Inventory/Offer.controller';
import { validateOfferData,validateOfferId } from '../middlewares/InventoryManagement/OfferMiddleware';
import { verifyToken } from '../middlewares/auth/jwt';

const router = express.Router();
const offerController = OfferController.getInstance();

// POST - CREATE a new offer
router.post('/', verifyToken, validateOfferData(), async (req: Request, res: Response) => {
  await offerController.createOffer(req, res);
});

// PUT - UPDATE an existing offer by ID
router.put('/:id', verifyToken, validateOfferId(), validateOfferData(), async (req: Request, res: Response) => {
  await offerController.updateOffer(req, res);
});

// DELETE - DELETE an offer by ID
router.delete('/:id', verifyToken, validateOfferId(), async (req: Request, res: Response) => {
  await offerController.deleteOffer(req, res);
});

// GET - GET an offer by ID
router.get('/:id', verifyToken, validateOfferId(), async (req: Request, res: Response) => {
  await offerController.getOfferById(req, res);
});

// GET - GET ALL offers
router.get('/', verifyToken, async (req: Request, res: Response) => {
  await offerController.getAllOffers(req, res);
});

export default router;
