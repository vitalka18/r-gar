$(document).ready(function() {
  mainSlider();

  $('#top-go').click(function(e) {
    e.preventDefault();
    $('body,html').animate({scrollTop:0},800);
  });

  setEqualHeight($('.base-info-card__img-title'));

  $('#lightboxModal').on('show.bs.modal', function (e) {
    var $link = $(e.relatedTarget);
    var $modal = $(e.target);
    var $img = $modal.find('img');
    $img.attr({src: $link.attr('data-img')});
  });

  $('#schemaMap').on('shown.bs.modal', function (e) {
    var $link = $(e.relatedTarget);
    var mapLat = $link.attr('data-lat') *1 ,
        mapLang = $link.attr('data-lang') *1 ;

    window.modalMap.setCenter([mapLat, mapLang]);
    window.myModalPlacemark.geometry.setCoordinates([mapLat, mapLang]);
  });
});

ymaps.ready(function () {
  if ( $('#map').length ) {
    var myMap = new ymaps.Map('map', {
      center: [59.889708, 30.478156],
      zoom: 14,
      controls: []
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map.png',
      iconImageSize: [195, 184],
      iconImageOffset: [-90, -180]
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  }

  if ( $('#mapModal').length ) {
    ymaps.ready(function () {
      window.modalMap = new ymaps.Map('mapModal', {
        center: [59.889708, 30.478156],
        zoom: 14    
      });

      window.myModalPlacemark = new ymaps.Placemark(modalMap.getCenter(), {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-2.png',
        iconImageSize: [44, 40],
        iconImageOffset: [-22, -22]
      });

      modalMap.geoObjects.add(myModalPlacemark);
      modalMap.behaviors.disable('scrollZoom');
    });
  }
  
  if ( $('#mapContact').length ) {
    var myContactMap = new ymaps.Map('mapContact', {
      center: [59.889708, 30.478156],
      zoom: 5,
      controls: ['zoomControl', 'typeSelector']
    });

    var contactStore = [
      {x: 59.889708, y: 30.478156}
    ];

    contactStore.forEach(function(store) {
      var myPlacemark = new ymaps.Placemark([store.x, store.y], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-2.png',
        iconImageSize: [44, 40],
        iconImageOffset: [-22, -22]
      });

      myContactMap.geoObjects.add(myPlacemark);
      myContactMap.behaviors.disable('scrollZoom');
    });
  }
});





function mainSlider() {
  $('.js-about-slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

function setEqualHeight(columns){
  var tallestcolumn = 0;
  columns.each(
  function(){
    currentHeight = $(this).height();
    if(currentHeight > tallestcolumn){
      tallestcolumn = currentHeight;
    }
  });
  columns.height(tallestcolumn);
}