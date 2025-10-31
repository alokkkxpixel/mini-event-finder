const { validationResult } = require("express-validator")
const EventModel = require("../model/event.model")


module.exports.createEvent = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { title, description, location, date, maxParticipants, currentParticipants } = req.body

      const event = await EventModel.create({
        title,
        description,
        location,
        date,
        maxParticipants,
        currentParticipants,
        userId: req.user.id  // comes from auth middleware
      })

      res.status(201).json({ message: "Event created successfully", event })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Server error while creating event" })
    }
}


module.exports.getAllEvent = async (req,res) => {

    const error = validationResult(req)
 
    if(!error.isEmpty()){
        res.status(400).json({error:error.array()})
    }

  try {
    const allEvents = await EventModel.find().populate("userId", "fullname email") // explicitly choose only these fields
  .exec()


  console.log("allevent", allEvents)

  res.status(200).json({allEvents})

  } catch (err) {
      res.status(505).json({message:"server error" , err})
  }

    

    
}

module.exports.getEventByLocation = async (req,res) => {

    const error = validationResult(req)
 
    if(!error.isEmpty()){
        res.status(400).json({error:error.array()})
    }
    
    
  try {
     const { location } = req.query;
        console.log("location",location)
      let filter = {};
      if (location) {
        // case-insensitive match
        filter.location = { $regex: new RegExp(location, "i") };
      }
    const filterEvents = await EventModel.find(filter)
        .populate("userId", "fullname email") // without password data milenga
        .sort({ date: 1 }) // upcoming events first
        .exec();
   
        if(filterEvents.length === 0){
            return res.status(404).json({message : `No events are found at ${location} location`})
        }


        res.status(200).json({
                success: true,
                count: filterEvents.length,
               filterEvents:  filterEvents
              });
  console.log("filterevents", filterEvents)

  } catch (err) {
      res.status(500).json({ success: false, message: error.message });
  } 
}

module.exports.getEventById = async (req,res) => {
  
  const error = validationResult(req)

  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()})
  }



  const { id} = req.params

  try {
  console.log("id",id)
    
  const event = await EventModel.findById({_id:id}).populate("userId","fullname email")
 
   res.status(201).json({success:true, event}) 

  } catch (err) {
      res.status(500).json("server error")    
  }

}