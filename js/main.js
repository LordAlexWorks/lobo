$(function () {
    var boCat = $('.bo img'),
        loCat = $('.lo img'),
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

    var Animation = function(element, options) {
        var self = this;

        self.target = element;
        self.top = options.top;
        self.left = options.left;
        self.time = options.time;

        self.lastTop = 0;
        self.lastLeft = 0;

        self.cycle = function() {
            self.lastTop += self.top.delta;
            self.lastLeft += self.left.delta;

            if (self.lastTop >= self.top.high || self.lastTop <= self.top.low) {
                self.top.delta *= -1;
            }

            if (self.lastLeft >= self.left.high || self.lastLeft <= self.left.low) {
                self.left.delta *= -1;
            }

            self.target.animate({ top: self.lastTop, left: self.lastLeft }, self.time);

            setTimeout(self.cycle, self.time);
        };

        self.cycle();

        return self;
    };

    var boAnim = new Animation(boCat, {
        top: {
            low: -80,
            high: 50,
            delta: 1
        },
        left: {
            low: -10,
            high: 70,
            delta: -0.5
        },
        time: 50
    });

    var loAnim = new Animation(loCat, {
        top: {
            low: -30,
            high: 10,
            delta: -1
        },
        left: {
            low: -70,
            high: 20,
            delta: -0.5
        },
        time: 50
    });

    /* SLIDES */
    var slides = $('.slide');
    var activeSlide;
    var overflowTimer = undefined;

    var weSlideIndex = 2;
    var themSlideIndex = 3;
    var usSlideIndex = 4;

    var initSlider = function() {
        activeSlide = 0;
        $('.left-arrow').hide();

        activateSlide(0);
    };

    var activateSlide = function (animTime) {
        if (animTime === undefined) animTime = 2000;

        for (var i = 0; i < slides.length; i++) {
            var shift = (i - activeSlide) * 100 + '%';

            $(slides[i]).css('left', shift);
            $(slides[i]).css('overflow', 'hidden');
        }

        if (overflowTimer !== undefined) clearTimeout(overflowTimer);

        overflowTimer = setTimeout(function() {
            for (var i = 0; i < slides.length; i++) {
                $(slides[i]).css('overflow', '');
            }

            overflowTimer = undefined;
        }, animTime);
    };

    var checkArrows = function() {
        if (activeSlide === slides.length - 1) $('.right-arrow').hide();
        else $('.right-arrow').show();

        if (activeSlide > 0) $('.left-arrow').show();
        else $('.left-arrow').hide();
    };

    var nextSlide = function () {
        activeSlide++;

        checkArrows();
        activateSlide();
    };

    var prevSlide = function () {
        activeSlide--;

        checkArrows();
        activateSlide();
    };

    $('.right-arrow').on('click', nextSlide);
    $('.left-arrow').on('click', prevSlide);

    initSlider();

    $('.marked.we').on('click', function() {
        activeSlide = weSlideIndex;

        checkArrows();
        activateSlide();
    });

    $('.marked.them').on('click', function() {
        activeSlide = themSlideIndex;

        checkArrows();
        activateSlide();
    });

    $('.marked.us').on('click', function () {
        activeSlide = usSlideIndex;

        checkArrows();
        activateSlide();
    });

    /* GRADIENT */

    var colors = new Array(
      [62, 35, 255],
      [60, 255, 60],
      [255, 35, 98],
      [45, 175, 230],
      [255, 0, 255],
      [255, 128, 0]);

    var step = 0;
    var colorIndices = [0, 1, 2, 3];
    var gradientSpeed = 0.003;

    function updateGradient() {

        if ($ === undefined) return;

        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

        $('.slide-one').css({
            background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
        }).css({
            background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
        });

        step += gradientSpeed;
        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

        }
    }

    setInterval(updateGradient, 10);
});