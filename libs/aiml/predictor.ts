import { IPredictData, JSONObject } from '@/types/definations';
import * as tf from '@tensorflow/tfjs';

const SEQUENCE_LENGTH = 3;

export class Predictor {
    private model:  tf.Sequential | null = null;
    private min: number = 0;
    private max: number = 0;
    
    async train(data: number[]) {
        if (data.length <= SEQUENCE_LENGTH) {
            throw new Error(`Need more than ${SEQUENCE_LENGTH} data points.`);
        }
        
        tf.disposeVariables();
        
        
        // Normalize the data
        this.min = Math.min(...data);
        this.max = Math.max(...data);
        
        // Prepare sequences
        const xs: number[][][] = [];
        const ys: number[] = [];
        
        // Normalize the input sequences
        for (let i = 0; i < data.length - SEQUENCE_LENGTH; i++) {
            const seq = data.slice(i, i + SEQUENCE_LENGTH).map((v: number) => [this.normalize(v)]);
            xs.push(seq);
            ys.push(this.normalize(data[i + SEQUENCE_LENGTH]));
        }
        
        /**
         * xs.length, SEQUENCE_LENGTH, 1] ==> [batchSize, sequenceLength, features]
         * Explain: 
         *** xs.length → Number of training examples (batches)
            *** SEQUENCE_LENGTH → How many time steps in each sequence (e.g., 3 months of data)
            *** 1 → Each time step has 1 feature (just the value)
            * */
        const inputTensor = tf.tensor3d(xs, [xs.length, SEQUENCE_LENGTH, 1]);
        const outputTensor = tf.tensor2d(ys, [ys.length, 1]);
        
        this.model = tf.sequential();
        this.model.add(tf.layers.lstm({ units: 50, inputShape: [SEQUENCE_LENGTH, 1] }));
        this.model.add(tf.layers.dense({ units: 1 }));
        this.model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

        await this.model.fit(inputTensor, outputTensor, {
            epochs: 200,
            verbose: 0,
        });

        tf.dispose([inputTensor, outputTensor]);
    }
    
    predictNext(data: number[]): number {
        if (!this.model) throw new Error("Model is not trained yet.");
        if (data.length < SEQUENCE_LENGTH) throw new Error("Insufficient sequence data.");

        const lastSequence = data
            .slice(-SEQUENCE_LENGTH)
            .map(v => [this.normalize(v)]);
        const input = tf.tensor([lastSequence]);
        const prediction = this.model.predict(input) as tf.Tensor;
        const predictedNormalized = prediction.dataSync()[0];
        tf.dispose([input, prediction]);

        return this.denormalize(Math.round(predictedNormalized));
    }
    
    private normalize(v: number): number {
        return (v - this.min) / (this.max - this.min);
    }

    private denormalize(v: number): number {
        return v * (this.max - this.min) + this.min;
    }
}