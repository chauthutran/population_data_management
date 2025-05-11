// import * as tf from '@tensorflow/tfjs-node';
import * as tf from '@tensorflow/tfjs';


const SEQUENCE_LENGTH = 3;

export async function POST(request: Request) {
    try {
        await tf.ready();
        tf.disposeVariables();
        
        let model;

        const { data } = await request.json();
        if (data.length <= SEQUENCE_LENGTH) {
            throw new Error(`Need more than ${SEQUENCE_LENGTH} data points.`);
        }

        // Normalize the data
        const min = Math.min(...data);
        const max = Math.max(...data);

        // Prepare sequences
        const xs: number[][][] = [];
        const ys: number[] = [];
        
        for (let i = 0; i < data.length - SEQUENCE_LENGTH; i++) {
            xs.push(
                data
                    .slice(i, i + SEQUENCE_LENGTH)
                    .map((v: number) => [v]),
            );
            ys.push(data[i + SEQUENCE_LENGTH]);
        }

console.log("=== xs: ", xs);
console.log("ys: ", ys);
        const inputTensor = tf.tensor3d(xs, [xs.length, SEQUENCE_LENGTH, 1]);
        const outputTensor = tf.tensor2d(ys, [ys.length, 1]);

        // const outputTensor = tf.tensor(ys).reshape([ys.length, 1]);

        // Build the model
        model = tf.sequential();
        model.add(
            tf.layers.lstm({ units: 50, inputShape: [SEQUENCE_LENGTH, 1], returnSequences: false }),
        );
        model.add(tf.layers.dense({ units: 1 }));
        model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

        // Train the model
        await model.fit(inputTensor, outputTensor, {
            epochs: 200,
            verbose: 0,
        });

        // Prepare last input for prediction
        const lastSequence = data
            .slice(-SEQUENCE_LENGTH)
            .map((v: number) => [v]);
        const input = tf.tensor([lastSequence]);

        const prediction = model.predict(input) as tf.Tensor;
        const predictedNormalized = prediction.dataSync()[0];

        // Denormalize result
        const predictedValue = predictedNormalized * (max - min) + min;

        return Response.json({ predictedValue }, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}


// export async function POST(request: Request) {
//     try {
//         await tf.ready();
//         tf.disposeVariables();
        
//         let model;

//         const { data } = await request.json();
//         if (data.length <= SEQUENCE_LENGTH) {
//             throw new Error(`Need more than ${SEQUENCE_LENGTH} data points.`);
//         }

//         // Normalize the data
//         const min = Math.min(...data);
//         const max = Math.max(...data);
//         const normalized = data.map((v: number) => (v - min) / (max - min));

//         // Prepare sequences
//         const xs: number[][][] = [];
//         const ys: number[] = [];

//         // for (let i = 0; i < normalized.length; i++) {
//         //     xs.push(
//         //         normalized
//         //             .slice(i, i + SEQUENCE_LENGTH)
//         //             .map((v: number) => [v]),
//         //     );
//         //     ys.push(normalized[i + SEQUENCE_LENGTH]);
//         // }
        
//         for (let i = 0; i < data.length; i++) {
//             xs.push(
//                 data
//                     .slice(i, i + SEQUENCE_LENGTH)
//                     .map((v: number) => [v]),
//             );
//             ys.push(data[i + SEQUENCE_LENGTH]);
//         }

// console.log("=== xs: ", xs);
// console.log("ys: ", ys);
//         const inputTensor = tf.tensor3d(xs, [xs.length, SEQUENCE_LENGTH, 1]);
//         const outputTensor = tf.tensor2d(ys, [ys.length, 1]);

//         // const outputTensor = tf.tensor(ys).reshape([ys.length, 1]);

//         // Build the model
//         model = tf.sequential();
//         model.add(
//             tf.layers.lstm({ units: 50, inputShape: [SEQUENCE_LENGTH, 1], returnSequences: false }),
//         );
//         model.add(tf.layers.dense({ units: 1 }));
//         model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

//         // Train the model
//         await model.fit(inputTensor, outputTensor, {
//             epochs: 200,
//             verbose: 0,
//         });

//         // Prepare last input for prediction
//         const lastSequence = normalized
//             .slice(-SEQUENCE_LENGTH)
//             .map((v: number) => [v]);
//         const input = tf.tensor([lastSequence]);

//         const prediction = model.predict(input) as tf.Tensor;
//         const predictedNormalized = prediction.dataSync()[0];

//         // Denormalize result
//         const predictedValue = predictedNormalized * (max - min) + min;

//         return Response.json({ predictedValue }, { status: 200 });
//     } catch (error: any) {
//         return Response.json({ error: error.message }, { status: 500 });
//     }
// }
