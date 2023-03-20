// 3rd party library imports
import React, {useEffect, useState} from 'react';
import * as Tone from 'tone';

// project imports
import {DispatchAction} from './Reducer';
import {AppState} from './State';

/** ------------------------------------------------------------------------ **
 * Contains base implementation of an Instrument.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
    state: AppState;
    dispatch: React.Dispatch<DispatchAction>;
    name: string;
    synth: Tone.Synth;
    setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
}

export class Instrument {
    public readonly name: string;
    public readonly component: React.FC<InstrumentProps>;

    constructor(name: string, component: React.FC<InstrumentProps>) {
        this.name = name;
        this.component = component;
    }
}

function TopNav({name}: { name: string }) {
    return (
        <div
            className={
                'w-100 h3 bb b--light-gray flex justify-between items-center ph4'
            }
        >
            <div>{name}</div>
        </div>
    );
}

interface InstrumentContainerProps {
    state: AppState;
    dispatch: React.Dispatch<DispatchAction>;
    instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
                                                                            instrument,
                                                                            state,
                                                                            dispatch,
                                                                        }: InstrumentContainerProps) => {
    const InstrumentComponent = instrument.component;
    const [synth, setSynth] = useState(
        new Tone.Synth({
            oscillator: {type: 'sine'} as Tone.OmniOscillatorOptions,
        }).toDestination(),
    );

    const notes = state.get('notes');
    const pathSong = state.get('pathSong');

    useEffect(() => {
        console.log("InstrumentContainer.useEffect notes")

        console.log(state.toJS())

        if (notes && synth) {
            let eachNote = notes.split(' ');

            console.log("eachNote")
            console.log(eachNote)

            let noteObjs = eachNote.map((note: string, idx: number) => ({
                idx,
                time: `+${idx / 4}`,
                note,
                velocity: 1,
            }));
            console.log("noteObjs")
            console.log(noteObjs)

            new Tone.Part((time, value) => {
                // the value is an object which contains both the note and the velocity
                synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
                if (value.idx === eachNote.length - 1) {
                    dispatch(new DispatchAction('STOP_SONG'));
                }
            }, noteObjs).start(0);

            console.log("AFTER START")

            Tone.Transport.start();

            return () => {
                Tone.Transport.cancel();
            };
        } else if (pathSong) {
            /*
            Notes:
                Tone.Player
                    Refernece:
                        https://tonejs.github.io/docs/14.7.77/Player
             */
            console.log("InstrumentContainer.useEffect pathSong")

            dispatch(new DispatchAction('STOP_SONG'));

            const player = new Tone.Player(pathSong).toDestination();

            dispatch(new DispatchAction('ADD_PLAYER', {
                player: player
            }))



            // play as soon as the buffer is loaded
            player.autostart = true; // Need this
            // player.start(0) // DO NOT CALL THIS

            player.volume.value = -12

            Tone.Transport.start();
            return () => {
                Tone.Transport.cancel();
            };
        }


        return () => {
        };
    }, [notes, pathSong, synth, dispatch]);

    return (
        <div>
            <TopNav name={instrument.name}/>
            <div
                className={'bg-white absolute right-0 left-0'}
                style={{top: '4rem'}}
            >
                <InstrumentComponent
                    name={instrument.name}
                    state={state}
                    dispatch={dispatch}
                    synth={synth}
                    setSynth={setSynth}
                />
            </div>
        </div>
    );
};
