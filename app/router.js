const { Router } = require('express');

const router = Router();

const osuController = require('./controllers/osuController');

router.get('/:suffix', osuController.access);

router.post('/:suffix', osuController.create);

router.delete('/:suffix', osuController.delete);

// en dernier ressort
router.use(osuController.notFound);

module.exports = router;