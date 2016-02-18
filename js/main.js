$(function () {
    var boCat = $('.bo'),
        loCat = $('.lo'),
        boOpen = $('.bo .text'),
        loOpen = $('.lo .text'),
        boDesc = $('.bo-desc'),
        loDesc = $('.lo-desc'),
        boClose = $('.bo-desc .close'),
        loClose = $('.lo-desc .close');

    boDesc.hide();
    loDesc.hide();

    boOpen.on('click', function() {
        boDesc.show();
        loDesc.hide();
    });

    loOpen.on('click', function () {
        loDesc.show();
        boDesc.hide();
    });

    boClose.on('click', function () {
        boDesc.hide();
    });

    loClose.on('click', function () {
        loDesc.hide();
    });
});