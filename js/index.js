//URL Geoserver
var url_geoserver = "http://localhost:8080/geoserver/wms";
//noms des couches
var name_layer_admin1 = "formation_gs:civ_adm1";
var name_layer_admin2 = "formation_gs:civ_adm2";
var name_layer_admin3 = "formation_gs:civ_adm3";
var name_layer_landuse = "formation_gs:gis_osm_landuse_a_free_1";
var name_layer_roads = "formation_gs:gis_osm_roads_free_1";
var name_layer_pois = "formation_gs:gis_osm_pois_free_1";
var name_layer_places = "formation_gs:gis_osm_places_free_1";
var name_layer_raster="formation_gs:Abidjan_HR_ext";
//Tunisie
var name_layer_clients="formation_gs_tun:clients_utm";
var name_layer_pdv="formation_gs_tun:pdv_utm";
var name_layer_roads_tun="formation_gs_tun:roads_utm";
var name_layer_gouvernourats="formation_gs_tun:tun_gouvernorats_utm";
var name_layer_pyramid="formation_gs_tun:tunis_spot6_2013_8bits";
//déclaration des couches openlayers
var lyr_osm = new ol.layer.Tile({
    title: 'OSM',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});
var lyr_admin1 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_admin1, "TILED": "true"}
    })),
    title: "districts"
});
   var lyr_admin2 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_admin2, "TILED": "true"}
    })),
    title: "régions"
   });
   var lyr_admin3 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_admin3, "TILED": "true"}
    })),
    title: "départements"
   });
var lyr_landuse = new ol.layer.Tile({
 source: new ol.source.TileWMS(({
 url: url_geoserver,
 params: {"LAYERS": name_layer_landuse, "TILED": "true"}
 })),
 title: "Occupation du sol"
});
var lyr_roads = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_roads, "TILED": "true"}
    })),
    title: "Routes"
   });
   var lyr_pois = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_pois, "TILED": "true"}
    })),
    title: "POIs"
   });
   var lyr_places = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_places, "TILED": "true"}
    })),
    title: "Lieux"
   });
   var lyr_raster = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_raster, "TILED": "true"}
    })),
    title: "Raster"
   });
   var lyr_clients = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_clients, "TILED": "true"}
    })),
    title: "Clients"
});
var lyr_pdv = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_pdv, "TILED": "true"}
    })),
    title: "Pdv"
});
var lyr_roads_tun = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_roads_tun, "TILED": "true"}
    })),
    title: "roads"
});
var lyr_gouvernorats = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_gouvernourats, "TILED": "true"}
    })),
    title: "gouvernorats"
});
var lyr_pyramid = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
    url: url_geoserver,
    params: {"LAYERS": name_layer_pyramid, "TILED": "true"}
    })),
    title: "pyramid"
});
   //visibilité par défaut des couches au chargement de la carte
   lyr_admin1.setVisible(true);
   lyr_admin2.setVisible(true);
   lyr_admin3.setVisible(true);
   lyr_landuse.setVisible(true);
   lyr_roads.setVisible(true);
   lyr_pois.setVisible(true);
   lyr_places.setVisible(true);
   lyr_raster.setVisible(true);
   lyr_clients.setVisible(true);
   lyr_pdv.setVisible(true);
   lyr_roads_tun.setVisible(true);
   lyr_gouvernorats.setVisible(true);
   lyr_pyramid.setVisible(true);
   
   //déclaration de la liste des couches à afficher dans un ordre précis
   var layersList = [lyr_osm,lyr_admin1,lyr_admin2,lyr_admin3,lyr_landuse,lyr_roads,lyr_pois,lyr_places,lyr_raster,lyr_gouvernorats,lyr_roads_tun,lyr_clients,lyr_pdv,lyr_pyramid];
   
   var mapView = new ol.View({
    projection: 'EPSG:3857',
    center: new ol.geom.Point([-5.690183, 7.786829]).transform('EPSG:4326','EPSG:3857').getCoordinates(),
    zoom: 7
   });
   //Definition des popups pour affichage des infos
   var container = document.getElementById('popup');
   var content = document.getElementById('popup-content');
   var closer = document.getElementById('popup-closer');
   closer.onclick = function() {
       container.style.display = 'none';
       closer.blur();
       return false;
   };
   var overlayPopup = new ol.Overlay({
    element: container
   });
   var map = new ol.Map({
    target: 'map',
    overlays:[overlayPopup],
    layers: layersList,
    view: mapView
   });
   
   var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'Légende'
   });
   map.addControl(layerSwitcher);
   
   var MousePosition = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326'
   });
   map.addControl(MousePosition)   

   map.on('pointermove', function(event) {
    var coord3857 = event.coordinate;
    var coord4326 = ol.proj.transform(coord3857, 'EPSG:3857', 'EPSG:4326');
    $('#mouse3857').text(ol.coordinate.toStringXY(coord3857, 2));
    $('#mouse4326').text(ol.coordinate.toStringXY(coord4326, 5));
   });

   
   
/////////////////////////////////////////////////////

