// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';


export const FFT3dVisualizer = new Visualizer(
    'Frequency 3D',
    (p5: P5, analyzer: Tone.Analyser) => {
        /*
        Notes:
            xMax 1527 yMax 429.5
            Window starts at top left corner

        Reference:
            p5.js map()
                Notes:
                    Like JavaFX
                Reference:
                    https://p5js.org/reference/#/p5/map

            Tone.Analyser
                Notes:
                    Give the type parameter 'fft' or 'waveform' to get either one out when you call .getValue()
                Reference:

            p5.FFT
                Notes:
                    The below code is based off of this website

                Reference:
                    https://p5js.org/reference/#/p5.FFT

        */
        const xMax = window.innerWidth;
        const yMax = window.innerHeight / 2;
        const dim = Math.min(xMax, yMax);

        // console.log(`W ${xMax} H ${yMax}`)

        p5.background(0, 0, 0); // Black (0,0,0)

        p5.strokeWeight(dim * 0.01);

        p5.stroke(255, 255, 255, 0); // The shape (Rect) boarder color
        // p5.noStroke() // The shape (Rect) boarder color

        p5.fill(255, 255, 255); // The shape (Rect) inside color

        const toneFFT = analyzer.getValue();

        p5.background(0, 0, 0, 255); // Black

        p5.strokeWeight(dim * 0.01); // Width of ring (Ring thickness)
        p5.stroke(255, 255, 255, 255); // White
        p5.noFill(); // Removes the body color of the shape

        p5.orbitControl(); // MUST BE PLACED BEFORE ANY MOVEMENT/ROTATION TO WORK PROPERLY

        p5.angleMode(p5.DEGREES) // Must use
        p5.rotateX(45) // Rotate in 3d
        p5.translate(0,-100,-100)
        // p5.translate(xMax / 2, yMax / 2); // Centers the shape // DO NOT CALL THIS


        /*

        Reference:
            Sine wave structures in p5.js | Coding Project #1
                Notes:
                Reference:
                    https://www.youtube.com/watch?v=vmhRlDyPHMQ
         */

        const diskSizeMultiplier = 10; // Size multiplier for the disks
        const diskAmount = 100; // Amount of rings

        /*
        Amount of time to complete a cycle
        Value above 1.0 will complete the shape assuming ringDivisionSize can divide cycle
         */
        const cycleMultiplier = 1.001
        const ringDivisionSize = 10 // Size of the divisions on a ring

        // const diskDelayTimeMultiplier = 10;
        const zAxisJumpSizeMultiplier = 1;

        /* ***** Actual constants ***** */

        const cycles = 360 * cycleMultiplier
        const jumpAmountActual = ringDivisionSize < cycles ? ringDivisionSize : cycles
        const heightsPerDisk = toneFFT.length / diskAmount

        for (let indexDisk = 0; indexDisk < diskAmount; indexDisk++) {

            const heightsArray = toneFFT.slice(
                indexDisk * heightsPerDisk,
                (indexDisk + 1) * heightsPerDisk
            )

            let amplitudeAverage: number = 0

            heightsArray.forEach((element) => {
                amplitudeAverage += element as number
            })

            amplitudeAverage = amplitudeAverage / heightsArray.length

            // console.log(amplitudeAverage)

            let radius = indexDisk * diskSizeMultiplier

            // const indexCorrected = p5.floor(p5.map(indexDisk, -1, 1, -100, 100))

            let amplitude = toneFFT[indexDisk] as number;

            amplitude = Math.max(-400, amplitude * zAxisJumpSizeMultiplier) // Arbitrary value of -400

            // console.log(`${amplitude}`) // Negative numbers

            p5.beginShape()
            for (let j = 0; j < cycles; j += jumpAmountActual) {

                let x = radius * p5.cos(j)
                let y = radius * p5.sin(j)

                // console.log(`${x} ${y} ${amplitude}`)

                p5.vertex(x, y, amplitude * zAxisJumpSizeMultiplier)
            }
            p5.endShape()
        }
    },
    true,
    'fft'
);
