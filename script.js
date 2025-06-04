// Navbar dropDown start

$(document).ready(function () {
  const dropBrand = $("#drop-brand");
  const dropShop = $("#drop-category");
  const dropSignin = $("#drop-signin");

  const allDropdowns = [dropBrand, dropShop];
  let currentOpen = null;
  let hasAnimated = false;

  function showDropdown(dropdown) {
    if (currentOpen && currentOpen[0] !== dropdown[0]) {
      currentOpen.hide();
    }
    if (!dropdown.is(":visible")) {
      if (!hasAnimated) {
        dropdown.stop(true, true).slideDown(300);
        hasAnimated = true;
      } else {
        dropdown.show(); // just show instantly
      }
      currentOpen = dropdown;
    }
  }

  function setupDropdown(menuSelector, dropdown) {
    $(menuSelector).on("mouseenter", function () {
      showDropdown(dropdown);
    });

    // Handle full mouse leave (menu + dropdown)
    $(`${menuSelector}, #${dropdown.attr("id")}, #nav`).on(
      "mouseleave",
      function () {
        setTimeout(function () {
          const isStillInside =
            $(menuSelector + ":hover").length ||
            $(`#${dropdown.attr("id")}:hover`).length ||
            $("#nav:hover").length;

          if (!isStillInside) {
            dropdown.stop(true, true).slideUp(300, function () {
              hasAnimated = false; // reset animation state
              currentOpen = null;
            });
          }
        }, 100);
      }
    );
  }

  setupDropdown(".menu-brand", dropBrand);
  setupDropdown(".menu-shop", dropShop);
  setupDropdown(".menu-signin", dropSignin);

  
  // Navbar dropDown end

  
  // Navbar dropDown Mobile start

    
  $('.menu-icon').click(function() {
      $('.menu').slideToggle();
    });

    $('.menu-signin').click(function() {
      $('.login-menu').slideToggle();
    });

    $('.drop-mobile').click(function() {
      $('.drop-mobile-shop').slideToggle();
    });


  // Navbar dropDown Mobile end

  // Catergory Section Horizontal scroll Start
  gsap.registerPlugin(ScrollTrigger);

  const horizontalSection = document.querySelector(".horizontal-scroll");

  gsap.to(horizontalSection, {
    x: () => -(horizontalSection.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".category-section",
      start: "top +70px",
      end: () => `+=${horizontalSection.scrollWidth - window.innerWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });
  // Catergory Section Horizontal scroll End

  // Vertical Scroll Section Logic Start
  
  document.addEventListener("DOMContentLoaded", function () {
    const promoCards = document.querySelectorAll(".promo-card");

    // Set first card as active initially
    if (promoCards.length > 0) {
      promoCards[0].classList.add("active");
    }

    // Intersection Observer for cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Observe each card
    promoCards.forEach((card, index) => {
      // Add delay based on index for staggered animation
      card.style.transitionDelay = `${index * 0.1}s`;
      cardObserver.observer(card);
    });

    // Fallback for browsers that don't support IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      promoCards.forEach((card) => {
        card.classList.add("active");
      });
    }
  });

  //    Vertical Scroll Section Script End

  // Feature Section Start
  $(document).ready(function () {
        $(".feature-products-2").hide();

        $(".feature-products-1 .f-forward-btn").click(function () {
          $(".feature-products-1").hide();
          $(".feature-products-2").show();
        });

        $(".feature-products-2 .f-back-btn").click(function () {
          $(".feature-products-2").hide();
          $(".feature-products-1").show();
        });
      });
  // Feature Section End

  // Brands Section Start

  // Add some interactive hover effects
  document.querySelectorAll(".brand-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".brands-section, .features-section")
    .forEach((section) => {
      observer.observe(section);
    });
  // Brands Section End

  // Testinomial Section Start

    class TestimonialCarousel {
            constructor() {
              console.log('In TestimonialCarousel')
                this.track = document.getElementById('carouselTrack');
                this.indicators = document.querySelectorAll('.indicator');
                this.cards = document.querySelectorAll('.testimonial-card');
                this.currentSlide = 0;
                this.cardWidth = 410; // card width + margin
                this.totalSlides = this.cards.length;
                this.isPlaying = true;
                this.interval = null;
                this.isDragging = false;
                this.startX = 0;
                this.currentX = 0;
                this.threshold = 50;

                this.init();
            }

            init() {
                this.setupAutoplay();
                this.setupDragControls();
                this.setupIndicators();
                this.setupHoverPause();
            }

            setupAutoplay() {
                this.interval = setInterval(() => {
                    if (this.isPlaying && !this.isDragging) {
                        this.nextSlide();
                    }
                }, 4000);
            }

            setupDragControls() {
                // Mouse events
                this.track.addEventListener('mousedown', (e) => this.startDrag(e));
                document.addEventListener('mousemove', (e) => this.drag(e));
                document.addEventListener('mouseup', () => this.endDrag());

                // Touch events
                this.track.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]), { passive: true });
                document.addEventListener('touchmove', (e) => this.drag(e.touches[0]), { passive: true });
                document.addEventListener('touchend', () => this.endDrag());

                // Prevent default drag behavior
                this.track.addEventListener('dragstart', (e) => e.preventDefault());
            }

            startDrag(e) {
                this.isDragging = true;
                this.startX = e.clientX;
                this.track.style.cursor = 'grabbing';
                this.track.style.transition = 'none';
            }

            drag(e) {
                if (!this.isDragging) return;
                
                this.currentX = e.clientX;
                const deltaX = this.currentX - this.startX;
                const currentTransform = -this.currentSlide * this.cardWidth;
                this.track.style.transform = `translateX(${currentTransform + deltaX}px)`;
            }

            endDrag() {
                if (!this.isDragging) return;
                
                this.isDragging = false;
                this.track.style.cursor = 'grab';
                this.track.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                const deltaX = this.currentX - this.startX;
                
                if (Math.abs(deltaX) > this.threshold) {
                    if (deltaX > 0) {
                        this.prevSlide();
                    } else {
                        this.nextSlide();
                    }
                } else {
                    this.goToSlide(this.currentSlide);
                }
            }

            setupIndicators() {
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        this.goToSlide(index);
                    });
                });
            }

            setupHoverPause() {
                const section = document.querySelector('.testimonials-section');
                section.addEventListener('mouseenter', () => {
                    this.isPlaying = false;
                });
                section.addEventListener('mouseleave', () => {
                    this.isPlaying = true;
                });
            }

            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % (this.totalSlides - 2); // -2 to show 3 cards
                this.goToSlide(this.currentSlide);
            }

            prevSlide() {
                this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 3 : this.currentSlide - 1;
                this.goToSlide(this.currentSlide);
            }

            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                const translateX = -slideIndex * this.cardWidth;
                this.track.style.transform = `translateX(${translateX}px)`;
                this.updateIndicators();
            }

            updateIndicators() {
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });
            }
        }

        // Initialize carousel when DOM is loaded
        // document.addEventListener('DOMContentLoaded', () => {
        // });
        new TestimonialCarousel();

        // Smooth scroll animations
        const observeOptions = {
            threshold: 1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observe = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observeOptions);

        document.querySelectorAll('.testimonials-section').forEach(section => {
            observe.observe(section);
        });

  // Testimonial Section End

   // Login form start


  $("i:nth(0)").click(function () {
    if ($("input:nth(3)").attr("type") == "password") {
      $("input:nth(3)").attr("type", "text");
      $("i:nth(0)").removeClass("fa-eye");
      $("i:nth(0)").addClass("fa-eye-slash");
    }
  });

  $("form").submit(function (e) {
    e.preventDefault();

    let firstName = $("input:nth(0)").val();
    let lastName = $("input:nth(0)").val();
    let email = $("input:nth(0)").val();
    let password = $("input:nth(0)").val();

    if(firstName == "") {
      $("span:nth(0)").removeClass("invisible");
    } else {
      $("span:nth(0)").addClass("invisible");
    }
    if(lastName == "") {
      $("span:nth(1)").removeClass("invisible");
    } else {
      $("span:nth(1)").addClass("invisible");
    }
    if(email == "") {
      $("span:nth(2)").removeClass("invisible");
    } else {
      $("span:nth(2)").addClass("invisible");
    }
    if(password == "") {
      $("span:nth(3)").removeClass("invisible");
    } else {
      $("span:nth(3)").addClass("invisible");
    }

    if (
      firstName != "" &&
      lastName != "" &&
      email != "" &&
      password != ""
    ) {
      let data = {
        Name: firstName,
        Last: lastName,
        Email: email,
        Pass: password
      }
      console.log(data);
    }
  })

  // Login form end
});
