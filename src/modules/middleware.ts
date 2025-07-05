import { validationResult } from "express-validator"

export const handleInputErrors = (req, res, next) => {
    const err = validationResult(req)
    console.log(err)

    if (!err.isEmpty) res.status(400).json({errors: err.array()})
    else next()
}