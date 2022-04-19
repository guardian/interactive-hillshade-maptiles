import maplibregl from 'maplibre-gl'; // or "const maplibregl = require('maplibre-gl');"
import * as d3 from 'd3'
import borders from 'assets/borders.json'
import ScrollyTeller from "shared/js/scrollyteller"

console.log(borders)

const atomEl = d3.select('#gv-wrapper').node();
const isMobile = window.matchMedia('(max-width: 800px)').matches;

const width = atomEl.getBoundingClientRect().width;
const height = isMobile ? window.innerHeight : 426 * width / 714.96;

d3.select('#gv-wrapper').style('height', height + 'px')

var map = new maplibregl.Map({
container: 'gv-wrapper', // container id
style: {
	version: 8,
	sources: {
		'raster-tiles': {
			type: 'raster',
			tiles: ['https://interactive.guim.co.uk/maptiles/hillshade/europe-africa/xyz/{z}/{x}/{y}.png'],
			tileSize: 256
		}
	},
	'layers': [
		{
			id: 'simple-tiles',
			type: 'raster',
			source: 'raster-tiles',
			minzoom: 3,
			maxzoom: 12
		}
	]
},
center: [30.5238,50.45466], // starting position
zoom: 3, // starting zoom
minZoom: 1,
maxZoom: 6
});


map.scrollZoom.disable();

map.on('load', function () {
	map.resize();

    //let layer = topojson.feature(borders, borders.objects.borders)

	map.addSource('borders', {
		'type': 'geojson',
		'data': borders
	})

	map.addLayer({
		'id': 'borders',
		'type': 'line',
		'source': 'borders',
		'layout': {
		'line-join': 'round',
		'line-cap': 'round'
		},
		'paint': {
			'line-color': '#bababa',
			'line-width': 1
		}
	});
})

const scrolly = new ScrollyTeller({
	parent: document.querySelector("#scrolly-1"),
    triggerTop: .5, // percentage from the top of the screen that the trigger should fire
    triggerTopMobile: 0.75,
    transparentUntilActive: false
});

scrolly.addTrigger({num: 1, do: () => {

	map.flyTo({
		center: [30.5238,50.45466],
		zoom: 5,
		curve: 3, 
		essential: true
	});
	
}})

scrolly.addTrigger({num: 2, do: () => {


	map.flyTo({
		center: [20,20],
		zoom: 3,
		curve: 3, 
		essential: true
	});

}})

scrolly.addTrigger({num: 3, do: () => {

	map.flyTo({
		center: [30.5238,50.45466],
		zoom: 5,
		curve: 3, 
		essential: true
	});

}})

scrolly.watchScroll();


