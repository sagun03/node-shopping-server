import express, { Request, Response } from 'express';
import OfferController from '../controllers/Inventory/Offer.controller';
<<<<<<< HEAD
import { validateOfferData,validateOfferId } from '../middlewares/InventoryManagement/OfferMiddleware';
import { verifyToken } from '../middlewares/auth/jwt';
=======
import { validateOfferData, validateOfferId } from '../middlewares/InventoryManagement/OfferMiddleware';
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const router = express.Router();
const offerController = OfferController.getInstance();

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Offer management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OfferDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         available:
 *           type: boolean
 *     OfferInputDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         available:
 *           type: boolean
 */

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfferInputDTO'
 *     responses:
 *       201:
 *         description: Offer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferDTO'
 *       400:
 *         description: Invalid input
 */
<<<<<<< HEAD
router.post('/', verifyToken, validateOfferData(), async (req: Request, res: Response) => {
=======
router.post('/', validateOfferData(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await offerController.createOffer(req, res);
});

/**
 * @swagger
 * /offers/{id}:
 *   put:
 *     summary: Update an existing offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Offer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfferInputDTO'
 *     responses:
 *       200:
 *         description: Offer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferDTO'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Offer not found
 */
<<<<<<< HEAD
router.put('/:id', verifyToken, validateOfferId(), validateOfferData(), async (req: Request, res: Response) => {
=======
router.put('/:id', validateOfferId(), validateOfferData(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await offerController.updateOffer(req, res);
});

/**
 * @swagger
 * /offers/{id}:
 *   delete:
 *     summary: Delete an offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Offer ID
 *     responses:
 *       200:
 *         description: Offer deleted successfully
 *       404:
 *         description: Offer not found
 */
<<<<<<< HEAD
router.delete('/:id', verifyToken, validateOfferId(), async (req: Request, res: Response) => {
=======
router.delete('/:id', validateOfferId(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await offerController.deleteOffer(req, res);
});

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Get an offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Offer ID
 *     responses:
 *       200:
 *         description: Offer details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferDTO'
 *       404:
 *         description: Offer not found
 */
<<<<<<< HEAD
router.get('/:id', verifyToken, validateOfferId(), async (req: Request, res: Response) => {
=======
router.get('/:id', validateOfferId(), async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await offerController.getOfferById(req, res);
});

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get all offers
 *     tags: [Offers]
 *     responses:
 *       200:
 *         description: List of all offers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OfferDTO'
 */
<<<<<<< HEAD
router.get('/', verifyToken, async (req: Request, res: Response) => {
=======
router.get('/', async (req: Request, res: Response) => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
  await offerController.getAllOffers(req, res);
});

export default router;
