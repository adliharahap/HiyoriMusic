import { db } from "./src/utils/databases/database";

const deleteAllData = () => {
    // Mulai transaksi untuk menghapus semua data
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'DELETE FROM MusicMetadata;',
    //     [],
    //     (_, result) => console.log('All data deleted successfully'),
    //     (error) => console.error('Error deleting data: ', error)
    //   );
    // });

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `PRAGMA table_info(MusicMetadata);`,
    //     [],
    //     (_, result) => {
    //       const rows = result.rows;
    //       const tableStructure = [];
    
    //       for (let i = 0; i < rows.length; i++) {
    //         const column = rows.item(i);
    //         tableStructure.push({
    //           name: column.name,
    //           type: column.type,
    //           notNull: column.notnull,
    //           defaultValue: column.dflt_value,
    //         });
    //       }
    
    //       console.log('Table Structure:', tableStructure);
    //     },
    //     (error) => {
    //       console.error('Error getting table structure: ', error);
    //     }
    //   );
    // });

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `DROP TABLE IF EXISTS MusicMetadata;`,
    //     [],
    //     (_, result) => {
    //       console.log('Table deleted successfully');
    //     },
    //     (error) => {
    //       console.error('Error deleting table: ', error);
    //     }
    //   );
    // });

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ID FROM MusicMetadata;`,
        [],
        (_, result) => {
          const rows = result.rows;
          if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
              const id = rows.item(i).ID;
              console.log('ID:', id);
            }
          } else {
            console.log('No data found in the table');
          }
        },
        (error) => {
          console.error('Error selecting data: ', error);
        }
      );
    });
};

export default deleteAllData;
