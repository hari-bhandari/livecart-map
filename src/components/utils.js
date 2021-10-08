export const measure=(prevLat,prevLng,currentLat,currentLng)=>{
    const R = 6378.137; // Radius of earth in KM
    const dLat = currentLat * Math.PI / 180 - prevLat * Math.PI / 180;
    const dLon = currentLng * Math.PI / 180 - prevLng * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(prevLat * Math.PI / 180) * Math.cos(currentLat * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance* 1000; // meters
}
export const sizes={
    13:'50px',
    12:'40px',
    11:'35px',
    10:'30px',
    9:'25px',
    8:'22px',
    7:'20px',
    6:'20px',
    5:'18px',
    4:'16px',
    3:'15px',
    2:'14px',
    1:'1px'
}