const express = require("express");
const Offer = require("../models/Offer");
const router = express.Router();

// Get all active offers
// ✅ Get all active offers (Public)
router.get(
  "/",
  (async (req, res) => {
    const currentDate = new Date();
    const offers = await Offer.find({ validUntil: { $gte: currentDate } }).sort({ validUntil: 1 });
    res.json(offers);
  })
);

// ✅ Create a new offer (Admin only)
router.post(
  "/",
 
  (async (req, res) => {
    const { title, description, discount, validUntil, image, offerCode} = req.body;

    const offer = new Offer({
      title,
      description,
      discount,
      validUntil,
      image,
      offerCode,
    });

    const createdOffer = await offer.save();
    res.status(201).json(createdOffer);
  })
);

// ✅ Update an offer (Admin only)
router.put(
  "/:id",
 
 (async (req, res) => {
    const { title, description, discount, validUntil, image, offerCode } = req.body;

    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      res.status(404);
      throw new Error("Offer not found");
    }

    offer.title = title || offer.title;
    offer.description = description || offer.description;
    offer.discount = discount || offer.discount;
    offer.validUntil = validUntil || offer.validUntil;
    offer.image = image || offer.image;
    offer.offerCode = offerCode || offer.offerCode;

    const updatedOffer = await offer.save();
    res.json(updatedOffer);
  })
);

// ✅ Delete an offer (Admin only)
router.delete(
  "/:id",
 
  (async (req, res) => {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      res.status(404);
      throw new Error("Offer not found");
    }

    await offer.deleteOne();
    res.json({ message: "Offer deleted" });
  })
);

// ✅ Claim an offer (Users can claim only once)
router.post(
  "/:id/claim",
  // Users must be logged in
 (async (req, res) => {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      res.status(404);
      throw new Error("Offer not found");
    }

    if (req.user.claimedOffer) {
      res.status(400);
      throw new Error("You have already claimed an offer");
    }

    // Mark the offer as claimed for the user
    req.user.claimedOffer = offer._id;
    await req.user.save();

    res.json({ message: "Offer claimed successfully", claimedOffer: offer });
  })
);

module.exports = router;