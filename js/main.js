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
            high: 30,
            delta: -1
        },
        left: {
            low: -70,
            high: 20,
            delta: -0.5
        },
        time: 50
    });
});