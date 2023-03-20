// 3rd party library imports
import classNames from 'classnames';
import {List} from 'immutable';
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Music20, RadioButton20, RadioButtonChecked20,} from '@carbon/icons-react';

// project imports
import {DispatchAction} from './Reducer';
import {AppState} from './State';
import {Instrument} from './Instruments';
import {Visualizer} from './Visualizers';


/** ------------------------------------------------------------------------ **
 * SideNav component
 ** ------------------------------------------------------------------------ */

type SideNavProps = {
    state: AppState;
    dispatch: React.Dispatch<DispatchAction>;
};

export function SideNav({state, dispatch}: SideNavProps): JSX.Element {
    /**
     *
     * SideNav
     * |-----------------|
     * | Nameless App    |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   |
     * |                 |
     * | InstrumentsNav  |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   |
     * |                 |
     * | VisualizersNav  |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   |
     * |                 |
     * | SongsNav        |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   |
     * |                 |
     * |-----------------|
     */

    return (
        <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
            <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
                Nameless App
            </div>
            <div className="flex-auto">
                <InstrumentsNav state={state} dispatch={dispatch}/>
                <VisualizersNav state={state} dispatch={dispatch}/>
                <SongsNav state={state} dispatch={dispatch}/>
            </div>
        </div>
    );
}


/** ------------------------------------------------------------------------ **
 * SideNav Sub-Components
 ** ------------------------------------------------------------------------ */

function InstrumentsNav({state}: SideNavProps): JSX.Element {
    /**
     *  InstrumentsNav
     *  |-----------------|
     *  | Section         |
     *  | |-------------| |
     *  | | RadioButton | |
     *  | |-------------| |
     *  | | RadioButton | |
     *  | |-------------| |
     *  |      ...        |
     *  |-----------------|
     */

    const instruments: List<Instrument> = state.get('instruments');
    const activeInstrument = state.get('instrument')?.name;
    const location = useLocation();

    return (
        <Section title="Instruments">
            {instruments.map(i => (
                <RadioButton
                    key={i.name}
                    to={`/${i.name}${location.search}`}
                    text={i.name}
                    active={i.name === activeInstrument}
                    onClick={() => console.log(i.name)}
                />
            ))}
        </Section>
    );
}

function VisualizersNav({state}: SideNavProps): JSX.Element {
    /**
     *  VisualizersNav
     *  |-----------------|
     *  | Section         |
     *  | |-------------| |
     *  | | RadioButton | |
     *  | |-------------| |
     *  | | RadioButton | |
     *  | |-------------| |
     *  |      ...        |
     *  |-----------------|
     */

    const visualizers: List<Visualizer> = state.get('visualizers');
    const activeVisualizer = state.get('visualizer')?.name;
    const location = useLocation();

    return (
        <Section title="Visualizers">
            {visualizers.map(v => (
                <RadioButton
                    key={v.name}
                    to={{
                        pathname: location.pathname,
                        search: `?visualizer=${v.name}`,
                    }}
                    text={v.name}
                    active={v.name === activeVisualizer}
                    onClick={() => console.log(v.name)}
                />
            ))}
        </Section>
    );
}

function SongsNav({state, dispatch}: SideNavProps): JSX.Element {
    /**
     *
     *  SongsNav
     *  |-----------------|
     *  | Section         |
     *  | |-------------| |
     *  | | Music20     | |
     *  | |-------------| |
     *  | | Music20     | |
     *  | |-------------| |
     *  |      ...        |
     *  |-----------------|
     */

    const songListLoadedInMemory: List<any> = state.get("songs", List()); // Constant

    const [inputText, setStateInputText] = useState<string>("");

    function getSongListFilteredBySearch(songList: List<any>) {
        return songList.filter((song: any) => {
            if (song.get("songTitle").toLowerCase().includes(inputText.toLowerCase())){
                return true
            }
            return false
        });
    };

    return (
        <Section title="Playlist">
            <input
                type="text"
                value={inputText}
                style={{width: "100%", padding: "10px", backgroundColor: "rgba(236,236,236,1)"}}
                onChange={(e) => {
                    setStateInputText(e.target.value);
                }}
            />
            <button style={{width:"100%"}} onClick={()=>{
                dispatch(
                    new DispatchAction("STOP_SONG"))
            }}>
                Stop song
            </button>
            {getSongListFilteredBySearch(songListLoadedInMemory).map((song) => (
                <div
                    key={song.get("song_id")}
                    className="f6 pointer underline flex items-center no-underline i dim"
                    onClick={() => {
                        console.log("PLAYING SONG")
                        console.log(song.get('song_id')) // This does not work
                        console.log(song.get('songId')) // This works
                        console.log(state.toJS()) // THIS IS BETTER PRINTER
                        // console.log("############################################################")
                        dispatch(
                            new DispatchAction("PLAY_SONG", {
                                id: song.get("songId"),
                            })
                        )
                    }
                    }
                >
                    <p style={{fontSize: "16px"}}>
                        <Music20 className="mr1"/>
                        {song.get("songTitle")}
                    </p>
                </div>
            ))}

        </Section>
    );

}


/** ------------------------------------------------------------------------ **
 * Auxilliary components
 ** ------------------------------------------------------------------------ */

/** ------------------------------------- **
 * Radio Button
 ** ------------------------------------- */

type RadioButtonProps = {
    to: any,
    text: string,
    active: boolean,
    onClick: () => void
};

function RadioButton({to, text, active, onClick}: RadioButtonProps): JSX.Element {
    return (
        <Link to={to} className="no-underline">
            <div
                className={classNames('f6 flex items-center black', {fw7: active})}
                onClick={onClick}
            >
                {active ? (
                    <RadioButtonChecked20 className="mr1"/>
                ) : (
                    <RadioButton20 className="mr1"/>
                )}
                <div className="dim">{text}</div>
            </div>
        </Link>
    );
}


/** ------------------------------------- **
 * Section
 ** ------------------------------------- */

const Section: React.FC<{ title: string }> = ({title, children}) => {
    return (
        <div className="flex flex-column h-25 bb b--light-gray pa3">
            <div className="fw7 mb2">{title} </div>
            <div className="flex-auto overflow-scroll">{children}</div>
        </div>
    );
};
