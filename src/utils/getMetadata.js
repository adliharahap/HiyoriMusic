import Sound from 'react-native-sound';
const jsmediatags = require('jsmediatags');
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
import { db } from './databases/database';
const converttoMB = require('./ConvertMusicSize');

const getMetadata = async (path) => {
  try {
    const defaultImageUri = "require('../img/Albums/defaultmusicthumnail.jpg')";
    const stat = await RNFS.stat(path);

    const tags = await new Promise((resolve) => {
      new jsmediatags.Reader(path)
        .read({
          onSuccess: (tag) => resolve(tag),
          onError: (error) => resolve(null),
        });
    });

    const sound = new Sound(path, '', (error) => {
      if (error) {
        console.log('Error loading sound', error);
        return;
      }

      const duration = sound.getDuration();
      sound.release();

      const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
    
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
      const getDuration = formatDuration(duration);

      // Konversi ukuran file dari byte ke megabyte
      const fileSize = stat.size;
      const getsize = fileSize;
      const convert = converttoMB.bytesToSize(getsize);

      // Konversi tanggal menjadi string dalam format yang diinginkan
      const fileDate = stat.mtime;
      const dateObject = new Date(fileDate);
      const localDate = dateObject.toLocaleString();

      let base64Image = null;
      if (tags && tags.tags && tags.tags.picture) {
        // Jika tags, tags.tags, dan tags.tags.picture tidak null, konversi gambar ke base64
        base64Image = convertToBase64(tags.tags.picture.data);
      } else {
        // Jika tags, tags.tags, atau tags.tags.picture null, gunakan gambar default
        base64Image = defaultImageUri;
      }

      const pathSegments = path.split('/');
      const lastPathSegment = pathSegments[pathSegments.length - 1];

      const musicInfo = {
        id: tags ? tags.tags.track : null,
        title: tags ? tags.tags.title || lastPathSegment.replace('.mp3', '') : lastPathSegment.replace('.mp3', ''),
        artist: tags ? tags.tags.artist || 'Unknown Artist' : 'Unknown Artist',
        album: tags ? tags.tags.album || 'Unknown Album' : 'Unknown Album',
        year: tags ? tags.tags.year || 'Unknown Year' : 'Unknown Year',
        duration: getDuration || 0,
        uri: path,
        thumbnailData: base64Image || defaultImageUri,
        fileDate: localDate,
        fileSize: convert,
      };

      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO MusicMetadata (Title, Artist, Album, Year, Duration, Uri, ThumnailData, FileDate, FileSize)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [musicInfo.title, musicInfo.artist, musicInfo.album, musicInfo.year, musicInfo.duration, musicInfo.uri, musicInfo.thumbnailData, musicInfo.fileDate, musicInfo.fileSize],
              (_, result) => console.log('Data inserted successfully'),
              (error) => console.error('Error inserting data: ', error)
          );
        },
        (error) => {
          console.error('Error opening or inserting data: ', error);
        }
      );
      
    });
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

const convertToBase64 = (arrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  // Ganti dengan implementasi pengonversi base64 yang cocok dengan Hermes
  const base64Image = `data:image/png;base64,${Buffer.from(binary, 'binary').toString('base64')}`;

  return base64Image;
};

export default getMetadata;