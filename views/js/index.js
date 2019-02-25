var map; 
var infoWindow;

/***********************************************************************************************
*Function Name : initMap
*Description ：initialize google map to recenter on current position
*Params ：null
*Return ：null
***********************************************************************************************/
function initMap() {
	var vancouver = new google.maps.LatLng(49.246292, -123.116226);

	map = new google.maps.Map(document.getElementById('map'), {
		center: vancouver,
		zoom: 5
	}); // create map instance
	infoWindow = new google.maps.InfoWindow();

	if (navigator.geolocation) {
		// Recenter map to current position.
		navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
			};
			
			console.log('Your current position is:');
			console.log(`Latitude : ${position.coords.latitude}`);
			console.log(`Longitude: ${position.coords.longitude}`);

			infoWindow.setPosition(pos);
			infoWindow.setContent(position.name);
      infoWindow.open(map);
      map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});

		// TODO : listen to clicking or search event
		markRequest("dmv california");

	} else {
		// Browser does not support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

/***********************************************************************************************
*Function Name : markRequest
*Description ：
	mark locations on map matching search query,
	description shows up upon clicking marker.
*Params ：place
*Return ：null
***********************************************************************************************/
function markRequest(query) {
	// Mark map with multiple locations matching query and
	var request = {
		query: query,
		fields: ['name', 'geometry'],
	};

	service = new google.maps.places.PlacesService(map);
	// TODO : debug findPlaceFromQuery issue: only one/null result returned, 
	// expected result should be a list of results.
	service.findPlaceFromQuery(request, function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		} 
		// recenter map to first match result.
		map.setCenter(results[0].geometry.location);
		} 
	});
}

/***********************************************************************************************
*Function Name : createMarker
*Description ：generate maker on map for specific place
*Params ：place
*Return ：null
***********************************************************************************************/
function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, marker);
  });
}

// Below needed to be refactored, not used currently, especially BMap should be removed
(function(){
	    function getInfosSuc(data){
	        var params = data.params;
	        var szPois = [];
	        for(var url in params){
	            var localSearch = new BMap.LocalSearch(map);
	            localSearch.setSearchCompleteCallback((function(url, infos){
	                var hasShowUrls = [];
	                return function (searchResult) {
	                    for(var j=0;j<hasShowUrls.length;j++){
	                        if (url === hasShowUrls[j]) {
	                            return;
	                        };
	                    }
	                    hasShowUrls.push(url);
	                    var poi = searchResult.getPoi(0);/*地理位置信息*/
	                    if (!poi) return;
	                    var isHasPoi = false;
	                    for(var i=0;i<szPois.length;i++){
	                        if (szPois[i].point.lng === poi.point.lng && szPois[i].point.lat === poi.point.lat) {
	                            isHasPoi = true;
	                            break;
	                        };
	                    }
	
	                    if (isHasPoi) {/*同一个小区有多套房子*/
	                        var point = new BMap.Point(poi.point.lng,poi.point.lat);
	                        szPois[i].urls.push(url);
	                        szPois[i].imgs.push(infos.img);
	                        szPois[i].marker.addEventListener("click", (function(p){
	                            return function(){   
	                                /*点击房屋图标后弹出的信息框*/
	                                var opts = {
	                                    width : 200,    
	                                    height: 200 * p.urls.length,     
	                                    title : poi.title , 
	                                    enableMessage:true,
	                                }
	                                var message = "";
	                                p.urls.forEach(function(item,index){
	                                    message += "<div><a href="+item+"><img title='点击访问' class='img-responsive showImg' alt='Responsive image' src="+p.imgs[index]+"></img></a></div>"
	                                })
	                                var infoWindow = new BMap.InfoWindow(message, opts);       
	                                map.openInfoWindow(infoWindow,point); //开启信息窗口
	                            }
	                        })(szPois[i]));
	                    }
	                    else{
	                        var point = new BMap.Point(poi.point.lng,poi.point.lat);
	
	                        var myIcon = new BMap.Icon("../image/house.png", new BMap.Size(30, 30), {});      
	                        // 创建标注对象并添加到地图   
	                        var marker = new BMap.Marker(point, {icon: myIcon});    
	                        map.addOverlay(marker);
	
	                        marker.addEventListener("click", function(){    
	                            /*点击房屋图标后弹出的信息框*/
	                            var opts = {
	                                width : 200,    
	                                height: 200,     
	                                title : poi.title , 
	                                enableMessage:true,
	                            }
	                            var infoWindow = new BMap.InfoWindow("<a href="+url+"><img title='点击访问' class='img-responsive showImg' alt='Responsive image' src="+infos.img+"></img></a>", opts);       
	                            map.openInfoWindow(infoWindow,point); //开启信息窗口
	                        });
	
	                        poi.marker = marker;
	                        poi.urls = [url];
	                        poi.imgs = [infos.img]
	                        szPois.push(poi);
	                    }  
	
	            　　}
	            })(url, params[url]));
	            localSearch.search(params[url].location);
	        }
	    }
	
	    function getInfosErr(e){
	        alert('获取数据失败');
	    }
	    
	    $.ajax({
	        'type': 'post',
	        'url': '/rental/getInfos',
	        'contentType': 'application/json;charset=utf-8',
	        'data': JSON.stringify({params: null}),
	        success: getInfosSuc ,
	        async: true,
	        error: getInfosErr ,
	    })
	})();