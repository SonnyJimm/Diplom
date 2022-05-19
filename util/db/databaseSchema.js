import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase(
  {
    name: 'bustracker.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export const createTables = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS bus_lines (id INTEGER PRIMARY KEY,route_name VARCHAR(60))`,
      [],
      (sqlTxn, result) => {
        console.log('bus_line create successfully');
      },
      error => {
        console.log('bus_line create failed : ' + error.message);
      },
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS bus_station (id INTEGER PRIMARY KEY,station_name VARCHAR(60))`,
      [],
      (sqlTxn, result) => {
        console.log('bus_line create successfully');
      },
      error => {
        console.log('bus_line create failed : ' + error.message);
      },
    );
    
  });
};
