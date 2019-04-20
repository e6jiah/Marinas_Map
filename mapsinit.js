function myMap() {
	var centerOfIreland= {
	center: new google.maps.LatLng(53.305494, -7.737649),
	zoom: 6,
	};

	var map = new google.maps.Map(document.getElementById("map"),centerOfIreland);
	var markers = [];
	
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
					
					document.getElementById('heading').innerHTML = this.name;
					document.getElementById('marina_info').innerHTML = '<p><b>Latitude: ' + this.getPosition().lat() + '<br>Longtitude: ' + this.getPosition().lng() + '</b></p><img src="' + this.imgPath + '" >';
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