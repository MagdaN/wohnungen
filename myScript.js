$( document ).ready(function() {

    map = new L.Map("map");
    
    var min = 11;
    var max = 17;
    
    var myLayer = new L.TileLayer('http://tiles3.buergerbautstadt.de/berlin/{z}/{x}/{y}.png', {
        minZoom: min,
        maxZoom: max,
        attribution: 'Map data &copy; 2012 OpenStreetMap contributors',
        zIndex: 0,
        errorTileUrl: 'http://tiles3.buergerbautstadt.de/error.png',
        reuseTiles: true
    });

    var osmLayer =  L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'attribution': 'Map data Â© 2012 OpenStreetMap contributors</a>',
            'minZoom': min,
            'maxZoom': max
        })
    
    map.addLayer(myLayer);
    var center = new L.LatLng(52.51, 13.37628);
    map.setView(center, 11);
    var myStyle = {
    "color": "#ff7800",
    "weight": 2,
    "opacity": 0.6,
    "fillOpacity": 0
    };  


    var bereicheLayer = new L.GeoJSON(undefined, {
        style: myStyle,      
        onEachFeature: function(feature, layer){ 
            console.log(layer.getBounds());   
                        
            //layer.bindLabel(feature.properties.Bereiche, {noHide:true});
            //layer.bindPopup('<b>' + feature.properties.Bereiche + '</b>' + '<br> Geplante Wohneinheiten: ' + feature.properties.Einheiten);                
        }
    }).addTo(map);

    $.get("bereiche.json", function(data) { 
        bereicheLayer.addData(data);
    });


    var fertig_bis_2016 = new L.GeoJSON(undefined, {
        style: function(feature) {
           return {color: "#264a47", "weight": 1, "opacity": 0, "fillOpacity": 0.8};                           
            },
        onEachFeature: function(feature, layer) {                
                layer.bindPopup(feature.properties.Wohungsmen + ' Wohnungen bis ' + feature.properties.Realisieru);                
            },
        filter: function(feature, layer) {            
            return feature.properties.Realisieru == 'bis 2016';
        }
        }).addTo(map);

    var fertig_bis_2020 = new L.GeoJSON(undefined, {
        style: function(feature) {
           return {color: "#4B929C", "weight": 1, "opacity": 0, "fillOpacity": 0.8};                           
            },
        onEachFeature: function(feature, layer)
            {                
                layer.bindPopup(feature.properties.Wohungsmen + ' Wohnungen bis ' + feature.properties.Realisieru);                
            },
        filter: function(feature, layer) {            
            return feature.properties.Realisieru == 'bis 2020';
        }
        }).addTo(map);

    var fertig_bis_2025 = new L.GeoJSON(undefined, {
        style: function(feature) {
           return {color: "#526669", "weight": 1, "opacity": 0, "fillOpacity": 0.8};                           
            },
        onEachFeature: function(feature, layer){                
                layer.bindPopup(feature.properties.Wohungsmen + ' Wohnungen bis ' + feature.properties.Realisieru);                
            },
        filter: function(feature, layer){            
            return feature.properties.Realisieru == 'bis 2025';
        }
        }).addTo(map);

    var fertig_nach_2025 = new L.GeoJSON(undefined, {
        style: function(feature) {
           return {color: "#79979C", "weight": 1, "opacity": 0, "fillOpacity": 0.8};                           
            },
        onEachFeature: function(feature, layer)
            {                
                layer.bindPopup(feature.properties.Wohungsmen + ' Wohnungen bis ' + feature.properties.Realisieru);                
            },
        filter: function(feature, layer) {
            return feature.properties.Realisieru == 'nach 2025';
        }
        }).addTo(map);

    $.get("einzelstandorte.json", function(data) {
        fertig_bis_2016.addData(data);  
        fertig_bis_2020.addData(data);  
        fertig_bis_2025.addData(data); 
        fertig_nach_2025.addData(data);    
    });

    

    var baseMaps = { "BBS": myLayer, "Open Street Map": osmLayer };    
    var overlayMaps = { "Bereich": bereicheLayer, "Fertigstellung bis 2016": fertig_bis_2016, "Fertigstellung bis 2020": fertig_bis_2020, "Fertigstellung bis 2025": fertig_bis_2025, "Fertigstellung nach 2025": fertig_nach_2025}; 
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);


});