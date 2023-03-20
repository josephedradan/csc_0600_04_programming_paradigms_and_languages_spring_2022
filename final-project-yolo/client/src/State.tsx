// 3rd party
import {List, Map} from 'immutable';


// project dependencies

// Instruments
import {PianoInstrument} from './instruments/Piano';
import {Test0Instrument} from './instruments/JosephEdradan';
import {DrumInstrument} from './instruments/Drums';

// Visualizers
import {WaveformVisualizer} from './visualizers/Waveform';
import {WaveFormCircle} from './visualizers/WaveFormCircle';
import {FFTVisualizer} from "./visualizers/FFT";
import {WaveForm3d} from "./visualizers/WaveForm3d";
import {Test0} from './visualizers/Test0';
import {Test1} from "./visualizers/Test1";
import {FFT3dVisualizer} from "./visualizers/FFT3d";
import {FFT3dExaggeratedVisualizer} from "./visualizers/FFT3dExaggerated";


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument,  DrumInstrument, Test0Instrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, FFTVisualizer, WaveFormCircle, WaveForm3d, FFT3dVisualizer, FFT3dExaggeratedVisualizer, Test0, Test1]);    // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
    'instruments': instruments,
    'visualizers': visualizers,
});
