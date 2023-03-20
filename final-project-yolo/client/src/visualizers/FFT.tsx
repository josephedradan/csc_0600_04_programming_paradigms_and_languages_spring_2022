// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import {Visualizer} from '../Visualizers';


export const FFTVisualizer = new Visualizer(
    'Frequency',
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

        console.log(`W ${xMax} H ${yMax}`)

        p5.background(0, 0, 0); // Black (0,0,0)

        p5.strokeWeight(dim * 0.01);

        p5.stroke(255, 255, 255, 0); // The shape (Rect) boarder color
        // p5.noStroke() // The shape (Rect) boarder color

        p5.fill(255, 255, 255); // The shape (Rect) inside color

        const toneFFT = analyzer.getValue();

        // console.log(toneFFT) // array of numbers of the frequency (amplitude?)

        //////////

        const binsAmount = 256;

        //////////
        const valuesPerBin = toneFFT.length / binsAmount

        p5.beginShape();
        for (let indexBin = 0; indexBin < binsAmount; indexBin++) {

            const valuesArray = toneFFT.slice(
                indexBin * valuesPerBin,
                (indexBin + 1) * valuesPerBin
            )

            let amplitudeAverage: number = 0

            valuesArray.forEach((element) => {
                amplitudeAverage += element as number
            })

            amplitudeAverage = amplitudeAverage / valuesArray.length

            // Can use this if binsAmount = toneFFT.length;
            const amplitude = toneFFT[indexBin] as number;


            const x = p5.map(indexBin, 0, binsAmount - 1, 0, xMax);

            /*

            Notes:
                value ,xCurrentRangeLow, xCurrentRangeHigh, yNewRangeLow, yNewRangeHigh

                Using yMax as the value for yNewRangeLow flips the range from negative to positive so you don't
                have to do h = h * -1

                Testing:
                    p5.map(amplitude, -1000 , 0, yMax, 0)
                        Approximate Pattern Example:
                            -400 -> 400, -300 -> 300
                        Pattern:
                            Flip the sign basically

                    p5.map(amplitude, 0, 255, yMax, 0)

                    p5.map(amplitude, 0 , -255, yMax, 0)
                        Notes:
                            Test values for the 3rd argument (2nd index) of the call
                                -255 is kinda big,
                                -100 looks good,
                                -1000 Can't make a distinction between frequencies as good as you would like

                        Approximate Pattern Example:
                            -400 -> 400, -300 -> 500
                        Pattern:
                            Less negative amplitude results to More positive h3


             */

            // const h1 = p5.map(amplitude, -1000 , 0, yMax, 0);
            // const h2 = p5.map(amplitude, 0, 255, yMax, 0);
            // const h3 = p5.map(amplitude, 0 , -1 * toneFFT.length, yMax, 0);
            const h3 = p5.map(amplitudeAverage, 0 , (-1) * binsAmount, yMax, 0); // Height

            // console.log(`AMP ${amplitude}, h1 ${h1}, h2 ${h2},  h3 ${h3}`)

            // console.log(h3)

            // Place rect (x, y, w, h)
            p5.rect(x, yMax, (xMax / binsAmount) - 1,  (h3 * -1))
        }

        p5.endShape();
    },
    false,
    'fft'
);
