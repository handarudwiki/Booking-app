import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"
import { createError } from "../utils/error.js";

export const createRoom = async (req, res ,next) => {
    const hotelId = req.params.id;
    const room = new Room(req.body)

    try{
        const savedRoom = await room.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $push : {rooms : savedRoom._id }
            });
        }catch(err){
            next(err)  
        }
        return res.status(200).json({
            success : true,
            data : savedRoom,
        })
    }catch(err){
        next(err);
    }
}

export const updateRoom = async (req,res,next)=>{
    try{
        const room = await Room.findByIdAndUpdate(req.params.id,
            {$set : req.body},
            {new : true}
            )

         return res.status(200).json({
            success : true,
            data : room
         })   
    }catch(err){
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId
    try{
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull : {rooms : req.params.id}
            })
            return res.status(200).json({
                success : true,
                message : "Room deleted successfully"
            })
        }catch(err){
            next(err)
        }
    }catch(err){
        next(err)
    }

}

export const getRoom = async (req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id)

        if(!room){
            return next(createError(404,"Room not found"));
        } 

        return res.status(200).json({
            success: true,
            data : room
        });

    }catch(err){
        return next(err);
    }
}

export const getRooms = async (req,res,next)=>{
    try{
        const rooms = await Room.find();
        return res.status(200).json({
            success : true,
            data : rooms
        })
    }catch(err){
        next(err)
    }
}