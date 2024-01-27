import RNFS from 'react-native-fs';
import { db } from './databases/database';

const cleanUpDatabaseIfMusicDoesntExits = () => {

    // Fungsi untuk mendapatkan semua path yang ada di database
    const getAllPathsFromDatabase = async () => {
        return new Promise((resolve) => {

            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT Uri FROM MusicMetadata;',
                    [],
                    (_, result) => {
                    const paths = [];
                    const rows = result.rows;

                    for (let i = 0; i < rows.length; i++) {
                        paths.push(rows.item(i).Uri);
                    }

                    resolve(paths);
                    },
                    (error) => {
                    console.error('Error getting paths from database: ', error);
                    resolve([]);
                    }
                );
            });
        });
    };

    // Fungsi untuk memeriksa keberadaan path di sistem file
    const isPathExistsInFileSystem = async (path) => {
        return RNFS.exists(path);
    };

    // Fungsi untuk menghapus data dari database berdasarkan path
    const deleteDataFromDatabase = (path) => {

        db.transaction((tx) => {
            tx.executeSql(
            'DELETE FROM MusicMetadata WHERE Uri = ?;',
            [path],
            (_, result) => console.log('Data deleted successfully'),
            (error) => console.error('Error deleting data: ', error)
            );
        });

        // db.close(() => console.log('Database closed successfully'));
    };

    // Fungsi untuk melakukan pemeriksaan dan penghapusan data saat aplikasi dimulai
    const checkAndDeleteDataOnStartup = async () => {
        const pathsInDatabase = await getAllPathsFromDatabase();

        for (const path of pathsInDatabase) {
            const isPathExists = await isPathExistsInFileSystem(path);

            if (!isPathExists) {
                // Jika path tidak ditemukan di sistem file, hapus data dari database
                deleteDataFromDatabase(path);
            }
        }
    };

    // Panggil fungsi checkAndDeleteDataOnStartup saat aplikasi dimulai
    checkAndDeleteDataOnStartup();
}

export default cleanUpDatabaseIfMusicDoesntExits;
