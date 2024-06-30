//scipt tag added from mapbox gl js documentation 

  
  mapboxgl.accessToken =mapToken;
 
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
  map.addControl(new mapboxgl.FullscreenControl());
  

  //3(b) last 2nd lec
//   pehle show .ejs m jaakar coordinates ko access krlo jaise upper map token ko kiya tha sbse upper in show.ejs file


const marker = new mapboxgl.Marker({color : "red"})
.setLngLat(listing.geometry.coordinates) //LIsting.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
.addTo(map)
