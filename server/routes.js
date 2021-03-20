const controller = require('./controller/reviews_controller')
const express = require('express')
const router = express.Router();


router.get('/reviews', controller.getReviews)
router.get('/reviews/meta',controller.getReviewsMeta)
router.post('/reviews', controller.postReviews)
router.put('/reviews/:review_id/report', controller.updateReport)
router.put('/reviews/:review_id/helpful', controller.updateHelpful)


module.exports = router;
