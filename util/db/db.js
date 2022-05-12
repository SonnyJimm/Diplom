import {openDatabase} from 'react-native-sqlite-storage';

export const db = openDatabase(
  {
    name: 'bustracker.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

/* Table vvdiig vvsgeh */
export const createTables = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS bus_lines (id INTEGER PRIMARY KEY AUTOINCREMENT,line_id INTEGER(5),turn VARCHAR(6),route_name VARCHAR(60))`,
      [],
      (sqlTxn, result) => {
        console.log('bus_line create successfully');
      },
      error => {
        console.log('bus_line create failed : ' + error.message);
      },
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS bus_stops (id INTEGER PRIMARY KEY AUTOINCREMENT,bus_stop_name VARCHAR(60),lat REAL(30),long REAL(30))`,
      [],
      (sqlTxn, result) => {
        console.log('bus_stop create successfully');
      },
      error => {
        console.log('bus_stop create failed : ' + error.message);
      },
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS bus_line_stops (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                station_index INTEGER(4) NOT NULL,
                bus_lines_id INTEGER NOT NULL, 
                bus_stops_id INTEGER NOT NULL, 
                FOREIGN KEY (bus_lines_id) REFERENCES bus_lines(id),
                FOREIGN KEY (bus_stops_id) REFERENCES bus_stops(id)
                )`,
      [],
      (sqlTxn, result) => {
        console.log('bus_line_stops create successfully');
      },
      error => {
        console.log('bus_line_stops create failed : ' + error.message);
      },
    );
  });
};
/* table vvdiig ustgah */
export const dropTables = () => {
  db.transaction(txn => {
    txn.executeSql(
      `DROP TABLE IF EXISTS bus_lines`,
      [],
      (sqlTxn, result) => {
        console.log('bus_line dropped successfully');
      },
      error => {
        console.log('bus_line dropped : ' + error.message);
      },
    );
    txn.executeSql(
      `DROP TABLE IF EXISTS bus_stops`,
      [],
      (sqlTxn, result) => {
        console.log('bus_stop drop successfully');
      },
      error => {
        console.log('bus_stop drop failed : ' + error.message);
      },
    );
    txn.executeSql(
      `DROP  TABLE IF EXISTS bus_line_stops`,
      [],
      (sqlTxn, result) => {
        console.log('bus_line_stops drop successfully');
      },
      error => {
        console.log('bus_line drop failed : ' + error.message);
      },
    );
  });
};
/* Автобусны маршруут өгөгдлийн сан руу оруулах */
export const seederInitilizeBusLine = () => {
  const busLineAndStations = require('./data.json');
  console.log(
    busLineAndStations[0]['stations'][0]['station'] +
      '-' +
      busLineAndStations[0]['stations'][
        busLineAndStations[0]['stations'].length - 1
      ]['station'],
  );
  busLineAndStations.forEach(line => {
    db.transaction(function (tx) {
      let busLineName =
        line['route_name'] +
        line['stations'][0]['station'] +
        '-' +
        line['stations'][line['stations'].length - 1]['station'];
      tx.executeSql(
        `INSERT INTO bus_lines (line_id,turn,route_name) VALUES (?,?,?)`,
        [line['id'], line['routines'], busLineName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'bus_line', {cancelable: false});
          } else console.log('bus_line Failed');
        },
      );
    });
    return;
  });
};
/* Автобусны буудал өгөгдлийн санд оруулах */
export const seederInitilizeBusStation = () => {
  const busStations = require('./station.json');
  console.log('================================');
  busStations.forEach(station => {
    db.transaction(function (tx) {
      tx.executeSql(
        `INSERT INTO bus_stops(bus_stop_name,lat,long) VALUES(?,?,?)`,
        [station.station, station.lat, station.long],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success', 'bus_stops', {cancelable: false});
          } else console.log('bus_stops Failed');
        },
      );
    });
  });
  console.log('================================');
};
export const seederBusLineAndStationCon = () => {
  const busLineAndStations = require('./data.json');
  console.log('line start');
  busLineAndStations.forEach(line => {
    line['stations'].forEach(station => {
      db.transaction(function (tx) {
        tx.executeSql(
          `INSERT INTO bus_line_stops (station_index,bus_lines_id,bus_stops_id) VALUES (?,(SELECT id FROM bus_lines WHERE line_id = ` +
            line['id'] +
            ` AND turn = '` +
            line['routines'] +
            `'),(SELECT id FROM bus_stops WHERE lat =` +
            station['lat'] +
            ` AND long = ` +
            station['long'] +
            `))`,
          [station['index']],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('Success', 'bus_line_station', {cancelable: false});
            } else console.log('bus_line station Failed');
          },
          error => {
            console.log('bus_stop_lines: ' + error.message);
          },
        );
      });
    });
    return;
  });
};
