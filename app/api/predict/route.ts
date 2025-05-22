// import * as tf from '@tensorflow/tfjs-node';
import { Predictor } from '@/libs/aiml/predictor';
import * as tf from '@tensorflow/tfjs';

export async function POST(request: Request) {
    try {
        await tf.ready();

        const { data } = await request.json();
        const predictor = new Predictor();
        await predictor.train(data);
        
        // Predict next 5 years
        const futureSteps = 5;
        let sequence = [...data];
        const predictions = [];

        for (let i = 0; i < futureSteps; i++) {
            const next = predictor.predictNext(sequence);
            sequence.push(next);
            predictions.push(next);
        }
        
        return Response.json({ predicted: predictions}, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
