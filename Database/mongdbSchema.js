import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewsSchema = new Schema({
    product: String,
    page: Number,
    count: Number,
    name: String,
    body: String,
    email: String,
    characteristics: Schema.Types.ObjectId,
    results: [
        {
            review_id: Number,
            rating: Number,
            summary: String,
            recommend: Boolean,
            response: String,
            body: String,
            date: Date,
            reviewer_name: String,
            helpfulness: Number,
            photos: [{
                id: Number,
                url: String
            }
            ]
        }]
});


const Reviews = mongoose.model('Reviews', reviewsSchema);


const metaSchema = new Schema({
    product_id: String,
    ratings: {
        2: Number,
        3: Number,
        4: Number,
        // ...
    },
    recommended: {
        0: Number
        // ...
    },
    characteristics: {
        Size: {
            id: Number,
            value: Number
        },
        Width: {
            id: Number,
            value: Number
        },
        Comfort: {
            id: Number,
            value: Number
        },
    }
});


const Meta = mongoose.model('Meta', metaSchema);


