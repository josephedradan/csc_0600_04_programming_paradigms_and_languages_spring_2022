CREATE TABLE songs (
	song_id INTEGER PRIMARY KEY AUTOINCREMENT,
	song_title text NOT NULL,
	notes varchar,
	path_song varchar
);

INSERT INTO songs (song_title, notes)
VALUES ('Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4') ;

INSERT INTO songs (song_title, notes)
VALUES ('Testing D4 D4', 'D4 D4') ;

INSERT INTO songs (song_title, path_song)
VALUES ('Tone Player Example (gong_1)', 'https://tonejs.github.io/audio/berklee/gong_1.mp3') ;

INSERT INTO songs (song_title, path_song)
VALUES ('Tone Player Example (chime_1)', 'https://tonejs.github.io/audio/berklee/chime_1.mp3') ;

INSERT INTO songs (song_title, path_song)
VALUES ('Tone Player Example (handdrum-loop)', 'https://tonejs.github.io/audio/drum-samples/handdrum-loop.mp3') ;

INSERT INTO songs (song_title, path_song)
VALUES ('Calvin Harris - Summer', '/summer.mp3') ;

INSERT INTO songs (song_title, path_song)
VALUES ("You're On (feat. Kyan)", '/your_on.flac') ;

INSERT INTO songs (song_title, path_song)
VALUES ("Thinking About You (Feat. Ayah Marar)", '/thinking_about_you.mp3') ;

INSERT INTO songs (song_title, path_song)
VALUES ("Porter Robinson & Madeon – Shelter (Original Mix)", '/shelter.flac') ;
