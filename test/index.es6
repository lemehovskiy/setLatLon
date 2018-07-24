require("./sass/style.scss");

import SetLatLon from '../build/SetLatLon.js';



$(document).ready(function () {

    load_google_maps_api({key: "AIzaSyAkbu04rf_WBmWQhuo9c5K8DV1jrsK3Hlw"}).then(function (googleMaps) {

        let test = new SetLatLon();

    }).catch((err) => {
        console.error(err)
    })

});