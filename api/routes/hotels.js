import express from "express"
import {createHotel,updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


//CREATE
router.post('/',verifyAdmin,createHotel)

//UPDATE 
router.put('/:id',verifyAdmin,updateHotel)

//DELETE
router.delete('/:id',verifyAdmin,deleteHotel)

//GET ONE
router.get('/:id',getHotel)

//GET ALL
router.get('/',getHotels)
router.get('/countBycity',countByCity)
router.get('/countByType',countByType)
router.get('/rooms/:id',getHotelRooms)

export default router;

