// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';


export const Test0 = new Visualizer(
    'Test0',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255);
        p5.noFill();

        const toneWaveform = analyzer.getValue(); // Instrument key but in float 32

        console.log(toneWaveform) // array of 255 waveform
        console.log(analyzer.type) // waveform

        // let fft = new FFT() // Does nto work

        p5.beginShape();
        // for (let i = 0; i < toneWaveform.length; i++) {
        //     const amplitude = toneWaveform[i] as number;
        //     const x = p5.map(i, 0, toneWaveform.length - 1, 0, width);
        //     const y = height / 2 + amplitude * height;
        //     // Place vertex
        //     p5.vertex(x, y);
        // }

        // FIXME: https://p5js.org/examples/3d-sine-cosine-in-3d.html
        p5.rotateY(p5.frameCount * 0.01);

        for (let j = 0; j < 5; j++) {
            p5.push();
            for (let i = 0; i < 80; i++) {
                p5.translate(
                    p5.sin(p5.frameCount * 0.001 + j) * 100,
                    p5.sin(p5.frameCount * 0.001 + j) * 100,
                    i * 0.1
                );
                p5.rotateZ(p5.frameCount * 0.002);
                p5.push();
                p5.sphere(8, 6, 4);
                p5.pop();
            }
            p5.pop();
        }


        p5.endShape();
    },
    true,
    'fft'
);
