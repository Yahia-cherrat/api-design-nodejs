import prisma from "../db"

// GET ALL
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, products) => {
        return [...allUpdates, ...products.updates]
    }, [])

    res.json({data: updates})
}

// GET ONE UPDATE
export const getOneUpdate = async (req, res) => {
    const update = await prisma.product.findUnique({
        where: {
            id: req.params.id,
        }
    })

    res.json({data: update})
}

// CREATE UPDATE
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
        }
    })

    if (!product) {
        return res.status(404).json({message: 'Product not found!'})
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}},
        }
    })

    res.json({message: 'Successfully created!', data: update})
}

// UPDATE --UPDATE--
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, products) => {
        return [...allUpdates, ...products.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.status(404).json({message: 'Update not found!'})
    }

    const updatedUpdates = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({message: 'Successfully updated!', data: updatedUpdates})
}

// DELETE PRODUCT
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, products) => {
        return [...allUpdates, ...products.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        return res.status(404).json({message: 'Update not found!'})
    }

    const deleteUpdates = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({message: 'Successfully deleted!', data: deleteUpdates})
}