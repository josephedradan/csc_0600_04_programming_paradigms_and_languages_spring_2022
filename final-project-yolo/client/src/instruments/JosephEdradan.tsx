/*

References:
    Changing style of a button on click
        Notes:
            JS button and some react
        Reference:
            https://stackoverflow.com/a/59157864

    Refs and the DOM
        Notes:
            Ref to access to stuff
        Reference:
            https://reactjs.org/docs/refs-and-the-dom.html

    How to use React useRef with TypeScript
        Reference:
            https://linguinecode.com/post/how-to-use-react-useref-with-typescript


 */
// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import {List, Range} from 'immutable';
import React, {useEffect, useRef} from 'react';

// project imports
import {Instrument, InstrumentProps} from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Test0.
 ** ------------------------------------------------------------------------ */

interface Test0KeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the piano key
}

interface RGBAColor {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export function Test0Key({
                                     note,
                                     duration,
                                     synth,
                                     minor,
                                     octave,
                                     index,
                                 }: Test0KeyProps): JSX.Element {


    const GREEN: RGBAColor = {red: 124, green: 252, blue: 0, alpha: 1}

    function getRGBAColorString(rgbaColor: RGBAColor): string {
        return `rgb(${rgbaColor.red},${rgbaColor.green},${rgbaColor.blue},${rgbaColor.alpha})`
    }

    const divCurrent = useRef<HTMLDivElement>(null);
    let isClicked: boolean = false

    /*
    Reference:
        setInterval and setTimeout: timing events - Beau teaches JavaScript
            Reference:
                https://www.youtube.com/watch?v=kOcFZV3c75I
     */
    function fadeElement(element: HTMLDivElement, durationSeconds: number): void {

        const SPEED_MILLISECONDS = 10

        const durationMilliseconds = durationSeconds * 1000

        let changeMilliseconds: number = durationMilliseconds

        function fade(): void {

            let alpha: number = (changeMilliseconds / durationMilliseconds)

            element.style.backgroundColor = getRGBAColorString({
                red: 124,
                green: 252,
                blue: 0,
                alpha}
            )

            changeMilliseconds = changeMilliseconds - SPEED_MILLISECONDS

            if (changeMilliseconds < 0) {
                element.style.backgroundColor = "";
                clearInterval(timer)
            }
        }

        const timer: ReturnType<typeof setInterval> = setInterval(fade, SPEED_MILLISECONDS)
    }


    function onMouseDown(): void {
        // console.log("note")
        // console.log(note)
        // console.log("duration")
        // console.log(duration)
        // console.log("synth")
        // console.log(synth)
        // console.log("minor")
        // console.log(minor)
        // console.log("octave")
        // console.log(octave)
        // console.log("index")
        // console.log(index)
        // console.log("")
        // console.log(divCurrent)
        // console.log("#######################################################")

        if (divCurrent !== null && divCurrent.current !== null) {
            divCurrent.current.style.backgroundColor = getRGBAColorString(GREEN);
            isClicked = true;
        }

        synth?.triggerAttack(`${note}`)
    }

    function onMouseUp(): void {
        console.log(divCurrent)
        if (divCurrent !== null && divCurrent.current !== null) {
            fadeElement(divCurrent.current, 0.25)
            divCurrent.current.style.backgroundColor = getRGBAColorString(GREEN);

            isClicked = false;
        }

        synth?.triggerRelease("+0.25")
    }

    function onMouseLeave(): void {
        if (divCurrent !== null && divCurrent.current !== null && isClicked) {
            fadeElement(divCurrent.current, 0.25)
            isClicked = false;

        }
    }

    /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `Test0KeyWithoutJSX` for the React component without JSX.
     */
    return (
        // Observations:
        // 1. The JSX refers to the HTML-looking syntax within TypeScript.
        // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
        // 3. The curly braces `{` and `}` should remind you of string interpolation.
        <div
            ref={divCurrent}
            onMouseDown={() => {
                onMouseDown()

            }} // Question: what is `onMouseDown`?
            onMouseUp={() => {
                onMouseUp()
            }} // Question: what is `onMouseUp`?
            onMouseLeave={() => {
                onMouseLeave()
            }}
            className={classNames('ba pointer absolute dim', {
                'bg-black black h3': minor, // minor keys are black (Length of the key on the keyboard)
                'black bg-white h4': !minor, // major keys are white (Length of the key on the keyboard)
            })}
            style={{
                // CSS
                top: 0,
                left: `${index * 2}rem`,
                zIndex: minor ? 1 : 0,
                width: minor ? '1.5rem' : '2rem',
                marginLeft: minor ? '0.25rem' : 0,
            }}
        />
    );
    // return (
    //     // Observations:
    //     // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    //     // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    //     // 3. The curly braces `{` and `}` should remind you of string interpolation.
    //     <div
    //         onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
    //         onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
    //         className={classNames('ba pointer absolute dim', {
    //             'bg-black black h3': minor, // minor keys are black
    //             'black bg-white h4': !minor, // major keys are white
    //         })}
    //         style={{
    //             // CSS
    //             top: 0,
    //             left: `${index * 2}rem`,
    //             zIndex: minor ? 1 : 0,
    //             width: minor ? '1.5rem' : '2rem',
    //             marginLeft: minor ? '0.25rem' : 0,
    //         }}
    //     />
    // );
}

// eslint-disable-next-line
function Test0KeyWithoutJSX({
                                        note,
                                        synth,
                                        minor,
                                        index,
                                    }: Test0KeyProps): JSX.Element {
    /**
     * This React component for pedagogical purposes.
     * See `Test0Key` for the React component with JSX (JavaScript XML).
     */
    return React.createElement(
        'div',
        {
            onMouseDown: () => synth?.triggerAttack(`${note}`),
            onMouseUp: () => synth?.triggerRelease('+0.25'),
            className: classNames('ba pointer absolute dim', {
                'bg-black black h3': minor,
                'black bg-white h4': !minor,
            }),
            style: {
                top: 0,
                left: `${index * 2}rem`,
                zIndex: minor ? 1 : 0,
                width: minor ? '1.5rem' : '2rem',
                marginLeft: minor ? '0.25rem' : 0,
            },
        },
        [],
    );
}

/*
The html for the Oscillators
 */
function Test0Oscillators({title, onClick, active}: any): JSX.Element {
    return (
        <div
            onClick={onClick}
            className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
                'b--black black': active,
                'gray b--light-gray': !active,
            })}
        >
            {title}
        </div>
    );
}

