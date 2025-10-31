
const express = require("express")
const { authUserMiddleware } = require("../middleware/user.middleware")
const { body, query } = require("express-validator")
const { createEvent, getEvent, getAllEvent, getEventByLocation, getEventById } = require("../controller/event.controller")

const router = express.Router()




router.post(
  "/create",
  authUserMiddleware,
  [
    body("title")
      .isString()
      .isLength({ min: 4 })
      .withMessage("Title must be at least 4 characters long"),

    body("description")
      .isString()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),

    body("location")
      .isString()
      .notEmpty()
      .withMessage("Location is required"),

    body("date")
      .isISO8601()
      .toDate()
      .withMessage("Please provide a valid date in ISO format (YYYY-MM-DD)"),

    body("maxParticipants")
      .optional()
      .isInt({ min: 1 })
      .withMessage("maxParticipants must be a positive integer"),

    body("currentParticipants")
      .optional()
      .isInt({ min: 0 })
      .withMessage("currentParticipants must be a non-negative integer")
  ],
  createEvent 
)


router.get("/",
    authUserMiddleware,
    getAllEvent
)

router.get("/filter",
    authUserMiddleware,
    query("location").isString().isLength({min:2}).withMessage("location is required"),
    getEventByLocation
)
router.get("/:id",
  authUserMiddleware,
  getEventById

)

module.exports = router