this.myLatitude = 0;
this.myLongitude = 0;

function myCurrentLocation() {
  var output = document.getElementById("output-pre-maps");
  var outputLatitude = document.getElementById("latitude");
  var outputLongitude = document.getElementById("longitude");
  var outputAltitude = document.getElementById("altitude");
  var outputAccuracy = document.getElementById("accuracy");
  var outputLocation = document.getElementById("locationname");


  if (!navigator.geolocation){
    output.innerHTML = "<p>GeolocalizaciÃ³n no es comtatible por tu navegador.</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    outputLatitude.innerHTML = latitude.toFixed(5);
    outputLongitude.innerHTML = longitude.toFixed(5);
    outputAltitude.innerHTML = position.coords.altitude;
    outputAccuracy.innerHTML = position.coords.accuracy.toFixed(2);

    window.mylat = latitude;
    output.innerHTML = "";

    //output.innerHTML = '<p>Latitude is ' + latitude + 'Â° <br>Longitude is ' + longitude + 'Â°</p>';


        /**     GOOGLE MAPS THING
         *
         */

            var mapOptions = {
              center: new google.maps.LatLng(latitude, longitude),
              zoom: 13
            };
            var map = new google.maps.Map(document.getElementById("maps-location"),
                mapOptions);

      // ADDING THE MARKER ON THE CENTER
      var myLatlng = new google.maps.LatLng(latitude,longitude);
      // To add the marker to the map, use the 'map' property


      var myPosition = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title:"Â¡Â¡Â¡ESTÃS AQUÃ!!!"
      });

      // GEOCODER IS USED TO GET THE LOCATION NAME FROM AN COORDINATES
        var geocoder;
        var marker;
        var infowindow = new google.maps.InfoWindow({maxWidth:350});

        var accuracyStatus;
        if(position.coords.accuracy<100){
           accuracyStatus = "<strong style=\"color:green;\"><span class=\"glyphicon glyphicon-ok\"></span>Exactitud : "+position.coords.accuracy.toFixed(2)+" m (Bien)</strong>";
        }
        else{
           accuracyStatus = "<strong style=\"color:red;\"><span class=\"glyphicon glyphicon-warning-sign\"></span>Exactitud : "+position.coords.accuracy.toFixed(2)+" m (Pobre)</strong>";
        }

        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': myLatlng}, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
           if (results[1]) {
             map.setZoom(15);
             marker = new google.maps.Marker({
                 position: myLatlng,
                 map: map
             }); //end marker

             var infowindowText = "<strong>EstÃ¡s AquÃ­</strong><br />"+results[1].formatted_address
                                + " <br/> Lat : " + latitude.toFixed(5)
                                + " |  Long : " + longitude.toFixed(5)
                                + "<br/>" + accuracyStatus+"<br/>"
                                + '<strong><a target="_blank" class="btn btn-primary btn-xs" href="shareme.php?data='+latitude+'|'+longitude+'|'+results[1].formatted_address
                                +' ">Compartir esta UbicaciÃ³n</a></strong> &nbsp; '
                                + '| &nbsp;<strong><a href="https://grocerystorefinder.net" target="_blank">Tiendas Cerca de MÃ­</strong></a> <br/>';


             infowindow.setContent(infowindowText);


             infowindow.open(map, marker);
             outputLocation.innerHTML = results[1].formatted_address;

           }
         } else {
           alert("No se pudo determinar el nombre de tu ubicaciÃ³n debido a: : " + status);
         } //end else

       }); //end geocoder

       if(position.coords.accuracy > 1000){
          outputAccuracy.style.color = "red";
          outputAccuracy.style.fontWeight = "900";
       }
       else{
          outputAccuracy.style.color = "green";
          outputAccuracy.style.fontWeight = "900";
          //alert("This is our best estimates of your location...");
          navigator.geolocation.clearWatch(watchid);
          return;
       }

  };

  function error() {
    output.innerHTML = "Lo sentimos, no podemos recuperar tu ubicaciÃ³n todavÃ­a. Si usas un telÃ©fono inteligente, por favor enciende tu GPS y espera 1-2 minutos.";

    //var myip = document.getElementById("ipNumber").innerHTML;

    }


  var geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
    };

  output.innerHTML = '<p>Espera, estamos detectando tu ubicaciÃ³n...</p>';

  //navigator.geolocation.getCurrentPosition(success, error, geo_options);
  var watchid = navigator.geolocation.watchPosition(success, error, geo_options);
  //alert("wpid : " + wpid);
}


