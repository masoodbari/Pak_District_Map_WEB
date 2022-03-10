var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var stamenMap = L.tileLayer.provider('Stamen.Watercolor');
var imageryMap = L.tileLayer.provider('Esri.WorldImagery');

var baseMaps = {
    OSM: osmMap,
    'Stamen Watercolor': stamenMap,
    'World Imagery': imageryMap
};

var geoServerIPPort = "localhost:8080";
var geoServerWorkspace = "mbgis";
var stateLayerName = "mbgis:District_Boundary";

var pakistanStLayer = L.tileLayer.wms(
    "http://" + geoServerIPPort + "/geoserver/" + geoServerWorkspace + "/wms",
    {
        layers: stateLayerName,
        format: "image/png",
        transparent: true,
        version: "1.1.0",
        tiled: false,
    }
);

var overlayMaps = {
    "Pakistan District Boundary": pakistanStLayer,
};

var map = L.map("map", {
    center: [24.7966014, 67.0787946],
    zoom: 5,
    layers: [osmMap, pakistanStLayer]
});

var mapLayers = L.control.layers(baseMaps, overlayMaps).addTo(map);

ctlMeasure = L.control
    .polylineMeasure({
        position: "topleft",
        measureControlTitle: "Measure Length",
    })
    .addTo(map);