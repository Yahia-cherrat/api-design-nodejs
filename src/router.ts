import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { 
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from './handlers/product'
import { 
    createUpdate,
    deleteUpdate,
    getOneUpdate,
    getUpdates, 
    updateUpdate
} from './handlers/update'

const router = Router()

/**
 * @description Product routes
 */
router.get('/products', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id',
    body('name').isString(), 
    handleInputErrors,
    updateProduct
)
router.post('/product', 
    body('name').isString(), 
    handleInputErrors,
    createProduct
)
router.delete('/product/:id', deleteProduct)

/**
 * @description Update routes
 */
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', [
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'PENDING', 'COMPLETED']).optional(),
    body('version').optional()
], updateUpdate)
router.post('/update', [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
], createUpdate)
router.delete('/update/:id', deleteUpdate)

/**
 * @description UpdatePoint routes
 */
router.get('/update-point', () => {})
router.get('/update-point/:id', () => {})
router.put('/update-point/:id', [
    body('name').optional().isString(),
    body('description').optional().isString()
], () => {})
router.post('/update-point', [
    body('updateId').isString(),
    body('name').isString(),
    body('description').exists().isString()
], () => {})
router.delete('/update-point/:id', () => {})

export default router