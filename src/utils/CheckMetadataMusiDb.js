import getMetadata from './getMetadata';
import { db } from './databases/database';

const CheckMetadataMusicDb = async (path) => {    
    
    // Fungsi untuk memeriksa apakah path music sudah ada di database atau tidak
    const isPathExistsInDatabase = async () => {
        return new Promise((resolve) => {
    
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT COUNT(*) as count FROM MusicMetadata WHERE Uri = ?;',
                    [path],
                    (_, result) => {
                        const count = result.rows.item(0).count;
                        resolve(count > 0); // Mengembalikan true jika path sudah ada di database
                    },
                    (error) => {
                        console.error('Error checking path in database: ', error);
                        resolve(false);
                    }
                );
            });
        });
    };
    
    // Fungsi untuk mengecek hasil secara synchronous
    const checkResult = async () => {
        const result = await isPathExistsInDatabase(path);
        
        if (!result) {
            await getMetadata(path);
        } else {
            // console.log('Data sudah ada di Database');
        }
    };
    
    // Panggil fungsi untuk mengecek hasil
    checkResult();
    
}

export default CheckMetadataMusicDb;