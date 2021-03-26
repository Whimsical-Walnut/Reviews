const controller = require('./controller/reviews_controller')
const express = require('express')
const router = express.Router();

router.get('/loaderio-ea6a32148581ca35a52e601d77ff174e.html', controller.getVerifyLoader)
router.get('/reviews', controller.getReviews)
router.get('/reviews/meta',controller.getReviewsMeta)
router.post('/reviews', controller.postReviews)
router.put('/reviews/:review_id/report', controller.updateReport)
router.put('/reviews/:review_id/helpful', controller.updateHelpful)


module.exports = router;