import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { categoryValidation } from './category.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post('/',auth(USER_ROLE.instructor), validateRequest(categoryValidation.createCategoryValidationSchema), CategoryControllers.createCategory);

router.get('/', CategoryControllers.getAllCategory);

router.get('/:categoryId', CategoryControllers.getSingleCategory);

router.patch('/:categoryId',auth(USER_ROLE.instructor), CategoryControllers.updateSingleCategory);

router.delete('/:categoryId',auth(USER_ROLE.instructor), CategoryControllers.deleteCategory);

export const categoryRouter = router;