function putMeOnMapIPAddress(mylatitude, mylongitude){

  var output = document.getElementById("output-pre-maps");
  var outputLatitude = document.getElementById("latitude");
  var outputLongitude = document.getElementById("longitude");
  var outputLocation = document.getElementById("locationname");


    var latitude  = mylatitude;
    var longitude = mylongitude;

    outputLatitude.innerHTML = latitude;
    outputLongitude.innerHTML = longitude;


    output.innerHTML = "";


        /**     GOOGLE MAPS THING
         *
         */

            var mapOptions = {
              center: new google.maps.LatLng(latitude, longitude),
              zoom: 13
            };
            var map = new google.maps.Map(document.getElementById("maps-location"),
                mapOptions);

      // ADDING THE MARKER ON THE CENTER
      var myLatlng = new google.maps.LatLng(latitude,longitude);
      // To add the marker to the map, use the 'map' property


      var myPosition = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title:"Â¡Â¡Â¡ESTÃS AQUÃ!!!"
      });

      // GEOCODER IS USED TO GET THE LOCATION NAME FROM AN COORDINATES
        var geocoder;
        var marker;
        var infowindow = new google.maps.InfoWindow({maxWidth:350});


        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': myLatlng}, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
           if (results[4]) {
             map.setZoom(11);
             marker = new google.maps.Marker({
                 position: myLatlng,
                 map: map
             }); //end marker


             var infowindowText = "<strong>EstÃ¡s AquÃ­</strong><br />"+results[1].formatted_address
                                + " <br/> Lat : " + latitude.toFixed(5)
                                + " |  Long : " + longitude.toFixed(5)
                                + '<strong><a target="_blank" href="shareme.php?data='+latitude+'|'+longitude+'|'+results[1].formatted_address
                                +' ">Compartir esta UbicaciÃ³n</a></strong> &nbsp; | &nbsp;<strong><a href="https://grocerystorefinder.net" target="_blank">Tiendas Cerca de MÃ­</strong></a> <br/>';

             infowindow.setContent(infowindowText);
             infowindow.open(map, marker);
             outputLocation.innerHTML = results[4].formatted_address;

           }
         } else {
           alert("No se pudo determinar el nombre de tu ubicaciÃ³n debido a: " + status);
         } //end else

       }); //end geocoder

}

function displayToMaps(mylatitude, mylongitude, locationname){
  var output = document.getElementById("output-pre-maps");
  var outputLocation = document.getElementById("locationname");


    var latitude  = mylatitude;
    var longitude = mylongitude;



    //alert("horee");



    output.innerHTML = "";


        /**     GOOGLE MAPS THING
         *
         */

            var mapOptions = {
              center: new google.maps.LatLng(latitude, longitude),
              zoom: 15
            };
            var map = new google.maps.Map(document.getElementById("maps-location"),
                mapOptions);



      // ADDING THE MARKER ON THE CENTER
      var myLatlng = new google.maps.LatLng(latitude,longitude);
      // To add the marker to the map, use the 'map' property




      var myPosition = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title:locationname
      });



      // GEOCODER IS USED TO GET THE LOCATION NAME FROM AN COORDINATES
        var geocoder;
        var marker;
        var infowindow = new google.maps.InfoWindow({maxWidth:350});

        //alert(mylatitude);
        geocoder = new google.maps.Geocoder();

        geocoder.geocode({'latLng': myLatlng}, function(results, status) {

         if (status == google.maps.GeocoderStatus.OK) {
           if (results[3]) {
             map.setZoom(15);
             marker = new google.maps.Marker({
                 position: myLatlng,
                 map: map
             }); //end marker



             var infowindowText = "<strong>"+ locationname +"</strong><br/>"
                                + " Lat : " + latitude
                                + " |  Long : " + longitude;



             infowindow.setContent(infowindowText);

             infowindow.open(map, marker);
             outputLocation.innerHTML = results[3].formatted_address;



           }
         } else {
           alert("No se pudo determinar el nombre de tu ubicaciÃ³n debido a: " + status);
         } //end else

       }); //end geocoder


}



