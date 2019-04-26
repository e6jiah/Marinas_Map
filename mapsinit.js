function myMap() {
	var centerOfIreland= {
	center: new google.maps.LatLng(53.305494, -7.737649),
	zoom: 6,
	};

	var map = new google.maps.Map(document.getElementById("map"),centerOfIreland);
	var markers = [];
	
	var infowindow = new google.maps.InfoWindow();
	
	var xhr = new XMLHttpRequest();
	
	xhr.onload = function(){
		if(xhr.status === 200){
			responseObject = JSON.parse(xhr.responseText);
			
			for(i = 0; i < responseObject.data.length; i++){
			
				var latLonOfMarkerPosition = {lat: responseObject.data[i].location.lat, lng: responseObject.data[i].location.lon};
				
				var marker = new google.maps.Marker({
					position: latLonOfMarkerPosition,
					map:map,
					name: responseObject.data[i].name,
					imgPath: responseObject.data[i].images.data[0].small_url});
					
				marker.addListener('click', function(){
					setMarkersIcons();
					this.setIcon(null);
					
					infowindow.setContent('<div id="marina_info"><p><b>' + this.name + '</b></p><p>Latitude: ' + this.getPosition().lat() + 
											'<br>Longtitude: ' + this.getPosition().lng() + '</p><img src="' + this.imgPath + '" ></div>');
					infowindow.open(map, this);
				});
				
				markers.push(marker);
			}
			setMarkersIcons();
			
			function setMarkersIcons() {
				for (var i = 0; i < markers.length; i++) {
				markers[i].setIcon('data/images/anchor.png');}
			}
		}
	}
	
	xhr.open('GET', 'data/dublin_marinas_data.json', true);
	xhr.send(null);
}