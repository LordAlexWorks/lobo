$(function () {
    var boCat = $('.bo img'),
        loCat = $('.lo img'),
        boOpen = $('.bo .text, .bo .text-mobile'),
        loOpen = $('.lo .text, .lo .text-mobile'),
        boDesc = $('.bo-desc'),
        loDesc = $('.lo-desc'),
        boClose = $('.bo-desc .close'),
        loClose = $('.lo-desc .close');

    boOpen.on('click', function() {
        boDesc.addClass('open');
        loDesc.removeClass('open');
    });

    loOpen.on('click', function () {
        boDesc.removeClass('open');
        loDesc.addClass('open');
    });

    boClose.on('click', function () {
        boDesc.removeClass('open');
    });

    loClose.on('click', function () {
        loDesc.removeClass('open');
    });

    var cats = [boCat, loCat, $('.bo .text'), $('.lo .text')];

    $(cats).each(function (i, e) { e.addClass('invisible'); });

    var animateCircle = function(circleSelector) {
        var val = 0;
        var $circle = $(circleSelector + ' circle');

        var draw = function() {
            var r = $circle.attr('r');
            var c = Math.PI * (r * 2);
            var pct = ((100 - val) / 100) * c * -1;

            $circle.css({ strokeDashoffset: pct });
            
            val++;
            if (val < 100) setTimeout(draw, 10);
            else {
                $circle.css({ strokeDashoffset: 0 });
            }
        }

        draw();
    };

    var catsFadeIn = function (index) {
        if (cats.length === index) {
            cats = [];
            return;
        }

        cats[index].removeClass('invisible');
        index++;

        if (index === 2) {
            setTimeout(function() {
                animateCircle('.bo .progress-circle');
            }, 1700);
        }
        else if (index === 3) {
            setTimeout(function () {
                animateCircle('.lo .progress-circle');
            }, 1700);
        }

        setTimeout(function () {
            catsFadeIn(index);
        }, 1500);
    };

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

    var projectsVlineDraw = function(line) {
        var currentY = parseInt(line.attr('y2'));

        if (currentY >= 500) {
            return;
        }

        line.attr('y2', currentY + 5);

        setTimeout(function () {
            projectsVlineDraw(line);
        }, 10);
    }

    var projectsHlineDraw = function (line) {
        var currentX = parseInt(line.attr('x2'));
        
        if (currentX >= 1110) {
            projectsVlineDraw($($('.projects-container .lines line')[1]));
            projectsVlineDraw($($('.projects-container .lines line')[2]));
            return;
        }

        line.attr('x2', currentX + 10);

        setTimeout(function() {
            projectsHlineDraw(line);
        }, 10);
    };

    var projectsFadeIn = function (projects) {
        if (projects.length === 0) {
            projectsHlineDraw($($('.projects-container .lines line')[0]));
            return;
        }

        var project = $(projects[0]);

        project.addClass('fade-in');
        projects = projects.splice(1);

        setTimeout(function() {
            projectsFadeIn(projects);
        }, 900);
    };

    var fruitsFadeId = function (fruits) {
        if (fruits.length === 0) {
            $('.slide-four .text').addClass('fade-in');
            return;
        }

        $(fruits[0]).addClass('fade-in');
        fruits = fruits.splice(1);

        setTimeout(function() {
            fruitsFadeId(fruits);
        }, 900);
    };
    
    /* GRADIENT */
    var colors = new Array(
      [255, 0, 0],
      [255, 165, 0],
      [255, 255, 0],
      [128, 0, 128]);

    var step = 0;
    var colorIndices = [0, 1, 2, 3];
    var gradientSpeed = 0.008;

    var gradientTimeout;

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
        var color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

        $('.slide-one')
            .css({ background: '-webkit-gradient(linear, left top, right top, from(' + color1 + '), to(' + color2 + '))' })
            .css({ background: '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)' });

        step += gradientSpeed;

        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        }

        gradientTimeout = setTimeout(updateGradient, 50);
    }


    /* SLIDES */
    var slides = $('.slide');
    var activeSlide;
    var overflowTimer = undefined;

    var homeSlideIndex = 0;
    var weSlideIndex = 1, weAnimated = false;
    var themSlideIndex = 2, themAnimated = false;
    var usSlideIndex = 3, usAnimated = false;

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

        if (activeSlide === homeSlideIndex) {
            //updateGradient();
        } else {
            clearTimeout(gradientTimeout);
        }

        if (activeSlide === weSlideIndex && !weAnimated) {
            weAnimated = true;

            setTimeout(function() {
                catsFadeIn(0);
            }, animTime);
        }
        else if (activeSlide === themSlideIndex && !themAnimated) {
            themAnimated = true;

            setTimeout(function () {
                projectsFadeIn($('.projects .project'));
            }, animTime);
        }
        else if (activeSlide === usSlideIndex && !usAnimated) {
            usAnimated = true;

            setTimeout(function () {
                fruitsFadeId($('.fruits .fruit'));
            }, animTime);
        }
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

    var markedHandlers = function () {
        $('.marked.we').on('click', function () {
            activeSlide = weSlideIndex;

            checkArrows();
            activateSlide();
        });

        $('.marked.them').on('click', function() {
            activeSlide = themSlideIndex;

            checkArrows();
            activateSlide();
        });

        $('.marked.us').on('click', function() {
            activeSlide = usSlideIndex;

            checkArrows();
            activateSlide();
        });
    };

    /* TYPEWRITER */
    var str = '<div class="title">'
        + '    <span class="marked underline we">We</span> make stuff'
        + '</div>'
        + '<br>'
        + '<div class="title">'
        + '    for <span class="marked underline them">them</span>, <a href="mailto:info@lobo.io" class="marked you">y<span class="underline">ou</span></a> and <span class="marked underline us">us</span>.'
        + '</div>'
        + '<br>'
        + '<div class="text">'
        + '    Lobo are a hard-working multi-disiplinary angency deliviring high quality projects.'
        + '</div>',
        textCounter = 0,
        isTag,
        isSpan,
        text,
        faster;

    var content = $('.slide-one .content');

    var type = function() {
        text = str.slice(0, ++textCounter);
        var slice = str.slice(textCounter);

        if (text === str) {
            markedHandlers();
            return;
        }

        var char = text.slice(-1);
        if (char === '<') {
            isTag = true;

            if (slice.indexOf('span') === 0) isSpan = true;
            else if (slice.indexOf('/span') === 0) {
                isSpan = false;
                setTimeout(type, 1000);

                return;
            }
        }
        else if (char === '>') isTag = false;
        else if (slice.indexOf('Lobo ') === 0) {
            faster = true;
        }
        
        if (isTag || char === ' ') return type();

        if (isSpan) {
            text += '</span><div class="slash">|</div>';
        } else {
            text += '<div class="slash">|</div>';
        }

        content.html(text);

        if (faster) setTimeout(type, 30);
        else setTimeout(type, 150);
    };

    type();

    /* LOAD DATA */
    $.getJSON('data/data.json', function (data) {
        $('.bo-desc .title').html(data['section-2']['bo']['title']);
        $('.bo-desc .text').html(data['section-2']['bo']['text']);

        $('.lo-desc .title').html(data['section-2']['lo']['title']);
        $('.lo-desc .text').html(data['section-2']['lo']['text']);

        // http://dimsemenov.com/plugins/magnific-popup/ for the gallery

        for (var i = 0; i < data['section-3']['projects'].length; i++) {
            var project = data['section-3']['projects'][i];
            var projectDom = $(''
                + '<div class="project">'
                + '    <div class="info">'
                + '        <div class="title"></div>'
                + '        <div class="desc"></div>'
                + '    </div>'
                + '    <div class="link"><i class="fa fa-eye"></i></div>'
                + '</div>'
                );

            projectDom.find('.title').html(project['title']);
            projectDom.find('.desc').html(project['desc']);

            if (i === data['section-3']['projects'].length - 1) {
                projectDom.addClass('last');
            }

            projectDom.magnificPopup({
                items: project['imgs'],
                gallery: {
                    enabled: true
                },
                type: 'image',
                removalDelay: 400
            });

            $('.slide-three .projects').append(projectDom);
        }
        $('<div class="clean"></div>').appendTo($('.slide-three .projects'));

        for (var i = 0; i < data['section-4']['projects'].length; i++) {
            var project = data['section-4']['projects'][i];
            var projectDom = $(''
                + '<div class="fruit">'
                + '    <a target="_blank">'
                + '        <img />'
                + '        <div class="title"></div>'
                + '    </a>'
                + '</div>'
                );

            projectDom.find('a').attr('href', project['url']);
            projectDom.find('img').attr('src', project['logo']);
            projectDom.find('.title').html(project['title']);

            if (i === data['section-4']['projects'].length - 1) {
                projectDom.addClass('last');
            }

            $('.slide-four .fruits').append(projectDom);
        }
        $('<div class="clean"></div>').appendTo($('.slide-four .fruits'));
    });
});