import { OfferDTO,OfferInputDTO } from "../../dto/Inventory/OfferDTO";
import { Offer } from "../../models/mongodb/inventory.model";

class OfferService {
  public async createOffer(offerInput: OfferInputDTO): Promise<OfferDTO> {
    const newOffer = new Offer(offerInput);
    const savedOffer = await newOffer.save();
    return this.mapOfferToDTO(savedOffer);
  }

  public async updateOffer(offerId: string, offerInput: OfferInputDTO): Promise<OfferDTO | null> {
    const updatedOffer = await Offer.findByIdAndUpdate(offerId, offerInput, { new: true });
    return updatedOffer ? this.mapOfferToDTO(updatedOffer) : null;
  }

  public async deleteOffer(offerId: string): Promise<void> {
    await Offer.findByIdAndDelete(offerId);
  }

  public async getOfferById(offerId: string): Promise<OfferDTO | null> {
    const offer = await Offer.findById(offerId);
    return offer ? this.mapOfferToDTO(offer) : null;
  }

  public async getAllOffers(): Promise<OfferDTO[]> {
    const offers = await Offer.find();
    return offers.map(this.mapOfferToDTO);
  }

  // Utility function to map Offer model to OfferDTO
  private mapOfferToDTO(offer: any): OfferDTO {
    return {
      id: offer._id.toString(),
      offerID: offer.offerID,
      code: offer.code,
      discountPercentage: offer.discountPercentage,
      startDate: offer.startDate,
      endDate: offer.endDate,
      location: offer.location,
    };
  }
}

export default  OfferService;
