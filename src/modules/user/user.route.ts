import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";


const router = Router();

router.post('/', validateRequest(userValidationSchema.registerUserValidationSchema), UserControllers.registerUser)
router.get('/', UserControllers.getAllUsers)
router.get('/:id', UserControllers.getSingleUser)
router.patch('/:id', UserControllers.updateSingleUser)
router.delete('/:id', UserControllers.deleteSingleUser)

export const userRouter = router;