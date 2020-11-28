let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.75, 37.60],
        zoom: 14,
        controls: []
    });

    const coords = [
        [55.743455, 37.583656],
        [55.755799, 37.584804],
        [55.747812, 37.606940],
        [55.755103, 37.625051],
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/icons/marker.png',
        iconImageSize: [58, 73],
        iconImageOffset: [-3, -42]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);