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
                anticipatePin: 1
            }
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
          cardObserver.observe(card);
        });

        // Fallback for browsers that don't support IntersectionObserver
        if (!("IntersectionObserver" in window)) {
          promoCards.forEach((card) => {
            card.classList.add("active");
          });
        }
      });

    //    Vertical Scroll Section Script End

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
