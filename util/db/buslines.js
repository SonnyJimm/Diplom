import {db} from './db';
export const getBusLines = callback => {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM bus_lines`,
      [],
      (tx, results) => {
        let lines = [];
        for (let index = 0; index < results.rows.length; index++) {
          lines.push(results.rows.item(index));
        }
        callback(lines);
      },
      error => {
        console.log(results);
      },
    );
  });
};
