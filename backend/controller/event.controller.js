const { validationResult } = require("express-validator")
const EventModel = require("../model/event.model")
const { uploadFile, deleteFromImageKit } = require("../service/stroage.service")
const { v4: uuid } = require("uuid");

      const moment = require("moment");


module.exports.createEvent = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { title, description, location, date, maxParticipants, currentParticipants } = req.body
      const file = req.file.buffer
   

      console.log("file",file , file.buffer)


      if(!file){
         return res.status(400).json({message:"File is required"}) 
      }

      if(!req.user || !req.user._id){
         return res.status(404).json({success:false, message:"User not found"})
      }

      const fileUploaded = await uploadFile(file,uuid())


// inside controller before saving
let eventDate = req.body.date;
if (eventDate && /^\d{2}-\d{2}-\d{4}$/.test(eventDate)) {
  eventDate = moment(eventDate, "DD-MM-YYYY").toDate();
}

console.log(eventDate)
      const event = await EventModel.create({
        title,
        description,
        location,
        image:fileUploaded.url,
        fileId:fileUploaded.fileId,
        date:eventDate,
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

  res.status(200).json({
     success: true,
                count: allEvents.length,
    Events:allEvents})

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
               Events:  filterEvents
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

module.exports.deleteEventById = async (req,res) => {

  const error = validationResult(req)

  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()})
  }

   const {id} = req.params
   console.log("id",id)
   try {
     
    const file = await EventModel.findById(id)
   console.log("file delete",file)
    if(!file || !file.fileId){
      return res.status(400).json({success:false , message:"File not found"})
    }


   if(!req.user|| !req.user._id){
    return res.status(404).json({success:false , message:"User not found"})
   }

    await deleteFromImageKit(file.fileId)

     const deleteEvent = await EventModel.findByIdAndDelete(id)

      res.status(200).json({success:true , deleteEvent})
   } catch (err) {
    res.status(500).json("server error")
   }


  
}

module.exports.userEvents = async (req,res) => {
  
 const error = validationResult(req)

 if(!error.isEmpty()){
   res.status(400).json({error:error.array()})
 }
 const userID = req.user._id

 console.log("user id" ,userID)

 try {
  
   const userEvents = await EventModel.find({userId:{_id:userID}})
 
    console.log("users event", userEvents)

    res.status(200).json({success:true , count:userEvents.length ,events:userEvents})
 } catch (err) {
    res.status(500).json("Server error")
 }

}