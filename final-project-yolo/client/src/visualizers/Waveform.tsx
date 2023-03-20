// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';


export const WaveformVisualizer = new Visualizer(
    'Waveform',
    (p5: P5, analyzer: Tone.Analyser) => {
        const xMax = window.innerWidth;
        const yMax = window.innerHeight / 2;
        const dim = Math.min(xMax, yMax);

        p5.background(0, 0, 0, 255); // Black

        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255); // White
        p5.noFill();

        const toneWaveform = analyzer.getValue(); // Bounds are -1 to 1
        // console.log(toneWaveform)

        p5.beginShape();
        for (let i = 0; i < toneWaveform.length; i++) {
            const amplitude = toneWaveform[i] as number;
            const x = p5.map(i, 0, toneWaveform.length - 1, 0, xMax);
            const y = yMax / 2 + amplitude * yMax;

            // console.log(`(${x}, ${y})`)

            // Place vertex
            p5.vertex(x, y);
        }
        p5.endShape();
    },
    false,
    'waveform'
);
