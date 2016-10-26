$(document).ready(function() {
  mainSlider();

  $('#top-go').click(function(e) {
    e.preventDefault();
    $('body,html').animate({scrollTop:0},800);
  });

  
  if ( $(window).width() > 480) {
    setEqualHeight($('.base-info-card__img-title'));
    setEqualHeight($('.tech-item__preview'));
  }

  $(window).resize(function() {
    if ( $(window).width() > 480) {
      $('.goods-view, .goods-view__photo').css({'height': 'auto'});
      setEqualHeight($('.goods-view, .goods-view__photo'));

      $('.base-info-card__img-title').css({'height': 'auto'});
      $('.tech-item__preview').css({'height': 'auto'});
      setEqualHeight($('.base-info-card__img-title'));
      setEqualHeight($('.tech-item__preview'));
    } else {
      $('.goods-view, .goods-view__photo').css({'height': 'auto'});
    }
  });

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

    google.maps.event.trigger(window.modalMap, "resize");
    window.modalMap.setCenter({lat: mapLat, lng: mapLang});
    window.myModalPlacemark.setOptions({
      position: {
        lat: mapLat, 
        lng: mapLang
      }
    });
  });
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

function initMap () {
  if ( $('#map').length ) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 59.88970, lng: 30.478156}
    });

    var image = 'img/map.png';
    var beachMarker = new google.maps.Marker({
      position: {lat: 59.889708, lng: 30.478156},
      map: map,
      size: new google.maps.Size(100, 100),
      icon: image
    });
  }

  if ( $('#mapContact').length ) {
    var myContactMap = new google.maps.Map(document.getElementById('mapContact'), {
      zoom: 5,
      center: {lat: 59.88970, lng: 30.478156}
    });

    var contactStore = [
      {x: 59.889708, y: 30.478156}
    ];

    contactStore.forEach(function(store) {
      var image = 'img/map-2.png';
      
      var beachMarker = new google.maps.Marker({
        position: {lat: store.x, lng: store.y},
        map: myContactMap,
        size: new google.maps.Size(44, 42),
        icon: image
      });
    });
  }

  if ( $('#mapModal').length ) {
   window.modalMap = new google.maps.Map(document.getElementById('mapModal'), {
      zoom: 14,
      center: {lat: 59.88970, lng: 30.478156}
    });

    var modalImage = 'img/map-2.png';
      
    window.myModalPlacemark = new google.maps.Marker({
      position: {lat: 59.88970, lng: 30.478156},
      map: modalMap,
      size: new google.maps.Size(44, 42),
      icon: modalImage
    });
  }

}