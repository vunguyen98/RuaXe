
        var slideCurrentIndex = 0;
        var slideNextIndex = 0;
        showDivs(slideCurrentIndex);
        resizeContainerSlideshow();

        function autoMoveSlide(){
            setTimeout(function(){plusDivs(1);}, 5000);
            
            setTimeout(autoMoveSlide, 5000);
        }
        

        function resizeContainerSlideshow() {
            $('#slideshow').height($('.imgSlide')[slideCurrentIndex].height);
        }

        function plusDivs(n) {
            $('.slideButton').prop('disabled', true);

            slideNextIndex = CheckIndex(slideCurrentIndex + n);
            setColorButtonChoose();
            if (n > 0) {
                moveSlideLeftToRight();
            }
            else {
                moveSlideRightToLeft();
            }

            setTimeout(function () { $('.slideButton').prop('disabled', false); }, 1600);
        }


        function CheckIndex(n) {
            var x = document.getElementsByClassName("mySlide");
            if (n >= x.length) { return 0; }
            if (n < 0) { return x.length - 1; }

            return n;
        }

        function currentDiv(n) {
            if (n === slideCurrentIndex)
            return;
            slideNextIndex = n;
            setColorButtonChoose();
            if (slideNextIndex < slideCurrentIndex) {
                moveSlideLeftToRight();
            } else if (slideNextIndex > slideCurrentIndex) {
                moveSlideRightToLeft();
            }
        }

        function setColorButtonChoose(){
            var currentSlideButtonChoose = $('#slideButtonChoose' + slideCurrentIndex);
            var nextSlideButtonChoose = $('#slideButtonChoose' + slideNextIndex);

            currentSlideButtonChoose.css({
                'border-color':'rgb(255, 255, 255)'
            });
            nextSlideButtonChoose.css({
                'border-color':'rgb(255, 136, 0)'
            });
        }

        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlide");
            if (n >= x.length) { slideCurrentIndex = 0 }
            if (n < 0) { slideCurrentIndex = x.length - 1 }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }

            x[slideCurrentIndex].style.display = "block";
        }


        $.jqMoveSlideLeftToRight = function (currentslideCurrentIndex, nextslideCurrentIndex) {
            var currentSlide = $('#slide' + currentslideCurrentIndex);
            var nextSlide = $('#slide' + nextslideCurrentIndex);
            nextSlide.css({
                'right': '0px',
                'left': 'auto',//-currentSlide.width()
                'display': 'block'
            });

            currentSlide.animate({ left: currentSlide.width() / 2, opacity: '0.8' });
            currentSlide.animate({ left: currentSlide.width() / 3, opacity: '0.6' });
            currentSlide.animate({ left: currentSlide.width(), opacity: '0.1' });

            nextSlide.animate({ left: currentSlide.width() / 2 - currentSlide.width(), opacity: '0.3' });
            nextSlide.animate({ left: currentSlide.width() / 3 - currentSlide.width(), opacity: '0.6' });
            nextSlide.animate({ left: '0px', opacity: '1' });

            $.jsEnableSlideDelay(currentslideCurrentIndex);
            slideCurrentIndex = slideNextIndex;
        };

        $.jqMoveSlideRightToLeft = function (currentslideCurrentIndex, nextslideCurrentIndex) {
            var currentSlide = $('#slide' + currentslideCurrentIndex);
            var nextSlide = $('#slide' + nextslideCurrentIndex);

            nextSlide.css({
                'right': 'auto',
                'left': '0px', //'auto'
                'display': 'block'
            });

            currentSlide.animate({ left: -currentSlide.width() / 2, opacity: '0.8' });
            currentSlide.animate({ left: -currentSlide.width() / 3, opacity: '0.6' });
            currentSlide.animate({ left: -currentSlide.width(), opacity: '0.1' });

            nextSlide.animate({ left: currentSlide.width() - currentSlide.width() / 2, opacity: '0.3' });
            nextSlide.animate({ left: currentSlide.width() - currentSlide.width() / 3, opacity: '0.6' });
            nextSlide.animate({ left: '0px', opacity: '1' });

            $.jsEnableSlideDelay(currentslideCurrentIndex);
            slideCurrentIndex = slideNextIndex;
        };

        $.jsEnableSlideDelay = function (slideCurrentIndex) {
            var currentSlide = $('#slide' + slideCurrentIndex);
            currentSlide.delay(10)
                .queue(function (next) {
                    $(this).css('display', 'none');
                    next();
                });
        };

        function moveSlideLeftToRight() {
            $.jqMoveSlideLeftToRight(slideCurrentIndex, slideNextIndex);
        }

        function moveSlideRightToLeft() {
            $.jqMoveSlideRightToLeft(slideCurrentIndex, slideNextIndex);
        }

        function setIndexSlide() {
            var slides = document.getElementsByClassName('mySlide');
            for (var i = 0; i < slides.length; i++) {
                slides[i].id = 'slide' + i;
            }
        }

        function setIndexSlideButtonChoose() {
            var slides = document.getElementsByClassName('slideButtonChoose');
            for (var i = 0; i < slides.length; i++) {
                slides[i].id = 'slideButtonChoose' + i;
            }

            $('#slideButtonChoose0').css({
                'border-color':'rgb(255, 136, 0)'
            });
        }

        setIndexSlide();
        setIndexSlideButtonChoose();
        autoMoveSlide();

    