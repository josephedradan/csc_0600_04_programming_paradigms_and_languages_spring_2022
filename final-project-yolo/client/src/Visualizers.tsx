// 3rd party library imports
import * as Tone from 'tone';
import Sketch from 'react-p5';
import P5 from 'p5';
import React, {useCallback, useEffect, useMemo} from 'react';

type VisualizerDrawer = (p5: P5, analyzer: Tone.Analyser) => void;

interface VisualizerContainerProps {
    visualizer: Visualizer;
}

/**
 * Visualizer Class
 */
export class Visualizer {
    public readonly name: string;
    public readonly draw: VisualizerDrawer;
    public readonly p5createCanvas3d: boolean; // 3rd argument for the createCanvas function call
    public readonly toneAnalyzerType: "waveform" | "fft"; // 3rd argument for the createCanvas function call

    constructor(name: string, draw: VisualizerDrawer, p5createCanvas3d: boolean, toneAnalyzerType: "waveform" | "fft") {
        this.name = name;
        this.draw = draw;
        this.p5createCanvas3d = p5createCanvas3d;
        this.toneAnalyzerType = toneAnalyzerType;
    }
}

/*
React stuff

 */
export function VisualizerContainer({visualizer}: VisualizerContainerProps) {
    const {name, draw, p5createCanvas3d, toneAnalyzerType} = visualizer;

    const analyzer: Tone.Analyser = useMemo(
        () => {
            return new Tone.Analyser(toneAnalyzerType, 2048) // WAS 256
        },
        [],
    );

    const onResize = useCallback((p5: P5) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;

        p5.resizeCanvas(width, height, false);
    }, []);

    useEffect(() => {
        Tone.getDestination().volume.value = -5;
        Tone.getDestination().connect(analyzer);
        return () => {
            Tone.getDestination().disconnect(analyzer);
        };
    }, [analyzer]);

    // p5 setup
    const setup = (p5: P5, canvasParentRef: Element) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;

        if (p5createCanvas3d) {
            p5.createCanvas(width, height, "webgl").parent(canvasParentRef);

        } else {
            p5.createCanvas(width, height).parent(canvasParentRef);
        }

    };

    return (
        <div className={'bg-black absolute bottom-0 right-0 left-0 h-50'}>
            <div className={'z-1 absolute left-0 top-0 pa4 white f5'}>{name}</div>
            <Sketch
                setup={setup}
                draw={p5 => draw(p5, analyzer)}
                windowResized={onResize}
            />
        </div>
    );
}
