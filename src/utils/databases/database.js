import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'MetadataMusic.db', location: 'default' });

const initializeDatabase = () => {
    return new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS MusicMetadata (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    Title TEXT NOT NULL,
                    Artist TEXT NOT NULL,
                    Album TEXT NOT NULL,
                    Year TEXT NOT NULL,
                    Duration TEXT NOT NULL,
                    Uri TEXT NOT NULL,
                    ThumnailData TEXT,
                    FileDate TEXT NOT NULL,
                    FileSize TEXT NOT NULL,
                    Favorite INTEGER DEFAULT 0,
                    UNIQUE(ID)
                );`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

const openDatabaseConnection = async () => {
    try {
        await initializeDatabase();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export { db, openDatabaseConnection };