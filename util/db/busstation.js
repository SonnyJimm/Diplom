import {db} from './db';
export const getAllStations = (initializeMasterData) => {
    db.transaction(function (tx) {
      tx.executeSql(`SELECT * FROM bus_stops ORDER BY bus_stop_name`,
        [],
        (tx, results) => {
          let stations =[]
          for (let index = 0; index < results.rows.length; index++) {
              stations.push(results.rows.item(index))
          }
          initializeMasterData(stations)
        },
      error => {
        console.log(results)
      });
    });
  };