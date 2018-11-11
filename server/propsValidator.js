const { body, validationResult } = require("express-validator/check");

const nameValidation = body("name").trim()
    .exists({ checkFalsy: false }).withMessage("Name must be set.")
    //.isLength({ min: 15, max: 15 }).withMessage("IMEI must be 15 characters long");

const jobValidation = body("job").trim()
    .exists({ checkFalsy: false }).withMessage("Job must be set.")


const propsValidator = [
    nameValidation,
    jobValidation
];

const validationResultFormatted = validationResult.withDefaults({
    formatter: ({ value, msg, nestedErrors }) => (
        {
            value, msg, nestedErrors
        }
    )
});

module.exports = { propsValidator, validationResultFormatted };