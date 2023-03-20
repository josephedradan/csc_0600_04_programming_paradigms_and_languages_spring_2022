// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';


export const Test1 = new Visualizer(
    'Test1',
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

        console.log(toneWaveform) // array of 255 waveform
        // console.log(analyzer.type) // waveform

        p5.background(0, 0, 0, 255); // Black

        p5.strokeWeight(dim * 0.01); // Width of ring (Ring thickness)
        p5.stroke(255, 255, 255, 255); // White
        p5.noFill(); // Removes the body color of the shape


        p5.angleMode(p5.DEGREES) // Must use
        p5.rotateX(60)

        // p5.translate(xMax / 2, yMax / 2); // Centers the shape // DO NOT CALL THIS

        /*

        Reference:
            Sine wave structures in p5.js | Coding Project #1
                Notes:
                Reference:
                    https://www.youtube.com/watch?v=vmhRlDyPHMQ
         */

        const diskSizeMultiplier = 20; // Size multiplier for the disks
        const ringAmount = 10; // Amount of rings

        /*
        Amount of time to complete a cycle
        Value above 1.0 will complete the shape assuming ringDivisionSize can divide cycle
         */
        const cycleMultiplier = 1.001
        const ringDivisionSize = 1 // Size of the divisions on a ring

        const diskDelayTimeMultiplier = 10;
        const zAxisJumpSizeMultiplier = 50;

        /* ***** Actual constants ***** */

        const cycles = 360 * cycleMultiplier
        const jumpAmountActual = ringDivisionSize < cycles ? ringDivisionSize : cycles


        for (let i = 0; i < ringAmount; i++) {
            p5.beginShape()
            for (let j = 0; j < cycles; j += jumpAmountActual) {

                let radius = i * diskSizeMultiplier

                let x = radius * p5.cos(j)
                let y = radius * p5.sin(j)
                let z = p5.sin(p5.frameCount + (i * diskDelayTimeMultiplier)) * zAxisJumpSizeMultiplier // p5.frameCount is a literal int counter...


                p5.vertex(x, y, z)
            }
            p5.endShape()
        }

    },
    true,
    'waveform'
);