function putMeOnMap(mylatitude, mylongitude){

  var output = document.getElementById("output-pre-maps");
  var outputLocation = document.getElementById("locationname");


    var latitude  = mylatitude;
    var longitude = mylongitude;


    //alert("horee");



    output.innerHTML = "";


        /**     GOOGLE MAPS THING
         *
         */

            var mapOptions = {
              center: new google.maps.LatLng(latitude, longitude),
              zoom: 15
            };
            var map = new google.maps.Map(document.getElementById("maps-location"),
                mapOptions);



      // ADDING THE MARKER ON THE CENTER
      var myLatlng = new google.maps.LatLng(latitude,longitude);
      // To add the marker to the map, use the 'map' property




      var myPosition = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title:"Â¡Â¡Â¡ESTÃS AQUÃ!!!"
      });





      // GEOCODER IS USED TO GET THE LOCATION NAME FROM AN COORDINATES
        var geocoder;
        var marker;
        var infowindow = new google.maps.InfoWindow({maxWidth:350});

        //alert(mylatitude);
        geocoder = new google.maps.Geocoder();

        geocoder.geocode({'latLng': myLatlng}, function(results, status) {

         if (status == google.maps.GeocoderStatus.OK) {
           if (results[3]) {
             map.setZoom(12);
             marker = new google.maps.Marker({
                 position: myLatlng,
                 map: map
             }); //end marker



             var infowindowText = "<strong>EstÃ¡s AquÃ­</strong><br />"+results[1].formatted_address
                                + " <br/> Lat : " + latitude.toFixed(5)
                                + " |  Long : " + longitude.toFixed(5)
                                + '<br/><strong><a target="_blank" href="shareme.php?data='+latitude+'|'+longitude+'|'+results[1].formatted_address
                                +' ">Compartir esta UbicaciÃ³n</a></strong> &nbsp; | &nbsp;<strong><a href="https://grocerystorefinder.net" target="_blank">Tiendas Cerca de MÃ­</strong></a> <br/>';


             infowindow.setContent(infowindowText);

             infowindow.open(map, marker);
             outputLocation.innerHTML = results[1].formatted_address;



           }
         } else {
           alert("No se pudo determinar el nombre de tu ubicaciÃ³n debido a: " + status);
         } //end else

       }); //end geocoder

}


function putMeOnMapDraggable(mylatitude, mylongitude){

  var output = document.getElementById("output-pre-maps");
  var outputLocation = document.getElementById("locationname");


    var latitude  = mylatitude;
    var longitude = mylongitude;


    //alert("horee");



    output.innerHTML = "";


            var mapOptions = {
              center: new google.maps.LatLng(latitude, longitude),
              zoom: 15
            };
            var map = new google.maps.Map(document.getElementById("maps-location"),
                mapOptions);


      // ADDING THE MARKER ON THE CENTER
      var myLatlng = new google.maps.LatLng(latitude,longitude);
      // To add the marker to the map, use the 'map' property



      // GEOCODER IS USED TO GET THE LOCATION NAME FROM AN COORDINATES
        var geocoder;
        var marker;
        var infowindow = new google.maps.InfoWindow({maxWidth:350});

        map.setZoom(2);
        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          animation: google.maps.Animation.DROP,
          draggable : true,
          title : "Â¿EstÃ¡s AquÃ­?"
        }); //end marker





        infowindow.setContent("<strong>Arrastrame a Tu PosiciÃ³n.</strong><br /> Zoom /unzoom con el botÃ³n +/- a la izquierda <br/>Ver las coordenadas a la derecha");
        infowindow.open(map, marker);

        google.maps.event.addListener(marker, 'dragend', function(evt){
            document.getElementById('thelatitude').value = evt.latLng.lat().toFixed(7);
            document.getElementById('thelongitude').value = evt.latLng.lng().toFixed(7);
        });

        google.maps.event.addListener(marker, 'dragstart', function(evt){
            document.getElementById('thelatitude').value = "TodavÃ­a arrastrando";
            document.getElementById('thelongitude').value = "TodavÃ­a arrastrando";
        });



}