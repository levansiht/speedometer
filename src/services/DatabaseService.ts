import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(false);
SQLite.enablePromise(true);

const DATABASE_NAME = 'speedometer.db';
// const DATABASE_VERSION = '1.0';
// const DATABASE_DISPLAY_NAME = 'Speedometer Database';
// const DATABASE_SIZE = 200000;

let database: SQLite.SQLiteDatabase | null = null;

export const openDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabase({
    name: DATABASE_NAME,
    location: 'default',
  });

  await initTables();
  return database;
};

const initTables = async () => {
  if (!database) {
    return;
  }

  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      startTime INTEGER NOT NULL,
      endTime INTEGER,
      distance REAL DEFAULT 0,
      maxSpeed REAL DEFAULT 0,
      avgSpeed REAL DEFAULT 0,
      duration INTEGER DEFAULT 0,
      routePoints TEXT
    );
  `);
};

export const saveTrip = async (tripData: any) => {
  const db = await openDatabase();
  const result = await db.executeSql(
    `INSERT INTO trips (startTime, endTime, distance, maxSpeed, avgSpeed, duration, routePoints) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      tripData.stats.startTime,
      tripData.stats.endTime,
      tripData.stats.distance,
      tripData.stats.maxSpeed,
      tripData.stats.averageSpeed,
      tripData.stats.duration,
      JSON.stringify(tripData.route || []),
    ],
  );
  return result[0].insertId;
};

export const getAllTrips = async () => {
  const db = await openDatabase();
  const results = await db.executeSql(
    'SELECT * FROM trips ORDER BY startTime DESC',
  );
  const trips = [];
  for (let i = 0; i < results[0].rows.length; i++) {
    const row = results[0].rows.item(i);
    trips.push({
      id: `trip_${row.id}`,
      status: 'completed',
      stats: {
        startTime: row.startTime,
        endTime: row.endTime,
        distance: row.distance,
        maxSpeed: row.maxSpeed,
        averageSpeed: row.avgSpeed,
        duration: row.duration,
      },
      route: JSON.parse(row.routePoints || '[]'),
      createdAt: row.startTime,
      updatedAt: row.endTime || row.startTime,
    });
  }
  return trips;
};

export const deleteTrip = async (id: number) => {
  const db = await openDatabase();
  await db.executeSql('DELETE FROM trips WHERE id = ?', [id]);
};

export const closeDatabase = async () => {
  if (database) {
    await database.close();
    database = null;
  }
};

// Export a default object for easier usage
export const db = {
  initialize: openDatabase,
  getAllTrips,
  saveTrip,
  deleteTrip,
  close: closeDatabase,
};