// Define Geometries
var point = new ol.geom.Point(
    ol.proj.transform([-5.690183, 7.786829], 'EPSG:4326', 'EPSG:3857')
);
var circle = new ol.geom.Circle(
    ol.proj.transform([-5.690183, 7.786829], 'EPSG:4326', 'EPSG:3857'),
    450000
);
// Features
var pointFeature = new ol.Feature(point);
var circleFeature = new ol.Feature(circle);
// Source
var vectorSource = new ol.source.Vector({
    projection: 'EPSG:4326'
});
//////////add geometry/////////////////////////////
vectorSource.addFeatures([pointFeature, circleFeature]);
// vector layer
var vectorLayer = new ol.layer.Vector({
source: vectorSource,
style:style
});

map.addLayer(vectorLayer);
//Change the style

var style = new ol.style.Style({
 fill: new ol.style.Fill({
 color: 'rgba(255, 100, 50, 0.3)'
 }),
 stroke: new ol.style.Stroke({
 width: 2,
 color: 'rgba(255, 100, 50, 0.8)'
 }),
 image: new ol.style.Circle({
 fill: new ol.style.Fill({
 color: 'rgba(55, 200, 150, 0.5)'
 }),
 stroke: new ol.style.Stroke({
 width: 1,
 color: 'rgba(55, 200, 150, 0.8)'
 }),
 radius: 7
 }),
});

// vector layer with the style
var vectorSource = new ol.source.Vector({
    projection: 'EPSG:4326'
});
var vectorLayer = new ol.layer.Vector({
 source: vectorSource,
 style: style
});

//add layer to the map   
map.addLayer(vectorLayer);
var button = $('#pan').button('toggle');
var interaction;
$('div.btn-group button').on('click', function(event) {
    var id = event.target.id;
    // Toggle buttons
    button.button('toggle');
    button = $('#'+id).button('toggle');
    // Remove previous interaction
    map.removeInteraction(interaction);
    // Update active interaction
    switch(event.target.id) {
        case "select":
        interaction = new ol.interaction.Select();
        map.addInteraction(interaction);
        console.log(interaction)
        break;
        case "point":
        map.removeInteraction(interaction);
        interaction = new ol.interaction.Draw({
        type: 'Point',
        source: vectorLayer.getSource()
        });
        map.addInteraction(interaction);
        
        interaction.on('drawend', function(event) {
            const feature = event.feature;
            var coordinates = feature.getGeometry().getCoordinates();                 
            const id = prompt('point id');
            fetch('http://localhost:3000/point', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    lat: coordinates[1],
                    lon: coordinates[0]
                })
            }).then(function(response) {
                console.log(response)
            }).catch(function(error) {
                console.error(error);
            });
        });
        break;
        case "line":
        map.removeInteraction(interaction);
        interaction = new ol.interaction.Draw({
        type: 'LineString',
        source: vectorLayer.getSource()
        });
        map.addInteraction(interaction);
        interaction.on('drawend', function(event) {
            const feature = event.feature;
            const coordinates = feature.getGeometry().getCoordinates();
            const id = prompt('line id');
            // Send the coordinates to the server to be saved in the database
            fetch('http://localhost:3000/line', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    coord: coordinates
                })
            }).then(function(response) {
                console.log(response)
            }).catch(function(error) {
                console.error(error);
            });
            console.log(coordinates) 
        });
        break;
        case "polygon":
        map.removeInteraction(interaction);
        interaction = new ol.interaction.Draw({
        type: 'Polygon',
        source: vectorLayer.getSource()
        });
        map.addInteraction(interaction);
        interaction.on('drawend', function(event) {
            const feature = event.feature;
            const coordinates = feature.getGeometry().getCoordinates();
            const id = prompt('polygon id');
            // Send the coordinates to the server to be saved in the database
            fetch('http://localhost:3000/polygon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    coord: coordinates
                })
            }).then(function(response) {
                console.log(response)
            }).catch(function(error) {
                console.error(error);
            });
            console.log(coordinates) 
        });
        break;
        case "modify":
        interaction = new ol.interaction.Modify({
        features: new ol.Collection(vectorLayer.getSource().getFeatures())
        });
        map.addInteraction(interaction);
        break;
        default:
        break;
        }
       });

       function addLayer() {
            map.removeInteraction(interaction);
            const geom=prompt('which geometry you want to add as a layer')
            switch(geom){
                case "point":
                    addPoint();
                break;
                case "polygon":
                    addPolygon();
                break;
                case "line":
                    addLine();
                break;
                

            }
            
        }
