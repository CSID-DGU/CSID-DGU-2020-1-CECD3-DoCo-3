const express = require('express');
const router = express.Router();

router.get('/', async (req, res, _) => {
    const id = req.query.roomId
    rooms.delete(String(id));
    res.send(rooms)
});
module.exports = router