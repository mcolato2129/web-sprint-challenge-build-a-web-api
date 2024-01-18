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

function validateActions(req, res, next) {
    const { notes, description, completed} = req.body;
    if (!notes || !notes.trim() || !description || !description.trim() || typeof completed !== 'boolean') {
        res.status(400).json({ message: 'the request body is missing notes, description or project_id' })
    } else {
        req.notes = notes;
        req.description = description;
        next();
    }
}

module.exports = {
    validateActionsId,
    validateActions
}
