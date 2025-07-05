import prisma from "../db"

// GET ALL
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({data: user.products})
}

// GET ONE PRODUCT
export const getOneProduct = async (req, res) => {
    const id = req.params.id
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({data: product})
}

// CREATE PRODUCT
export const createProduct = async (req, res, next) => {
    try { 
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })

        res.json({message: 'Successfully created!', data: product})
    } catch (error) {
        next(error)
    }
}

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    const updated = prisma.product.update({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        },
        data: {
            name: req.body.name,
        }
    })

    res.json({message: 'Successfully updated!', data: updated})
}

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    const deleted = prisma.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    res.json({message: 'Successfully deleted!', data: deleted})
}