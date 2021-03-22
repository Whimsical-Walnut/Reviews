// import http from 'k6/http';
// import { sleep } from 'k6';

// const BASE_URL = 'http://localhost:3000';
// export let options = {
//     //vus: 50,
//     // ext: {
//     //     loadimpact: {
//     //         projectID: 3530441,
//     //         // Test runs with the same name groups test runs together
//     //         name: "Momo Sun"
//     //     }
//     // },
//     stages: [
//         { duration: '2m', target: 100 }, // below normal load
//         { duration: '5m', target: 100 },
//         { duration: '2m', target: 200 }, // normal load
//         { duration: '5m', target: 200 },
//         { duration: '2m', target: 300 }, // around the breaking point
//         { duration: '5m', target: 300 },
//         { duration: '2m', target: 400 }, // beyond the breaking point
//         { duration: '5m', target: 400 },
//         { duration: '10m', target: 0 }, // scale down. Recovery stage.
//       ],
// };
// export default function () {

//     for (var id = 0; id <= 100; id++) {
//         http.get(`${BASE_URL}/reviews/meta?product_id=${id}`);
//     }
//     sleep(1);

// }


import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { Counter } from "k6/metrics";

const BASE_URL = 'http://localhost:3000';

// let errorRate = new Rate('errors');
// let CounterErrors = new Counter("Errors");

export let options = {
    //vus: 10,
    //duration: '30s',
    thresholds: {
        http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
        http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'], //reponse tiem latency 
        http_req_waiting:['count >=300'] //thoughput
   
         // 95% of requests should be below 200ms (latency=>response time)
    },
    // ext: {
    //     loadimpact: {
    //         projectID: 3530441,
    //         // Test runs with the same name groups test runs together
    //         name: "Momo Sun"
    //     }
    // },
    stages: [
        { duration: "1m", target: 20 },//
        { duration: "3m", target: 100 } // thoughput should be shoud be 3*100
        // { duration: "1m", target: 0 },
    ],
    // stages: [
    //     { duration: '2m', target: 100 }, // below normal load
    //     { duration: '5m', target: 100 },
    //     { duration: '2m', target: 200 }, // normal load
    //     { duration: '5m', target: 200 },
    // { duration: '2m', target: 300 }, // around the breaking point
    // { duration: '5m', target: 300 },
    // { duration: '2m', target: 400 }, // beyond the breaking point
    // { duration: '5m', target: 400 },
    // { duration: '10m', target: 0 }, // scale down. Recovery stage.
    // ],
};
export default function () {
    let metaReq = {
        method: 'GET',
        url: `${BASE_URL}/reviews/meta`,
        params: {
            product_id: 13
        },
    };

    let reviewReq = {
        method: 'GET',
        url: `${BASE_URL}/reviews`,
        params: {
            product_id: 1,
            page: 0,
            count: 2,
            sort: 'newest'
        },
    };

    let postReviewReq = {
        method: 'POST',
        url: `${BASE_URL}/reviews`,
        body: {
            "product_id": "13",
            "rating": "4",
            "summary": "I love this product",
            "body": "I will buy next time",
            "name": "momolove",
            "recommend": true,
            "email": "momolove@gamil.com",
            "photos": ["http:..", "heep:"],
            "characteristics": { "size": "2.9" }
        },
    }

    let postReportReq = {
        method: 'PUT',
        url: `${BASE_URL}/reviews/:review_id/report`,
        params: {
            review_id: 4
        },
    };

    let postHelpeReq = {
        method: 'PUT',
        url: `${BASE_URL}/reviews/:review_id/helpful`,
        params: {
            review_id: 4
        },
    }


    let responses = http.batch([metaReq, reviewReq, postReviewReq, postReportReq, postHelpeReq])
    check(responses[0], {
        'GET RESPONSE': (res) => res.status === 200
    })


    sleep(1);

}