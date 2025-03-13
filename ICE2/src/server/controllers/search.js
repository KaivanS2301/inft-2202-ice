const Animal = require('../models/Animal.js'); 

module.exports = {
    handle: async (req, res, next) => {
        try {
            const { page = 1, perPage = 10 } = req.query;

            // Ensure page and perPage are numbers
            const pageNumber = parseInt(page);
            const perPageNumber = parseInt(perPage);

            // Define query parameters
            const where = {}; // Fetch all records
            const fields = {}; // Fetch all fields
            const options = {
                skip: (pageNumber - 1) * perPageNumber,
                limit: perPageNumber,
                sort: { createdAt: -1 } // Sort by newest first
            };

            // Count total documents
            const totalDocuments = await Animal.countDocuments(where);
            const totalPages = Math.ceil(totalDocuments / perPageNumber);

            // Pagination object
            const pagination = {
                page: pageNumber,
                perPage: perPageNumber,
                totalPages,
                totalRecords: totalDocuments
            };

            // Fetch records
            const records = await Animal.find(where, fields, options);

            // Send response
            res.json({ pagination, records });
        } catch (error) {
            next(error); // Pass errors to Express error handler
        }
    }
};
