// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';


export const WaveFormCircle = new Visualizer(
    'WaveFormCircle',
    (p5: P5, analyzer: Tone.Analyser) => {
        const xMax = window.innerWidth;
        const yMax = window.innerHeight / 2;
        const dim = Math.min(xMax, yMax);

        // p5.background(0, 0, 0, 255);
        //
        // p5.strokeWeight(dim * 0.01);
        // p5.stroke(255, 255, 255, 255);
        // p5.noFill();

        const toneWaveform = analyzer.getValue(); // Instrument key but in float 32

        // console.log(toneWaveform) // array of 255 waveform
        // console.log(analyzer.type) // waveform

        p5.background(0, 0, 0, 255); // Black

        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255); // White
        p5.noFill(); // Removes the body color of the shape


        p5.angleMode(p5.DEGREES) // Must use
        p5.translate(xMax / 2, yMax / 2); // Centers the shape

        /*

        Reference:
            Code an Audio Visualizer in p5js (from scratch) | Coding Project #17
                Notes:
                Reference:
                    https://www.youtube.com/watch?v=uk96O7N1Yo0
         */
        for (let side = -1; side <= 1; side += 2) {
            p5.beginShape();
            for (let i = 0; i <= 180; i++) {

                // Map traveling half a circle to the indices of the waveform
                let indexCorrected = p5.floor(p5.map(i, 0, 180, 0, toneWaveform.length/ 2));

                // console.log(indexCorrected)

                let amplitude = toneWaveform[indexCorrected] as number;

                let r = p5.map(
                    amplitude,
                    -1, // Scale from -1 to 1
                    1,
                    xMax / 6, // Scaling the shape by the xMax
                    yMax / 6, // Scaling the shape by the yMax
                );

                let x = r * p5.sin(i) * side;
                let y = r * p5.cos(i);

                p5.vertex(x, y);
            }
            p5.endShape();
        }

    },
    false,
    'waveform'
);
