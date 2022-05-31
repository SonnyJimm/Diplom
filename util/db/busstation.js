import {db} from './db';
import {TRIP_START, TRIP_NODE, TRIP_END, TRIP_NONE} from '../../const';
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
      `SELECT * FROM bus_lines LEFT JOIN bus_line_stops s ON s.bus_lines_id = bus_lines.id WHERE s.bus_stops_id = ?`,
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
      `SELECT *,(SELECT point_end.station_index-point_start.station_index FROM bus_line_stops point_start  INNER JOIN bus_line_stops point_end ON point_start.bus_lines_id = point_end.bus_lines_id WHERE point_start.bus_stops_id = ? AND point_end.bus_stops_id = ? AND bus_lines.id = point_end.bus_lines_id AND point_end.station_index > point_start.station_index) AS trip FROM bus_lines WHERE id = (SELECT point_end.bus_lines_id FROM bus_line_stops point_start  INNER JOIN bus_line_stops point_end ON point_start.bus_lines_id = point_end.bus_lines_id WHERE point_start.bus_stops_id = ? AND point_end.bus_stops_id = ? AND bus_lines.id = point_end.bus_lines_id AND point_end.station_index > point_start.station_index)`,
      [start['id'], end['id'], start['id'], end['id']],
      (tx, results) => {
        let lines = [];
        // console.log("error");
        for (let index = 0; index < results.rows.length; index++) {
          let line = results.rows.item(index);
          lines.push(line);
        }
        callback(lines);
      },
      error => {
        console.log(error);
      },
    );
  });
};
export const lineBusStops = (id, callback, start, end) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM bus_stops b LEFT JOIN bus_line_stops bs ON bs.bus_stops_id = b.id WHERE bs.bus_lines_id = ? ORDER BY bs.station_index ASC`,
      [id],
      (tx, results) => {
        let stations = [];
        // console.log("error");
        let trip = false;
        for (let index = 0; index < results.rows.length; index++) {
          let station = results.rows.item(index);
          station['trip'] = TRIP_NONE;
          if (station['bus_stops_id'] === start) {
            station['trip'] = TRIP_START;
            trip = true;
          } else if (station['bus_stops_id'] === end) {
            trip = false;
            station['trip'] = TRIP_END;
          }
          if (
            trip &&
            station['bus_stops_id'] !== start &&
            station['bus_stops_id'] !== end
          ) {
            station['trip'] = TRIP_NODE;
          }
          stations.push(station);
        }
        callback(stations);
      },
      error => {
        console.log(error);
      },
    );
  });
};
export const lineBusStopsLoc = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT lat,long FROM bus_stops b LEFT JOIN bus_line_stops bs ON bs.bus_stops_id = b.id WHERE bs.bus_lines_id = ? ORDER BY bs.station_index ASC`,
      [id],
      (tx, results) => {
        let stations = [];
        // console.log("error");
        for (let index = 0; index < results.rows.length; index++) {
          let station = results.rows.item(index);
          let latlng = {
            latitude: station['lat'],
            longitude: station['long'],
          };
          stations.push(latlng);
        }
        console.log(stations);
        callback(stations);
      },
      error => {
        console.log(error);
      },
    );
  });
};
export const getBusLineBetweenStation = (start, end) => {
  let startLines = [];
  let endLines = [];
  getStationLines(start, data => {
    startLines = data;
  });
  getStationLines(end, data => {
    endLines = data;
  });
  console.log(startLines, endLines);
};
