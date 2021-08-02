export const getHaversineDistance = (lat1, lng1, lat2, lng2) => {
    const EARTH_RADIUS_KM = 6371.0710
    const radianLat1 = lat1 * (Math.PI/180)
    const radianLat2 = lat2 * (Math.PI/180)
    const diffLat = radianLat2-radianLat1
    const diffLng = (lng2-lng1) * (Math.PI/180)

    const distance = 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(Math.sin(diffLat/2)*Math.sin(diffLat/2)+Math.cos(radianLat1)*Math.cos(radianLat2)*Math.sin(diffLng/2)*Math.sin(diffLng/2)))
    return distance;     
}