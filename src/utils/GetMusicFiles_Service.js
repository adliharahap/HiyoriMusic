import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetMusicFiles = () => {
  const EksternalStorage = RNFS.ExternalStorageDirectoryPath;

  const ignoredFolders = ['Android', 'WhatsApp Images','WhatsApp Documents','WhatsApp Stickers','WhatsApp Video','WhatsApp Video Notes','WhatsApp Voice Notes','WhatsApp Animated Gifs', 'shopeeID', '.mcs', '.sstmp', '.ext4','.datatmp','.804c9a5b09dc1e99aefe17dd530290c3']; // Tambahkan folder yang ingin diabaikan
  const musicData = {};

  const getMusic = async () => {
    try {
      const musicFiles = await RNFS.readDir(EksternalStorage);
      
      // Proses setiap folder di external storage
      for (const musicFile of musicFiles) {
        await processFolder(musicFile.path);
      }
      console.log('Finished processing music files');
    } catch (error) {
      console.log('Error reading Music folder:', error);
    }
  };
  getMusic();
  
  const processFolder = async (folderPath) => {
    try {
      // Cek apakah nama folder saat ini ada di dalam daftar yang diabaikan
      const folderName = folderPath.split('/').pop();
      if (ignoredFolders.includes(folderName)) {
        return;
      }

      const folderContents = await RNFS.readDir(folderPath);

      // Periksa apakah folderContents null atau kosong
      if (!folderContents || folderContents.length === 0) {
        // console.log(`MP3 files in folder [${folderPath}] = []`);
        return;
      }

      // Filter hanya folder (bukan file) kecuali folder yang diabaikan
      const subFolders = folderContents.filter(item =>
        item.isDirectory() && !ignoredFolders.includes(item.name)
      );

      // Proses setiap subfolder
      for (const subFolder of subFolders) {
        await processFolder(subFolder.path);
      }

      // Filter hanya file mp3 di dalam folder
      const mp3Files = folderContents.filter(item =>
        item.isFile() && item.name.endsWith('.mp3')
      );

      // Lakukan sesuatu dengan data file mp3
      mp3Files.forEach((mp3File) => {
        const { name, path, size, mtime } = mp3File;

        // Gunakan path sebagai kunci untuk menyimpan informasi lagu
        if (!musicData[path]) {
          musicData[path] = { name, path, size, mtime: new Date(mtime).toISOString(),};
        } else {
          // Handle duplikat (contoh: tambahkan informasi tambahan)
          console.log(`Duplicate song found: ${name} at ${path}`);
        }
      });
      // Lakukan sesuatu dengan data file mp3
      // console.log(`MP3 files in folder [${folderPath}] =`, mp3Files);
      // console.log(musicData);

      try {
        await AsyncStorage.setItem('musicData', JSON.stringify(musicData));
        // console.log("Berhasil menyimpan data");
      } catch (error) {
        console.log("error: ",error);
      }

      // try {
      //   const getdatamusic = await AsyncStorage.getItem('musicData');
      //   console.log(getdatamusic);
      // } catch (error) {
      //   console.log("error: ", error);
      // }
    } catch (error) {
      console.log(`Error processing folder [${folderPath}]:`, error);
    }
  };
};