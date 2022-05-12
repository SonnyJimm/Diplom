import {db} from './databaseSchema';
export const getAllStation = () =>
  new Promise((resolve, reject) => {
    console.log('about to start');
    db.transaction(function (tx) {
      console.log('tx started');
      tx.executeSql(`SELECT * FROM bus_stops`),
        [],
        (tx, results) => {
          resolve(results);
        };
      error => {
        reject(error);
      };
    });
  });
export const getStationBusLines = () => {
  db.transaction(function (tx) {});
};
