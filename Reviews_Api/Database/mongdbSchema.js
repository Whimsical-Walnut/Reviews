import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewsSchema = new Schema({
    product: String,
    page: Number,
    count: Number,
    name: String,
    body: String,
    email: String,
    characteristics: { type: Schema.Types.ObjectId, ref: 'Meta' },
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
            report: Number,
            photos: [{
                id: Number,
                url: String
            }
            ]
        }]
});


const Reviews = mongoose.model('Reviews', reviewsSchema);



