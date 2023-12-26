import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req,res, next)=>{
    try{
        const hotel = await new Hotel(req.body)
        const savedHotel = await hotel.save();

        return res.status(200).json({
            success: true,
            data : savedHotel
        });

    }catch(err){
        return next(err);
    }
}

export const updateHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id,{$set : req.body},{new : true})

        return res.status(200).json({
            success: true,
            data : hotel
        });

    }catch(err){
        return next(err);
    }
}

export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message : "Hotel deleted successfully"
        });

    }catch(err){
        next(err);
    }
}

export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)

        if(!hotel){
            return next(createError(404,"Hotel not found"));
        } 

        return res.status(200).json({
            success: true,
            data : hotel
        });

    }catch(err){
        return next(err);
    }
}

export const getHotels = async (req,res,next)=>{
    try{
        const hotels = await Hotel.find()

        return res.status(200).json({
            success: true,
            data : hotels
        });

    }catch(err){
        return next(err)
    }
}

export const countByCity = async (req,res,next)=>{
    try{
        const cities = req.query.cities.split(',')

        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({city : city })
            })
        )

        return res.status(200).json({
            success : true,
            data : list
        })
    }catch(err){
        next(err)
    }
}

export const countByType = (req,res,next) => {
    try{
        const hotelCount = Hotel.countDocuments({type : "hotel"})
        const apartmentCount = Hotel.countDocuments({type : "apartment"})
        const resortCount = Hotel.countDocuments({type : "resort"})
        const villaCount = Hotel.countDocuments({type : "villa"})
        const cabinCount = Hotel.countDocuments({type : "cabin"})

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
          ])
    }catch(err){
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map(room => {
                return Room.findById(room)
            })
        )

        return res.status(200).json({
            success: true,
            data : list
        })
    }catch(err){
        next(err);
    }
    
}