const db = require('../../Database/db');
db.connection.connect(function (err) {
    if (err) {
        console.error('connected');
        return;
    }
    console.log('connected');
});


const getReviews = (product_id, callback) => {
    let query = 'select * from review where product_id = ?';
    db.connection.query(query, [product_id], function (err, results) {
        if (err) {
            callback(err, null)
        } else {
            let promises = [];
            for (var i = 0; i < results.length; i++) {
                promises.push(new Promise((resolve, reject) => {
                    let reviewObject = {
                        review_id: results[i].id,
                        rating: results[i].rating,
                        recommend: results[i].recommend,
                        response: results[i].response,
                        body: results[i].body,
                        date: results[i].date,
                        reviewer_name: results[i].reviewer_name,
                        helpeful: results[i].helpfulness,
                        photos: []
                    }
                    resolve(reviewObject);
                }))
            }
            return Promise.all(promises)
                .then((review) => {
                    let promises = []
                    for (let j = 0; j < review.length; j++) {
                        let query = 'select * from photos where review_id = ?';
                        promises.push(new Promise((resolve, reject) => {
                            db.connection.query(query, review[j].review_id, function (err, photos) {
                                if (err) {
                                    reject(err)
                                } else {
                                    for (var k = 0; k < photos.length; k++) {
                                        let photoObject = {
                                            id: photos[k].id,
                                            url: photos[k].url
                                        }
                                        review[j].photos.push(photoObject)
                                    }
                                    resolve(review[j])
                                }
                            })
                        }))
                    }
                    return Promise.all(promises)
                }).then((results) => {
                    callback(null, results)
                })
                .catch(err => callback(err, null))
        }
    })
}


// const getPhotos = (review_id, callback) => {
//     let query = 'select * from photos where review_id = ?';
//     db.connection.query(query, [review_id], function (err, results) {
//         if (err) {
//             callback(err, null)
//         } else {
//             callback(null, results)
//         }
//     })
// }

const getReviewsMeta = (product_id) => {
    let query = 'select * from review where product_id = ?';
}

const postReviews = (product_id, rating, summary, body, recommend, name, email, photos, characteristics, callback) => {


    let query = 'insert into review set ?';
    let reviewBody = {
        product_id: product_id,
        rating: rating,
        summary: summary,
        body: body,
        recommend: recommend,
        reviewer_name: name,
        reviewer_email: email,
        date: new Date()
    }
    db.connection.query(query, reviewBody, function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            // newReviewId = result.insertId;
            callback(err, postCharacteristics(product_id, characteristics, result.insertId))
            postPhotos(result.insertId, photos)
        }
    })
}

const postPhotos = (review_id, photos) => {
    //insert array of urls to database
    for (var i = 0; i < photos.length; i++) {
        //insert to characteristics table
        let photo = photos[i]

        let body = {
            review_id,
            url: photo
        }
        let query = 'insert into photos set ?'
        db.connection.query(query, body, function (err, result) {
            if (err) {
                return err
            } else {
                return result.insertId;
            }
        })
    }
}

const postCharacteristics = (product_id, characteristics, review_id) => {
    let promises = []
    let names = Object.keys(characteristics);
    for (var i = 0; i < names.length; i++) {
        //insert to characteristics table
        promises.push(
            new Promise((resolve, reject) => {
                let name = names[i]
                let body = {
                    product_id,
                    name
                }
                console.log(body)
                let query = 'insert into characteristics set ?'
                db.connection.query(query, body, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        )
        //insert to characteristics_reviews table
    }
    Promise.all(promises)
        .then(values => {
            for (let i = 0; i < values.length; i++) {
                return postCharacteristicsReviews(characteristics, review_id, values[i].insertId)
            }
        })
        .catch(err => {
            return err
        })
}


const postCharacteristicsReviews = (characteristics, review_id, characteristic_id) => {
    let names = Object.keys(characteristics);
    for (var i = 0; i < names.length; i++) {
        //insert to characteristics table
        // let promise = new Promise((resolve, reject) => {
        let query = 'insert into characteristics_reviews set ?';
        let value = characteristics[names[i]];
        let body = {
            value,
            review_id,
            characteristic_id
        };

        console.log(body)
        db.connection.query(query, body, function (err, result) {
            if (err) {
                //callback(err, null);
                //console.log(err)
                return err
            } else {
                return result.insertId;
            }
        })
        // })
        //insert to characteristics_reviews table
        //     promises.push(promise);
        // }
        // Promise.all(promises)
        //     .then(values => {
        //         values.forEach(value => {
        //             // console.log(value.insertId)
        //             //console.log('new characteristic value insert')
        //         })

        //     })
        //     .catch(err => console.log(err))
        //console.log('loaded')
    }
}

const updateHelpful = (review_id, callback) => {
    db.connection.query('select helpfulness from review where id =1', function (err, result) {
        if (err) {
            return err
        } else {
            let helfulnessCount = result[0].helpfulness + 1;
            //console.log(result[0].helpfulness)
            let query = 'update review set helpfulness=? where id = ?'
            db.connection.query(query, [helfulnessCount, review_id], function (err, result) {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, result)
                }
            })
        }
    })
}



const updateReport = (review_id, callback) => {
    let query = 'update review set reported=? where id = ?'
    db.connection.query(query, [true, review_id], function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
};


// let query = 'update review set reported=? where id = ?'
// db.connection.query(query, [true, review_id], function (err, result) {
//     if (err) {
//         callback(err, null)
//     } else {
//         callback(null, result)
//     }
// })


// updateReport(1, function (err, result) {
//     console.log('got it');
// })

// updateHelpful(1, function (err, result) {
//     console.log('update it');
// })
//postReviews(1, 5, 'awesome', 'good product', false, 'momo', 'mosun111@gamil.com', ['http:///', 'http:///upslash'], { world: 3.5000, value: 3.5000 });
// postCharacteristics(1, { world: 3.5000, value: 3.5000 });
// postCharacteristicsReviews({ world: 3.5000, value: 3.5000 }, 885495, 1)

//why callback is not a function here if pass as a param


module.exports = {
    getReviews,
    getReviewsMeta,
    postReviews,
    postPhotos,
    postCharacteristics,
    postCharacteristicsReviews,
    updateHelpful,
    updateReport
}