function addPoint(){
    const id = prompt('Point id to add');
        
    fetch(`http://localhost:3000/geo/points/${id}`)
      .then(response => response.json())
      .then(data => {

        const st_astext = data.geom['st_astext']
        const match = st_astext.match(/POINT\((-?\d+\.\d+) (-?\d+\.\d+)\)/);
        const coordinate = [match[1], match[2]];
        console.log(match[1], match[2]);
        const layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                new ol.Feature({
                    geometry: new ol.geom.Point([match[1], match[2]])
                    
                })
                ]
            }),
            projection: 'EPSG:4326' ,
            
            });
            map.addLayer(layer);
    });
}
function addLine(){
    const id = prompt('line id to add');

    fetch(`http://localhost:3000/geo/lines/${id}`)
    .then(response => response.json())
    .then(data => {

      const st_astext = data.geom['st_astext']
      
      const match = st_astext.match(/LINESTRING\(([^)]+)\)/);
      const coordinates = match[1].split(',').map(pair => pair.split(' ').map(Number));
      console.log(coordinates[0][0])


      
      const layer = new ol.layer.Vector({
          source: new ol.source.Vector({
              features: [
              new ol.Feature({
                  geometry: new ol.geom.LineString([[coordinates[0][0], coordinates[0][1]], [coordinates[1][0], coordinates[1][1]]])
                  
              })
              ]
          }),
          projection: 'EPSG:4326' ,
          style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'blue',
                  width: 5
                })
          })
          });
          map.addLayer(layer);
  });
}
function  addPolygon(){
    const id = prompt('polygon id to add');

    fetch(`http://localhost:3000/geo/polygons/${id}`)
    .then(response => response.json())
    .then(data => {
      const st_astext = data.geom['st_astext']
      console.log(st_astext)
      
      const coordinatesString = st_astext.match(/\(([^)]+)\)/)[1];
      const coordinates = coordinatesString.split(',').map(coordinateString => coordinateString.split(' ').map(Number));
      const firstCoordinate = coordinates[0];
      const lastCoordinate = coordinates[coordinates.length - 1];
      coordinates[0] = lastCoordinate;

      console.log(coordinates);

      
      const layer = new ol.layer.Vector({
          source: new ol.source.Vector({
              features: [
              new ol.Feature({
                  geometry: new ol.geom.Polygon([coordinates])
                  
              })
              ]
          }),
          projection: 'EPSG:4326' ,
          
          });
      map.addLayer(layer);
  });
    
    
}

        
        
        
        
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Geolocation
function goToFullExtent(marker){
    map.removeOverlay(marker)
    var marker = new ol.Overlay({
        element: document.getElementById('location'),
        positioning: 'center-center'
    });
    map.getView().setZoom(7)
}
function zoomToMyPosition(){
    var geolocation = new ol.Geolocation({
        projection: map.getView().getProjection(),
        tracking: true    
    });
    var marker = new ol.Overlay({
        element: document.getElementById('location'),
        positioning: 'center-center'
    });
    map.addOverlay(marker);
    geolocation.on('change:position', function() { //real time tracking
        map.getView().setCenter(geolocation.getPosition());
        map.getView().setZoom(15);
        marker.setPosition(geolocation.getPosition());
    });
}

///////////////////////////////////////////
map.on('singleclick', function(evt) {
    onSingleClick(evt);
   });

var clicked_coord;
var onSingleClick = function(evt) {
    var coord = evt.coordinate;
    console.log(coord);
    var source1 = name_layer_admin1;
    var source2 = name_layer_admin2;
    var source3 = name_layer_admin3;
    var layers_list = source3 + ',' + source2 + ',' + source1;
    var wmslyr_adm1 = new ol.source.TileWMS({
    url: url_geoserver,
    params: {'LAYERS': name_layer_admin1, 'TILED': true},
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
    });
    var view = map.getView();
    var viewResolution = view.getResolution();
    var url=wmslyr_adm1.getFeatureInfoUrl(
        evt.coordinate, viewResolution, view.getProjection(),
        { 
        'INFO_FORMAT': 'text/javascript',
        'FEATURE_COUNT': 20,
        'LAYERS': layers_list,
        'QUERY_LAYERS': layers_list
        }
    );
    console.log(url);
    if (url) { 
        clicked_coord = coord;
        $.ajax(url,
        {dataType: 'jsonp'}
        ).done(
            (data)=>{
                console.log(data)
            }
        );
    }
}

function parseResponse(data) {
    var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(data)
    });
    //console.log((new ol.format.GeoJSON()).readFeatures(data));
    var features = vectorSource.getFeatures();
    var str="";
    var district = "";
    var region = "";
    var departement = "";
    for(x in features) {
    var id = features[x].getId();
    //console.log(id);
    var props = features[x].getProperties();
    if(id.indexOf("adm1")>-1) district = props["ADM1_FR"];
    if(id.indexOf("adm2")>-1) region = props["ADM2_FR"];
    if(id.indexOf("adm3")>-1) departement = props["ADM3_FR"];
    }
    str = str + "District: " + district+ '<br/>';
    str = str + "Région: " + region+ '<br/>';
    str = str + "Département: " + departement+ '<br/>';
    if(str) {
    str = '<p>' + str + '</p>';
    overlayPopup.setPosition(clicked_coord);
    content.innerHTML = str;
    container.style.display = 'block';
    }
    else{
    container.style.display = 'none';
    closer.blur();
    }
}
 
///////////////add geometry///////////////////////////
