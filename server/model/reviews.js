let csv = require('csv-parse');
let fs = require('file-system');
let filePath = '../../Datafiles/characteristic_reviews.csv'
const db = require('../../Database/db');
db.connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected');
});

//const file = fs.createWriteStream('../../example.txt');
let data = []
fs.createReadStream(filePath)
    .on('err', () => {
        console.log(err)
    })
    .pipe(csv())
    .on('data', function (row) {
        // let id = row[0];
        // let characteristic_id = row[1];
        // let review_id = row[2];
        // let value = row[3];
        data.push(row)
        // console.log(id + characteristic_id + review_id + value)
    }).on('end', function () {
        //'id', 'characteristic_id', 'review_id', 'value'
        data.shift();
        let query =
            "INSERT INTO characteristics_reviews (id, characteristic_id, review_id, value) VALUES ? ";
        db.connection.query(query, [data], (error, response) => {
            console.log(error || response);
        });
    })


// const getData = function (calback) {

//     if (characteristics.length) {
//         for (var i = 0; i < characteristics.length; i++) {
//             console.log(characteristics[i]);
//         }
//     }
// }


// LOAD DATA LOCAL INFILE '/Users/momosun/workspace/hackreactor/SDC-Project/Reviews/Datafiles/reviews_photos.csv'
// INTO TABLE photos
// FIELDS TERMINATED BY ','
// ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// IGNORE 1 ROWS;


// getData();
// module.exports = {
//     getData: getData
// };