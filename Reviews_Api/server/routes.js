const controller = require('./controller/reviews_controller')
const express = require('express')
const router = express.Router();

router.get('/loaderio-50d0aa09b183d77aaf74dd5692940074.html', controller.getVerifyLoader)
router.get('/reviews', controller.getReviews)
router.get('/reviews/meta',controller.getReviewsMeta)
router.post('/reviews', controller.postReviews)
router.put('/reviews/:review_id/report', controller.updateReport)
router.put('/reviews/:review_id/helpful', controller.updateHelpful)


module.exports = router;