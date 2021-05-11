const Joi = require('@hapi/joi');


const createSupportTicketSchema = Joi.object().keys({
    message: Joi.string().required(),
    status: Joi.string().valid('open', 'pending', 'resolved', 'closed').optional(),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent').optional(),
});

const listSupportTicketSchema = Joi.object().keys({
        page: Joi.number().optional(),
        message: Joi.string().optional(),
        status: Joi.string().valid('open', 'pending', 'resolved', 'closed').optional(),
        priority: Joi.string().valid('low', 'medium', 'high', 'urgent').optional(),
        sortBy: Joi.string().valid('status', 'priority', 'created_at', 'updated_at', 'deleted_at').optional(),
        sortValue: Joi.string().valid('ASC', 'DESC').optional(),
        userId: Joi.number().optional(),
        search: Joi.string().optional(),
});
module.exports = {
    createSupportTicketSchema,
    listSupportTicketSchema
};
