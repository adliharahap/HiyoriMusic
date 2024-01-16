// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import Sound from 'react-native-sound';

// const Test_metadata = () => {
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);

//   useEffect(() => {
//     Sound.setCategory('Playback');
//     return () => {
//       if (sound) {
//         sound.release();
//       }
//     };
//   }, []);

//   const loadAudio = () => {
//     const audioPath = 'file:///storage/emulated/0/Music/Night Changes X Night Changes - One Direction - Tik Tok Version.mp3'; // Gantilah dengan path yang sesuai
//     const newSound = new Sound(audioPath, '', (error) => {
//       if (error) {
//         console.error('Gagal memuat suara:', error);
//       } else {
//         setSound(newSound);
//         setDuration(newSound.getDuration());
//       }
//     });
//   };

//   const playPauseToggle = () => {
//     if (sound) {
//       if (isPlaying) {
//         sound.pause();
//       } else {
//         sound.play((success) => {
//           if (success) {
//             console.log('Pemutaran selesai');
//           } else {
//             console.error('Gagal memutar suara');
//           }
//         });
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const skipToPrev = () => {
//     // Logika untuk melompati lagu sebelumnya
//   };

//   const skipToNext = () => {
//     // Logika untuk melompati lagu berikutnya
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Judul Lagu: Nama Lagu</Text>
//       <Text>Artis: Nama Artis</Text>
//       <Text>Durasi: {currentTime.toFixed(2)}/{duration.toFixed(2)} detik</Text>

//       <View style={styles.controls}>
//         <Button title="Prev" onPress={skipToPrev} />
//         <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playPauseToggle} />
//         <Button title="Next" onPress={skipToNext} />
//       </View>

//       <Button title="Load Audio" onPress={loadAudio} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
// });

// export default Test_metadata


import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.add({
        id: '1',
        url: 'file:///storage/emulated/0/Music/Night Changes X Night Changes - One Direction - Tik Tok Version.mp3',
        title: 'Nama Lagu',
        artist: 'Nama Artis',
      });
      const trackDuration = await TrackPlayer.getDuration();
      setDuration(trackDuration);
    };

    setupPlayer();
  }, []);

  const playPauseToggle = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipToPrev = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  return (
    <View style={styles.container}>
      <Text>Judul Lagu: Nama Lagu</Text>
      <Text>Artis: Nama Artis</Text>
      <Text>Durasi: {position.toFixed(2)}/{duration.toFixed(2)} detik</Text>

      <View style={styles.controls}>
        <Button title="Prev" onPress={skipToPrev} />
        <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playPauseToggle} />
        <Button title="Next" onPress={skipToNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default AudioPlayer;