const Actions = require('./actions-model')

async function validateActionsId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            res.status(404).json({ message: 'no action with given id' })
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: 'project is bad' })
    }
}

module.exports = {
    validateActionsId
}
