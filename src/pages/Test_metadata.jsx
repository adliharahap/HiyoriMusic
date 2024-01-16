import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Sound from 'react-native-sound';
const jsmediatags = require('jsmediatags');
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';

const Test_metadata = () => {
  const [musicData, setMusicData] = useState(null);
  const defaultImageUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAS1BMVEW1tbX///+2trbR0dGvr6/MzMyysrL7+/v19fXX19e/v7/i4uKpqamenp7BwcGioqLs7OyYmJjn5+eLi4vU1NTHx8eFhYWQkJDw8PA11woWAAADG0lEQVR4nO3c23aqMBSF4STGgALiier7P+kGD+1Wi1ddaznXmP9NB72J30gAibYheS+k4DsK8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aPw7yuX9MZTF25WU4PegNrCcoxT+6w2orpwcRHW7oVxrTailbBRm0Qrod4kmglrrRuGmTA2SkQ7YTzqnIqGwnhUmUVLYVxpEE2FKueirTBug7jRWBirtTTRWhirQZhoLoxxKUv8AKEw0U5Y/xBFF6qdcEj/XW4ER7QTLtt++33TEJxEQ2FO3fJ+sJAjWgpDatf3k9KpMKR8Pxk3YiPaCsfj2yzKvQm3FoZ83V6sW6kRzYWhXG+MnoXX34g98NsLQ/E+hyFvvQtLMx32Uq/jU4TVzruw8TyH+TweDa1nYTUeiS3STxBO79vOnoVleoRaiy3STxDuJa+knyAM42l47BwLL4u0c7qLcf3NOIUrwUVqLxwf8vcHn7uJd2G/+8qSr8FcGFJJoi/BXigdhX+dV+Ht+5Z5/OFSWMKw2tZj52YZHApLaqr4XXX2Jhx98fecCMtQzQCdCMtyzhfj4EFYhnlgFP+ayS1R4foNUPDztMckhWX7Tig27FOSws07YJTbmXlMUDhtwLzp5EA4e6OYagS3Zh4SFL69zsRW68v6VsJGa5FKCtMbYHXy8PcWuZ4XdmIfNb0keaU5zgJ7ye3Dp0Tv+DMX0/NO6zo6JSr8/Vqz+NJbokH6nXd6ncV9fxDdHn1J+Ompf3r+bdpxAnX3voSfgFPXr+7zWO03p4O2T34XI5Xu1Oe0Trk7HLqs7tPYiUqp5Lbv21ySgU9pvzRdkh/n98GV97z1oxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxA/CvGjED8K8aMQPwrxoxC/dPunFY77B+gCGJm/tIG1AAAAAElFTkSuQmCC"; // Ganti dengan URL gambar default Anda

  useEffect(() => {
    const fetchAndParseMP3 = async () => {
      try {
        const path = "/storage/emulated/0/Music/James Arthur - Car's Outside_mTiWY9S_kuU.mp3";
        const tags = await new Promise((resolve) => {
          new jsmediatags.Reader(path)
            .read({
              onSuccess: (tag) => resolve(tag),
              onError: (error) => resolve(null),
            });
        });

        const stat = await RNFS.stat(path);

        const sound = new Sound(path, '', (error) => {
          if (error) {
            console.log('Error loading sound', error);
            return;
          }

          const duration = sound.getDuration();
          sound.release();

          // Menambahkan informasi tanggal dan ukuran file
          const fileDate = stat.mtime; // Tanggal file dimasukkan
          const fileSize = stat.size; // Ukuran file dalam byte 


          let base64Image = null;
          if (tags && tags.tags && tags.tags.picture) {
            // Jika tags, tags.tags, dan tags.tags.picture tidak null, konversi gambar ke base64
            base64Image = convertToBase64(tags.tags.picture.data);
          } else {
            // Jika tags, tags.tags, atau tags.tags.picture null, gunakan gambar default
            base64Image = defaultImageUri;
          }

          const musicInfo = {
            id: tags ? tags.tags.track : null,
            title: tags ? tags.tags.title : 'Unknown Title',
            artist: tags ? tags.tags.artist : 'Unknown Artist',
            album: tags ? tags.tags.album : 'Unknown Album',
            year: tags ? tags.tags.year : 'Unknown Year',
            duration: duration || 0,
            uri: path,
            thumbnailData: base64Image || defaultImageUri,
            fileDate: fileDate,
            fileSize: fileSize,
            // Anda dapat menambahkan properti lain sesuai kebutuhan
          };

          setMusicData(musicInfo);
        });
      } catch (error) {
        console.log("error : ", error);
      }
    };

    fetchAndParseMP3();
  }, []);

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

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View>
      <Text>Test_metadata</Text>
      {musicData && (
        <View>
          <Image source={{ uri: musicData.thumbnailData }} style={{ width: 200, height: 200 }} />
          <Text style={{ color: '#000000' }}>ID: {musicData.id}</Text>
          <Text style={{ color: '#000000' }}>URI: {musicData.uri}</Text>
          <Text style={{ color: '#000000' }}>Title: {musicData.title}</Text>
          <Text style={{ color: '#000000' }}>Artist: {musicData.artist}</Text>
          <Text style={{ color: '#000000' }}>Album: {musicData.album}</Text>
          <Text style={{ color: '#000000' }}>Year: {musicData.year}</Text>
          <Text style={{ color: '#000000' }}>Duration: {formatDuration(musicData.duration)}</Text>
          <Text style={{ color: '#000000' }}>tanggal: {formatDuration(musicData.fileDate)}</Text>
          <Text style={{ color: '#000000' }}>fileSize: {formatDuration(musicData.fileSize)}</Text>
        </View>
      )}
    </View>
  );
};

export default Test_metadata;
