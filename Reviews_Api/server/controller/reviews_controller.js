let model = require('../model/reviews_model')
const updateReport = (req, res) => {
    const { review_id } = req.params;
    model.updateReport(review_id, (err, result) => {
        if (err) {
            res.status(404).send('fail')
        } else {
            res.send('successfully reported,thank you')
        }
    })
}


const updateHelpful = (req, res) => {

    console.log(req)
    // const { review_id } = req.params;
    // model.updateHelpful(review_id, (err, result) => {
    //     if (err) {
    //         console.log(err)
    //        // res.status(404).send('fail')
    //     } else {
    //         res.send('successfully reported,that really help other customers. Thank you')
    //     }
    // })
}

const postReviews = (req, res) => {
    let { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = req.body

    model.postReviews(product_id, rating, summary, body, recommend, name, email, photos, characteristics, (err, result) => {
        if (err) {
            res.send('unable to post reviews')
            //console.log(err)
        } else {
            res.send('Thanks for the review')
            // console.log(result)
        }
    });
}

const getReviews = (req, res) => {

    let { product_id, count, page, sort } = req.query
    // console.log(typeof page)
    if (sort === "newest") {
        sort = "date"
    } else if (sort === "helpful") {
        sort = "recommend"
    }
    model.getReviews(product_id, count, page, sort, function (err, results) {
        if (err) {
            res.send(err)
        }
        res.send(results)
    })

}

const getReviewsMeta = (req, res) => {

    const { product_id } = req.query
    // model.getReviewsMeta(product_id, function (err, result) {
    //     if (err) {
    //         res.send(err)
    //     } else {

    //         res.send(result)
    //     }
    // })

    // console.log(model.getReviewsMeta(product_id))
    model.getReviewsMeta(product_id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })

}




module.exports = {
    updateReport,
    updateHelpful,
    postReviews,
    getReviews,
    getReviewsMeta
}

// getReviews,
//     getReviewsMeta,
//     postReviews,
//     postPhotos,
//     postCharacteristics,
//     postCharacteristicsReviews,
//     updateHelpful,
//     updateReport