const data = require('../model/reviews')


// const id = data[0][0]
// const product_id = data[0][1];
// const name = data[0][2];

console.log('hi' + typeof data.getData)

const resolveData = () => {
    data.getData((result) => {
        console.log(result)
    })


}

resolveData()
