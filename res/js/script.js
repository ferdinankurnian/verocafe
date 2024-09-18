document.addEventListener('DOMContentLoaded', () => {

    /// Navbar Position Control ///
    window.onscroll = function() {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
            document.getElementById("nav").style.margin = "10px 0";
            document.getElementById("nav").style.position = "fixed";
        } else {
            document.getElementById("nav").style.margin = "25px 0px";
            document.getElementById("nav").style.position = "absolute";
        }
    } 


    /// Active Navbar Indicator Page ///
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        sections.forEach(section => {
            if (section.getAttribute('id') === current) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });

    
    // Carousel Control
    const slides = document.getElementsByClassName("carousel-item");
    const nextButton = document.getElementById("carousel-button-next");
    const prevButton = document.getElementById("carousel-button-prev");
    const dots = document.getElementsByClassName("dot");
    let position = 0;
    const numberOfSlides = slides.length;
    let intervalId; // Store the interval ID for clearing later

    function hideAllSlides() {
    for (const slide of slides) {
        slide.classList.remove("carousel-item-visible");
        slide.classList.add("carousel-item-hidden");
    }
    }

    function handleSlideChange(direction) {
        hideAllSlides();

        if (direction === "next") {
            position = (position + 1) % numberOfSlides;
        } else if (direction === "prev") {
            position = (position - 1 + numberOfSlides) % numberOfSlides; // Ensure positive index
        }

        slides[position].classList.add("carousel-item-visible");
        const selectedDot = document.querySelector(".selected-dot");
        selectedDot.classList.remove("selected-dot");
        dots[position].classList.add("selected-dot");
        dots[position].checked = true;
    }

    function startAutoplay() {
        intervalId = setInterval(function () {
            setTimeout(handleSlideChange("next"), 10000);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(intervalId);
    }

    startAutoplay();
    
    // Event listeners for manual control
    nextButton.addEventListener("click", () => {
        stopAutoplay();
        handleSlideChange("next")
        startAutoplay();
    });
    prevButton.addEventListener("click", () => {
        stopAutoplay();
        handleSlideChange("prev")
        startAutoplay();

    });

    // Add event listeners to dots
    for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
        stopAutoplay();
        position = i;
        handleSlideChange();
        console.log("Dot Clicked");
        startAutoplay();
    });
    }

    // Function to open a modal
    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.visibility = "visible";
    }
    
    // Function to close a modal
    function closeModal(modal) {
        modal.style.visibility = "hidden";
    }
    
    // Get all modal buttons
    var modalBtns = document.querySelectorAll('.modal-btn');
    
    // Add event listeners to modal buttons
    modalBtns.forEach(function(btn) {
        btn.onclick = function() {
        var modalId = this.getAttribute('data-modal-id');
            openModal(modalId);
        }
    });
    
    // Get all close buttons
    var closeBtns = document.querySelectorAll('.close');
    
    // Add event listeners to close buttons
    closeBtns.forEach(function(btn) {
        btn.onclick = function() {
        var modal = this.closest('.modal');
            closeModal(modal);
        }
    });
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    }

});
