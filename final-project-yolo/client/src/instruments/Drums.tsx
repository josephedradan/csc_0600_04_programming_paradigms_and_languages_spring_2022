// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import {List} from "immutable";
import React, {useCallback, useEffect, useRef} from "react";

// project imports
import {Instrument, InstrumentProps} from "../Instruments";

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Drums.
 ** ------------------------------------------------------------------------ */

interface DrumKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    x_pos: number;
    y_pos: number;
    color: string;
    width: number;
    height: number;
}

const GREEN: RGBAColor = {red: 124, green: 252, blue: 0, alpha: 1}

function getRGBAColorString(rgbaColor: RGBAColor): string {
    return `rgb(${rgbaColor.red},${rgbaColor.green},${rgbaColor.blue},${rgbaColor.alpha})`
}

function fadeElement(element: HTMLElement, durationSeconds: number): void {

    const SPEED_MILLISECONDS = 10

    const durationMilliseconds = durationSeconds * 1000

    let changeMilliseconds: number = durationMilliseconds

    const backgroundColorOld = element.style.backgroundColor;

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
            element.style.backgroundColor = ""; // If you spam then the background color will be what the click color will be
            clearInterval(timer)
        }
    }

    const timer: ReturnType<typeof setInterval> = setInterval(fade, SPEED_MILLISECONDS)


}


export function DrumKey({
                            note,
                            synth,
                            minor,
                            // index,
                            x_pos,
                            y_pos,
                            color,
                            width,
                            height,
                        }: DrumKeyProps): JSX.Element {

    const divCurrent = useRef<HTMLDivElement>(null);
    let isClicked: boolean = false

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
        console.log(divCurrent)
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
            fadeElement(divCurrent.current, 0.50)
            divCurrent.current.style.backgroundColor = getRGBAColorString(GREEN);

            isClicked = false;
        }

        synth?.triggerRelease("+0.50")
    }

    function onMouseLeave(): void {
        if (divCurrent !== null && divCurrent.current !== null && isClicked) {
            fadeElement(divCurrent.current, 0.50)
            isClicked = false;

        }
    }
    return (
        <div
            ref={divCurrent}
            onMouseDown={() => {
                onMouseDown()
            }}
            onMouseUp={() => {
                onMouseUp()
            }}
            onMouseLeave={() => {
                onMouseLeave()
            }}
            className={classNames("ba pointer absolute dim", {
                "black bg-light-yellow": color === "#fbf1a9", // super cheap trick to fix the fade overwriting background color
            })}
            // add custom height and width for each in the list

            id={note}
            style={{
                left: `${x_pos}px`,
                top: `${y_pos}px`,
                backgroundColor: `${color}`,
                width: `${width}px`,
                height: `${height}px`,
                position: "absolute",
                borderRadius: "100%",
            }}
        />
    );
}

interface RGBAColor {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

function Drums({synth, setSynth}: InstrumentProps): JSX.Element {
    // 8 things 3 that have a higher note
    const lowOctave = 2;
    const highOctave = 4;
    // x and y coordinates
    const drumKeys = List([
        {
            note: "C",
            x_pos: 310,
            y_pos: 200,
            // x_pos: 0,
            // y_pos: 0,
            octave: 2,
            color: "white",
            height: 100,
            width: 100,
        },
        {
            note: "D",
            x_pos: 285,
            y_pos: 140,
            // x_pos: 0,
            // y_pos: 0,
            octave: 2,
            color: "white",
            height: 70,
            width: 70,
        },
        {
            note: "E",
            x_pos: 185,
            y_pos: 135,
            // x_pos: 0,
            // y_pos: 0,
            octave: 2,
            color: "white",
            height: 70,
            width: 70,
        },
        {
            note: "F",
            x_pos: 145,
            y_pos: 200,
            // x_pos: 0,
            // y_pos: 0,
            octave: 2,
            color: "white",
            height: 85,
            width: 85,
        },
        // high notes
        {
            note: "G",
            x_pos: 417,
            y_pos: 190,
            // x_pos: 0,
            // y_pos: 0,
            octave: 4,
            color: "#fbf1a9",
            height: 85,
            width: 85,
        },
        {
            note: "A",
            x_pos: 357,
            y_pos: 105,
            // x_pos: 0,
            // y_pos: 0,
            octave: 4,
            color: "#fbf1a9",
            height: 85,
            width: 85,
        },
        {
            note: "B",
            x_pos: 91,
            y_pos: 110,
            // x_pos: 0,
            // y_pos: 0,
            octave: 4,
            color: "#fbf1a9",
            height: 85,
            width: 85,
        },
        {
            note: "C",
            x_pos: 51,
            y_pos: 187,
            // x_pos: 0,
            // y_pos: 0,
            octave: 4,
            color: "#fbf1a9",
            height: 85,
            width: 85,
        },
    ]);

    const setOscillator = () => {
        setSynth((oldSynth) => {
            oldSynth.disconnect();
            return new Tone.MonoSynth({
                oscillator: {type: "triangle8"} as Tone.OmniOscillatorOptions,
                envelope: {
                    attack: 0.1,
                },
            }).toDestination() as any;
        });
    };

    // order of drumKeys are q,w,e,r,a,s,d,f,  z,x,c,v
    const keyCodeLookUpTable: { [key: string]: string } = {
        "q": (drumKeys.get(0)?.note + lowOctave.toString()) as string,
        "w": (drumKeys.get(1)?.note + lowOctave.toString()) as string,
        "e": (drumKeys.get(2)?.note + lowOctave.toString()) as string,
        "r": (drumKeys.get(3)?.note + lowOctave.toString()) as string,
        "a": (drumKeys.get(4)?.note + highOctave.toString()) as string,
        "s": (drumKeys.get(5)?.note + highOctave.toString()) as string,
        "d": (drumKeys.get(6)?.note + highOctave.toString()) as string,
        "f": (drumKeys.get(7)?.note + highOctave.toString()) as string,
    };



    const keyStrokes = useCallback(
        (e) => {

            const value = keyCodeLookUpTable[e.key]
            if(value){

                console.log(value)

                const element = document.getElementById(value) as HTMLElement
                fadeElement(element, 0.5)

                synth?.triggerAttack(value);
                synth?.triggerRelease("+0.5");
            }


        },
        [synth]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyStrokes);
        return () => {
            document.removeEventListener("keydown", keyStrokes);
        };
    }, [keyStrokes]);

    // init sound
    useEffect(() => {
        setOscillator();
        return () => {
        };
    }, []);

    return (
        <div className="pv4">
            <div className="drumSet" style={{
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center"
            }}>
                {drumKeys.map((key) => {
                    const note = `${key.note}${key.octave}`;
                    return (
                        <DrumKey
                            key={note} //react key
                            note={note}
                            synth={synth}
                            octave={key.octave}
                            x_pos={key.x_pos}
                            y_pos={key.y_pos}
                            color={key.color}
                            width={key.width}
                            height={key.height}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export const DrumInstrument = new Instrument("Drums", Drums);
