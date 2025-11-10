import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export const exportTripToGPX = async (trip: any): Promise<string> => {
  const gpxContent = generateGPXContent(trip);
  const fileName = `trip_${trip.id}_${Date.now()}.gpx`;
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
  await RNFS.writeFile(filePath, gpxContent, 'utf8');
  return filePath;
};

export const exportTripToJSON = async (trip: any): Promise<string> => {
  const jsonContent = JSON.stringify(trip, null, 2);
  const fileName = `trip_${trip.id}_${Date.now()}.json`;
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
  await RNFS.writeFile(filePath, jsonContent, 'utf8');
  return filePath;
};

export const shareFile = async (filePath: string) => {
  await Share.open({
    url: `file://${filePath}`,
    title: 'Chia sẻ chuyến đi',
  });
};

const generateGPXContent = (trip: any): string => {
  const { routePoints, startTime, endTime } = trip;
  
  let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="SpeedometerApp">
  <metadata>
    <time>${new Date(startTime).toISOString()}</time>
  </metadata>
  <trk>
    <name>Trip ${trip.id}</name>
    <trkseg>`;
  
  routePoints.forEach((point: any) => {
    gpx += `
      <trkpt lat="${point.latitude}" lon="${point.longitude}">
        <time>${new Date(point.timestamp).toISOString()}</time>
        ${point.altitude ? `<ele>${point.altitude}</ele>` : ''}
      </trkpt>`;
  });
  
  gpx += `
    </trkseg>
  </trk>
</gpx>`;
  
  return gpx;
};
