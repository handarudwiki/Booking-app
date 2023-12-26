import expres from "express"
import { verifyAdmin } from "../utils/verifyToken.js"
import { createRoom,getRoom,getRooms,updateRoom, updateRoomAvailability,deleteRoom } from "../controllers/roomController.js";

const router = expres.Router()

router.post('/:id',verifyAdmin, createRoom)
router.put('/:id',verifyAdmin, updateRoom)
router.put('/:id',verifyAdmin, updateRoomAvailability)
router.delete('/:id/:hotelId',verifyAdmin, deleteRoom)
router.get('/:id',getRoom)
router.get('/',getRooms)

export default router;