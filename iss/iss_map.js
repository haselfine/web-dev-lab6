

let zoomLevel = 1

let issMarker
let update = 10000

let map = L.map('iss-map').setView([0,0], zoomLevel)

let url = 'https://api.wheretheiss.at/v1/satellites/25544'

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy;  <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2xhcmFsIiwiYSI6ImNqcmdwenViYTAwcHQ0Ym5yYmZ1Z3E2bjgifQ.QQfUvVaqPsWb_jJbP2gvHg'
}).addTo(map)

iss()
setInterval(iss, update)

function iss(){
    fetch(url)
    .then( res => res.json() )
    .then( issData => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        
        if(!issMarker){
            issMarker = L.marker([lat, long]).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }
    })
    .catch( err => {
        console.log(err)
    })

}

