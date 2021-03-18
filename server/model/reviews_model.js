const db = require('../../Database/db');
db.connection.connect(function (err) {
    if (err) {
        console.error('connected');
        return;
    }

    console.log('connected');
});


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

    // let query = 'update review set reported=? where id = ?'
    // db.connection.query(query, [true, review_id], function (err, result) {
    //     if (err) {
    //         callback(err, null)
    //     } else {
    //         callback(null, result)
    //     }
    // })
};

updateReport(1, function (err, result) {
    console.log('got it');
})

updateHelpful(1, function (err, result) {
    console.log('update it');
})