/*
Essentially the main function that has storage and stuff and also does the html stuff
 */
function Test0({synth, setSynth}: InstrumentProps): JSX.Element {

    // Legal notes that can be played by the instrument for 1 octave
    const keys = List([
        {note: 'C', idx: 0},
        {note: 'Db', idx: 0.5},
        {note: 'D', idx: 1},
        {note: 'Eb', idx: 1.5},
        {note: 'E', idx: 2},
        {note: 'F', idx: 3},
        {note: 'Gb', idx: 3.5},
        {note: 'G', idx: 4},
        {note: 'Ab', idx: 4.5},
        {note: 'A', idx: 5},
        {note: 'Bb', idx: 5.5},
        {note: 'B', idx: 6},
    ]);

    // Function that swaps what the current Oscillator is
    const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
            oldSynth.disconnect();

            return new Tone.Synth({ // Hard coded
                oscillator: {type: newType} as Tone.OmniOscillatorOptions,
            }).toDestination();
        });
    };

    useEffect(() => {
        setOscillator("sawtooth");
        return () => {
        };
    }, []);

    // The Way a note can be played
    const oscillators: List<OscillatorType> = List([
        'sine',
        'sawtooth',
        'square',
        'triangle',
        'fmsine',
        'fmsawtooth',
        'fmtriangle',
        'amsine',
        'amsawtooth',
        'amtriangle',
    ]) as List<OscillatorType>;

    return (

        <div className="pv4"> {/*The keyboard*/}
            <div className="relative dib h4 w-100 ml4">
                {Range(2, 7).map(octave =>
                    keys.map(key => {
                        const isMinor = key.note.indexOf('b') !== -1;
                        const note = `${key.note}${octave}`;
                        return (
                            <Test0Key
                                key={note} //react key
                                note={note}
                                synth={synth}
                                minor={isMinor}
                                octave={octave}
                                index={(octave - 2) * 7 + key.idx}
                            />
                        );
                    }),
                )}
            </div>
            <div className={'pl4 pt4 flex'}> {/*The Oscillators below the keyboard*/}
                {oscillators.map(o => (
                    <Test0Oscillators
                        key={o}
                        title={o}
                        onClick={() => setOscillator(o)}
                        active={synth?.oscillator.type === o}
                    />
                ))}
            </div>
        </div>
    );
}

export const Test0Instrument = new Instrument('Test0', Test0);
