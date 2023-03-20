// 3rd party
import {fromJS, List, Map} from 'immutable';

// project deps
import {AppState} from './State';

import {Instrument} from './Instruments';
import {Visualizer} from './Visualizers';
import * as Tone from "tone";


/**
 * State: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument,
 * 'visualizer': Visualizer,
 * 'instruments': List<Instrument>,
 * 'visualizers': List<Visualizer>,
 * 'songs': List<string>,
 * 'notes': List<{id: number, songTitle: string, notes: string}>,
 * 'socket': Socket,
 */


/** ------------------------------------------------------------------------ **
 * All user input is handled by DispatchAction.
 ** ------------------------------------------------------------------------ */

type DispatchArgs = {
    [key: string]: any;
};

// A simple algebraic data-p5createCanvas3d with string literal types
type DispatchActionType =
    | 'SET_SOCKET'
    | 'DELETE_SOCKET'
    | 'SET_SONGS'
    | 'PLAY_SONG'
    | 'STOP_SONG'
    | 'SET_LOCATION'
    | 'ADD_PLAYER';

export class DispatchAction {
    readonly type: DispatchActionType;
    readonly args: Map<string, any>;

    constructor(type: DispatchActionType, args?: DispatchArgs) {
        this.type = type;
        this.args = fromJS(args) as Map<string, any>;
    }
}

/** ------------------------------------------------------------------------ **
 * Top-level application reducer.
 ** ------------------------------------------------------------------------ */

export function appReducer(state: AppState, action: DispatchAction): AppState {
    const {type, args} = action;

    console.debug(`${type}`);

    // Question: Does this function remind of you registering callbacks?
    const newState = (() => {
        switch (type) {
            case 'SET_SOCKET': {
                console.log("SET_SOCKET")
                const oldSocket = state.get('socket');
                if (oldSocket) {
                    oldSocket.close();
                }

                return state.set('socket', args.get('socket'));
            }
            case 'DELETE_SOCKET': {
                console.log("DELETE_SOCKET")

                return state.delete('socket');
            }
            case 'SET_SONGS': {
                console.log("SET_SONGS")

                const songs = args.get('songs');
                return state.set('songs', songs);
            }
            case 'PLAY_SONG': {
                console.log("PLAY_SONG")

                console.log(state.toJS())
                console.log()
                console.log("state.get('songs')")
                console.log(state.get('songs').toJS())

                console.log("args.get('id')")
                console.log(args.get('id'))
                console.log(args.get('song_id'))
                console.log(args.get('songId'))

                console.log("args.toJS()")
                console.log(args.toJS())


                const notes = state
                    .get('songs')
                    .find((s: any) => s.get('songId') === args.get('id'))
                    .get('notes');

                console.log('notes')
                console.log(notes)

                let stateNew = null;

                // UGLY CODE BUT WHATEVER
                if (notes === null) {

                    const pathSong = state
                        .get('songs')
                        .find((s: any) => s.get('songId') === args.get('id'))
                        .get('pathSong');

                    console.log('state pathSong')
                    console.log(state.toJS())

                    stateNew = state.set('pathSong', pathSong)
                } else {
                    /*
                    Notes:
                        state is a hash map with keys such as
                            songs
                            notes

                        In this case, notes will be added to the hash map and when STOP_SONG is called,
                        it will delete notes from the hashmap
                     */
                    console.log('state notes')
                    console.log(state.toJS())

                    stateNew = state.set('notes', notes);
                }


                // console.log("PAST notes")
                // console.log()
                // console.log(state)
                console.log("*** stateNew ***")
                console.log(stateNew.toJS())

                return stateNew;
            }
            case 'STOP_SONG': {
                console.log("STOP_SONG")
                // Tone.Transport.stop()
                // Tone.Transport.cancel()

                const player = state.get('player')

                console.log(player)

                if (player) {
                    player.stop()
                }

                let stateNew = state.delete('pathSong');
                stateNew = stateNew.delete('notes');

                console.log(stateNew.toJS())

                return stateNew

            }
            case 'SET_LOCATION': {
                console.log("SET_LOCATION")

                const pathname = args.getIn(['location', 'pathname'], '') as string;
                const search = args.getIn(['location', 'search'], '') as string;

                const instrumentName: string = pathname.substring(1);
                const visualizerName: string =
                    new URLSearchParams(search.substring(1)).get('visualizer') ?? '';

                const instruments: List<Instrument> = state.get('instruments');
                const visualizers: List<Visualizer> = state.get('visualizers');

                const instrument = instruments.find(i => i.name === instrumentName);
                const visualizer = visualizers.find(v => v.name === visualizerName);

                return state
                    .set('instrument', instrument)
                    .set('visualizer', visualizer);
            }
            case  'ADD_PLAYER': {
                const playerNew = args.get('player');

                const playerOld = state.get('player')

                if (playerOld) {
                    playerOld.stop()
                }

                return state.set('player', playerNew);
            }

            default:
                console.error(`type unknown: ${type}\n`, args.toJS());
                return state;
        }
    })();

    console.debug(newState.update('socket', s => (s ? '[socket]' : s)).toJS());

    return newState;
}
