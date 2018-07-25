require("./sass/style.scss");

const load_google_maps_api = require('load-google-maps-api');
require("jquery");
// import SetLatLon from '../build/SetLatLon.js';


$(document).ready(function () {

    load_google_maps_api({key: "AIzaSyAkbu04rf_WBmWQhuo9c5K8DV1jrsK3Hlw"}).then(function (googleMaps) {

        let stores = [];

        let geocoder = new google.maps.Geocoder();
        let $fileInput = $('input[type="file"]'),
            $button = $('button'),
            currentFile;

        const config = {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                // console.log(result.data);
                stores = result.data;

                let updatedStores = [];
                let counter = 0;

                console.log(stores);
                stores.forEach(function(store){
                    store.lat = '';
                    store.lng = '';
                })

                let geocodeInterval = setInterval(function () {

                    let address = stores[counter].State + ' ' + stores[counter].City + ' ' + stores[counter].Address;

                    geocoder.geocode({'address': address}, function (results, status) {
                        if (status === 'OK') {
                            console.log(counter);
                            let tempData = stores[counter];
                            tempData.lat = results[0].geometry.location.lat();
                            tempData.lng = results[0].geometry.location.lng();

                            updatedStores.push(tempData);

                            counter++;
                        } else {
                            console.warn(Error);
                            console.warn(counter);

                            counter++;
                        }
                    });

                    if (counter == stores.length - 1) {
                        clearInterval(geocodeInterval);

                        setTimeout(function(){
                            console.log(updatedStores);
                            var csv = Papa.unparse(updatedStores);

                            console.log(csv);
                        }, 1500)
                    }

                }, 1000)


            }
        };

        $fileInput.change(function () {
            currentFile = this.files[0];
        });

        $button.click(function () {
            Papa.parse(currentFile, config);
        });


    }).catch((err) => {
        console.error(err)
    })


});