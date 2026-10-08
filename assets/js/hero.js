
document.addEventListener('DOMContentLoaded', function () {
    var slider = document.querySelector('.hero-slider');
    if (!slider) return;

    var track = slider.querySelector('.hero-slider__track');
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slider__slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.hero-slider__dot'));
    var total = slides.length;
    var current = 0;
    var IMAGE_DURATION = 6000; // ms per image slide
    var timer = null;

    function goTo(index) {
        current = (index + total) % total;

        track.style.transform = 'translateX(-' + (current * 100) + '%)';

        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === current);
        });

        dots.forEach(function (dot, i) {
            dot.classList.remove('is-active');
            var progress = dot.querySelector('.hero-slider__dot-progress');
            progress.style.animation = 'none';
            progress.style.width = '0%';
            void progress.offsetWidth; // restart animation
        });
        dots[current].classList.add('is-active');

        startSlideTimer();
    }

    function startSlideTimer() {
        clearTimeout(timer);

        var activeSlide = slides[current];
        var video = activeSlide.querySelector('video');
        var activeDotProgress = dots[current].querySelector('.hero-slider__dot-progress');

        if (video) {
            // video slide: advance when video ends, sync dot progress to its duration
            var advance = function () {
                video.removeEventListener('ended', advance);
                next();
            };
            video.addEventListener('ended', advance);

            video.addEventListener('loadedmetadata', function setDuration() {
                activeDotProgress.style.animation =
                    'hero-slider-fill ' + video.duration + 's linear forwards';
                video.removeEventListener('loadedmetadata', setDuration);
            });

            // in case metadata is already available
            if (video.readyState >= 1 && video.duration) {
                activeDotProgress.style.animation =
                    'hero-slider-fill ' + video.duration + 's linear forwards';
            }
        } else {
            // image slide: advance after fixed duration
            activeDotProgress.style.animation =
                'hero-slider-fill ' + (IMAGE_DURATION / 1000) + 's linear forwards';
            timer = setTimeout(next, IMAGE_DURATION);
        }
    }

    function next() {
        goTo(current + 1);
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goTo(i);
        });
    });

    goTo(0);
});

