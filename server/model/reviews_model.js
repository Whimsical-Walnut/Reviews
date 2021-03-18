const db = require('../../Database/db');
db.connection.connect(function (err) {
    if (err) {
        console.error('connected');
        return;
    }
    console.log('connected');
});




const postReviews = (product_id, rating, summary, body, recommend, name, email, photos, characteristics) => {
    let newReviewId = 0;
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
            console.log(err)
        } else {
            newReviewId = result.insertId;
            postCharacteristics(product_id, characteristics, newReviewId)


        }
    })

}

const postCharacteristics = (product_id, characteristics, review_id) => {

    let promises = []
    let newCharacteristicId = 0;
    let names = Object.keys(characteristics);
    for (var i = 0; i < names.length; i++) {
        //insert to characteristics table
        let promise = new Promise((resolve, reject) => {
            let name = names[i]
            let body = {
                product_id,
                name
            }
            let query = 'insert into characteristics set ?'
            db.connection.query(query, body, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
        //insert to characteristics_reviews table
        promises.push(promise);
    }
    Promise.all(promises)
        .then(values => {
            values.forEach(value => {
                newCharacteristicId = value.insertId
                if (review_id !== undefined) {
                    postCharacteristicsReviews(characteristics, review_id, newCharacteristicId)
                }
            })

        })
        .catch(err => console.log(err))
    //console.log('loaded')
}


const postCharacteristicsReviews = (characteristics, review_id, characteristic_id) => {
    let promises = []
    let names = Object.keys(characteristics);
    for (var i = 0; i < names.length; i++) {
        //insert to characteristics table
        let promise = new Promise((resolve, reject) => {
            let query = 'insert into characteristics_reviews set ?'
            let value = characteristics[names[i]];
            let body = {
                value,
                review_id,
                characteristic_id
            }
            db.connection.query(query, body, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
        //insert to characteristics_reviews table
        promises.push(promise);
    }
    Promise.all(promises)
        .then(values => {
            values.forEach(value => {
                // console.log(value.insertId)
                //console.log('new characteristic value insert')
            })

        })
        .catch(err => console.log(err))
    //console.log('loaded')

}

const updateHelpful = (review_id, callback) => {
    db.connection.query('select helpfulness from review where id =1', function (err, result) {
        if (err) {
            console.log(err)
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
postReviews(1, 5, 'awesome', 'good product', false, 'momo', 'mosun111@gamil.com', 'http:///', { world: 3.5000, value: 3.5000 });
postCharacteristics(1, { world: 3.5000, value: 3.5000 });
postCharacteristicsReviews({ world: 3.5000, value: 3.5000 }, 885495, 1)

//why callback is not a function here if pass as a param

