const appNotFound = ( req, res ) => res.status(404).json({ error: 'no route found'});

module.exports = {
    appNotFound
}