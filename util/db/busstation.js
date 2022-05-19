import {db} from './db';
export const getAllStations = initializeMasterData => {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM bus_stops ORDER BY bus_stop_name`,
      [],
      (tx, results) => {
        let stations = [];
        for (let index = 0; index < results.rows.length; index++) {
          stations.push(results.rows.item(index));
        }
        initializeMasterData(stations);
      },
      error => {
        console.log(results);
      },
    );
  });
};
export const getStationLines = (data, callback) => {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM bus_lines WHERE id = (SELECT bus_lines_id FROM bus_line_stops WHERE bus_line_stops.bus_lines_id =bus_lines.id AND bus_stops_id = ?)`,
      [data['id']],
      (tx, results) => {
        let lines = [];
        for (let index = 0; index < results.rows.length; index++) {
          lines.push(results.rows.item(index));
        }
        callback(lines);
        // console.log(lines)
      },
      error => {
        console.log(error);
      },
    );
  });
};
export const lineSearchByStation = (start, end, callback) => {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM bus_lines WHERE id = (SELECT bus_lines_id FROM bus_line_stops WHERE bus_line_stops.bus_lines_id = bus_lines.id AND bus_stops_id = ?) AND id = (SELECT bus_lines_id FROM bus_line_stops WHERE bus_line_stops.bus_lines_id = bus_lines.id AND bus_stops_id = ?)`,
      [start['id'], end['id']],
      (tx, results) => {
        lines = [];
        // console.log("error");
        for (let index = 0; index < results.rows.length; index++) {
          lines.push(results.rows.item(index));
        }
        callback(lines);
      },
      error => {
        console.log(error);
      },
    );
  });
};
