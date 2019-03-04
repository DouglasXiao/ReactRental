var map; 
var infoWindow;
var geocoder;

/***********************************************************************************************
*Function Name : initMap
*Description ：initialize google map to recenter on current position
*Params ：null
*Return ：null
***********************************************************************************************/
function initMap() {
	var vancouver = new google.maps.LatLng(49.246292, -123.116226);
	geocoder = new google.maps.Geocoder();

	map = new google.maps.Map(document.getElementById('map'), {
    center: vancouver,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
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

			map.setCenter(pos);
		}, function() {
      handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
    // Browser does not support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
	}
	
	var rentalList = [];
	rentalList.push('6058 selma ave, burnaby, bc, canada');
	rentalList.push('6033 selma ave, burnaby, bc, canada');
	rentalList.push('5175 Kingsway, Burnaby, BC V5H 2E6');

	for (var i = 0; i < rentalList.length; ++i) {
		decodeAndMarkAddress(rentalList[i]);
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
              'Error: The Geolocation service failed.' :
              'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function decodeAndMarkAddress(address) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == 'OK') {
			var locationURL = "";
			var thumbnailURL = "";
			var infoWindowHTML = "<div class='info-window'><div class='col1'><div class='title'>Beautiful SeaView House</div><br><div class='features'>" + address + "</div><br><a class='loc-detail' href='" + locationURL + "'>View place details</a></div><div class='col-2'>" + thumbnailURL + "</div></div>";
			createMarker(results[0].geometry.location, infoWindowHTML);
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}

/***********************************************************************************************
*Function Name : createMarker
*Description ：generate maker on map for specific place
*Params ：place
*Return ：null
***********************************************************************************************/
function createMarker(pos, infoWindowHTML) {
  var marker = new google.maps.Marker({
    map: map,
    position: pos
  });

  google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(infoWindowHTML);
    infoWindow.open(map, marker);
	});
	
	return marker;
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