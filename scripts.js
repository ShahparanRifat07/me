function splitTextIntoSpans(element) {
    const text = element.innerText;
    element.innerHTML = ""; // Clear the original text

    text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char; // Set the character
        element.appendChild(span); // Append to the element
    });
}
function smoothenScroll() {
    const lenis = new Lenis();
    lenis.on("scroll", (e) => {
        // console.log(e);
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 500);
    });
    gsap.ticker.lagSmoothing(0);

    // const lenis = new Lenis({
    //     duration: 1,
    //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    // });
    // function raf(time) {
    //     lenis.raf(time)
    //     requestAnimationFrame(raf)
    // }

    // requestAnimationFrame(raf)

    return lenis;
}
function smoothScrollToSection(targetSection) {
    gsap.to(window, {
        duration: 1, // Adjust duration for smoothness
        scrollTo: { y: targetSection, offsetY: 50 }, // Scroll to section with some offset
        ease: "power2.inOut" // Easing effect for smooth scroll
    });
}

function customCursor() {
    let cursor = document.querySelector('#custom-cursor');
    let projects = document.querySelectorAll(".project-card");

    if (window.innerWidth >= 992) {
        projects.forEach((project, index) => {
            project.addEventListener('mousemove', (e) => {
                gsap.to(cursor, {
                    x: e.clientX + 'px',
                    y: e.clientY + 'px',
                    xPercent: -50,
                    yPercent: -50,
                    duration: 0.3,
                    ease: "power1.out",
                })
            });
            project.addEventListener('mouseenter', (e) => {
                cursor.classList.add('active');
                cursor.innerHTML = `<p>VIEW</p> <br> <p> PROJECTS </p>`
                gsap.to(cursor, {
                    x: e.clientX + 'px',
                    y: e.clientY + 'px',
                    xPercent: -50,
                    yPercent: -50,
                    duration: 0.3,
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    opacity: 1,
                    backgroundColor: `var(--tomato)`,
                    ease: "none",
                })
            });
            project.addEventListener('mouseleave', () => {
                // cursor.classList.remove('active');
                gsap.to(cursor, {
                    top: e.clientX + 'px',
                    left: e.clientY + 'px',
                    xPercent: -50,
                    yPercent: -50,
                    duration: 0.3,
                    height: 0,
                    width: 0,
                    opacity: 0,
                    backgroundColor: "transparent",
                    ease: "none",
                })
            });
        });
    }
}

function showHideNavbar() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector(".nav").style.top = "0";
        } else {
            document.querySelector(".nav").style.top = "-10vh";
        }
        prevScrollpos = currentScrollPos;
    }
}

// function navbar() {
//     const menuBtn = document.querySelector(".nav-menu");
//     const expendMenu = document.querySelector(".expend-nav");
//     const closebtn = document.querySelector(".close-btn-text");
//     const logo = document.querySelector(".logo svg path");
//     const logoFillColor = getComputedStyle(logo).getPropertyValue('fill');

//     menuBtn.addEventListener("click", () => {
//         // Reset the zIndex to make the menu visible again
//         gsap.set(".right-nav", { yPercent: 0 });
//         gsap.set(".nav-link", { xPercent: 0 });
//         expendMenu.style.zIndex = 150;
//         gsap
//             .timeline()
//             .to(expendMenu, { duration: 0.2, opacity: 1 })
//             .from(".right-nav", { yPercent: 100, duration: 0.5 }, "a")
//             .from(".nav-link", { xPercent: 100, duration: 0.5, stagger: 0.1 }, "a");
//     });

//     closebtn.addEventListener("click", () => {
//         gsap
//             .timeline()
//             .to(".right-nav", { yPercent: 100, duration: 0.5 }, "a")
//             .to(".nav-link", { xPercent: 100, duration: 0.5, stagger: 0.1 }, "a")
//             .to(expendMenu, { duration: 0.2, opacity: 0 })
//             .to(expendMenu, { zIndex: -100, duration: 0.1 })
//     });


//     const sections = {
//         work: document.querySelector(".section-6"), 
//         about: document.querySelector(".section-2-content"),
//         education: document.querySelector(".inner-section-4"),
//         experience: document.querySelector(".inner-section-5"),
//         contact: document.querySelector(".section-9")
//     };


//      // Add event listeners to navigation links for smooth scrolling
//      document.querySelector('.work-nav-link').addEventListener('click', () => {
//         smoothScrollToSection(sections.work);
//     });

//     document.querySelector('.about-nav-link').addEventListener('click', () => {
//         smoothScrollToSection(sections.about);
//     });

//     document.querySelector('.education-nav-link').addEventListener('click', () => {
//         smoothScrollToSection(sections.education);
//     });

//     document.querySelector('.experience-nav-link').addEventListener('click', () => {
//         smoothScrollToSection(sections.experience);
//     });

//     document.querySelector('.contact-nav-link').addEventListener('click', () => {
//         smoothScrollToSection(sections.contact);
//     });
// }

function navbar(lenis) {
    const menuBtn = document.querySelector(".nav-menu");
    const expendMenu = document.querySelector(".expend-nav");
    const closebtn = document.querySelector(".close-btn-text");
    const logo = document.querySelector(".logo svg path");
    const logoFillColor = getComputedStyle(logo).getPropertyValue('fill');
    
    function closeMenu() {
        return gsap.timeline()
            .to(".right-nav", { yPercent: 100, duration: 0.5 }, "a")
            .to(".nav-link", { xPercent: 100, duration: 0.5, stagger: 0.1 }, "a")
            .to(expendMenu, { duration: 0.2, opacity: 0 })
            .to(expendMenu, { zIndex: -100, duration: 0.1 });
    }

    function scrollToSection(sectionSelector, offsetValue) {
        const targetSection = document.querySelector(sectionSelector);
        if (!targetSection) return;
        ScrollTrigger.refresh();

        const isFixed = window.getComputedStyle(targetSection).position === 'fixed';

        if (isFixed) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            lenis.scrollTo(documentHeight - windowHeight, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            lenis.scrollTo(targetSection, {
                offset: offsetValue,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    }

    // function scrollToSection(sectionSelector, offset = 0) {
    //     const targetSection = document.querySelector(sectionSelector);
    //     if (!targetSection) return;

    //     // Refresh ScrollTrigger before scrolling
    //     ScrollTrigger.refresh();

    //     // Special handling for work section
    //     if (sectionSelector === '.inner-section-6') {
    //         // First scroll to the section vertically
    //         return lenis.scrollTo(targetSection, {
    //             offset: offset,
    //             duration: 1.5,
    //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    //         }).then(() => {
    //             // Reset the section-6 scroll position
    //             const section6 = document.querySelector('.section-6');
    //             if (section6) {
    //                 gsap.to(section6, {
    //                     duration: 0.8,
    //                     scrollLeft: 0,
    //                     ease: "power2.out"
    //                 });

    //                 // Also reset the inner section if needed
    //                 const innerSection6 = document.querySelector('.inner-section-6');
    //                 if (innerSection6) {
    //                     gsap.to(innerSection6, {
    //                         duration: 0.8,
    //                         x: 0,
    //                         ease: "power2.out"
    //                     });
    //                 }
    //             }
    //         });
    //     } else if (window.getComputedStyle(targetSection).position === 'fixed') {
    //         // For fixed sections
    //         const windowHeight = window.innerHeight;
    //         const documentHeight = document.documentElement.scrollHeight;
            
    //         return lenis.scrollTo(documentHeight - windowHeight, {
    //             duration: 1.5,
    //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    //         });
    //     } else {
    //         // Normal sections
    //         return lenis.scrollTo(targetSection, {
    //             offset: offset,
    //             duration: 1.5,
    //             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    //         });
    //     }
    // }

    menuBtn.addEventListener("click", () => {
        gsap.set(".right-nav", { yPercent: 0 });
        gsap.set(".nav-link", { xPercent: 0 });
        expendMenu.style.zIndex = 150;
        gsap.timeline()
            .to(expendMenu, { duration: 0.2, opacity: 1 })
            .from(".right-nav", { yPercent: 100, duration: 0.5 }, "a")
            .from(".nav-link", { xPercent: 100, duration: 0.5, stagger: 0.1 }, "a");
    });

    closebtn.addEventListener("click", () => {
        closeMenu();
    });

    const navLinks = [
        { selector: '.work-nav-link', target: '.inner-section-6' , offset: 0 },
        { selector: '.about-nav-link', target: '.section-2-inner', offset: 0 },
        { selector: '.education-nav-link', target: '.inner-section-4', offset: 60 },
        { selector: '.experience-nav-link', target: '.inner-section-5', offset: 150 },
        { selector: '.contact-nav-link', target: '.section-9', offset: 0 }
    ];

    navLinks.forEach(({ selector, target, offset }) => {
        document.querySelector(selector).addEventListener('click', () => {
            closeMenu().then(() => {
                scrollToSection(target, offset);
            });
        });
    });
}


function updateDhakaTime() {
    const options = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit", 
        minute: "2-digit",
        // second: "2-digit",
        hour12: true,
    };

    const now = new Date();
    const dhakaTime = new Intl.DateTimeFormat("en-US", options).format(now); 

    document.querySelector(".local-time").innerText = dhakaTime;
}
function heroSectionAnimation() {
    const text1 = document.querySelector(".hero-text-1");
    const text2 = document.querySelector(".hero-text-2");
    const authorName = document.querySelector(".author-name");

    splitTextIntoSpans(text1);
    splitTextIntoSpans(text2);

    const timeline = gsap.timeline();

    timeline.from(authorName, {
        opacity: 0,
        yPercent: 100,
        duration: 1.25,
    });
    timeline.from(
        ".hero-text-1",
        {
            xPercent: 5,
            duration: 1,
        },
        "a"
    );
    timeline.from(
        ".hero-text-2",
        {
            xPercent: -5,
            duration: 1,
        },
        "a"
    );
    timeline.from(
        ".hero-text-1 span",
        {
            opacity: 0,
            stagger: 0.08,
            duration: 1.5,
        },
        "a"
    );
    timeline.from(
        ".hero-text-2 span",
        {
            opacity: 0,
            stagger: {
                each: 0.08,
                from: "end",
            },
            duration: 1.5,
        },
        "a"
    );
    timeline.from(
        ".bottom-hero-section",
        {
            opacity: 0,
            yPercent: 100,
            duration: 1,
        },
        "-=1.5"
    );
    timeline.from(
        ".nav",
        {
            opacity: 0,
            yPercent: -100,
            duration: 1,
        },
        "-=1.5"
    );
    timeline.from(
        ".middle-hero-section",
        {
            opacity: 0,
            yPercent: 15,
            duration: 1,
        },
        "-=1.5"
    );
}
function section2Animation() {
    const section2 = document.querySelector(".section-2");
    const section2Inner = document.querySelector(".section-2-inner");
    const section2Title = document.querySelector(
        ".section-2-content > div:first-child  p"
    );
    const section2Text = document.querySelector(".section-2-content > div:last-child p");

    splitTextIntoSpans(section2Title);
    splitTextIntoSpans(section2Text);

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".section-2-heading span", {
        y: "100%",
        duration: 5,
        stagger: 0.5,
        ease: "sine.out",
        opacity: 0,
        scrollTrigger: {
            trigger: section2,
            start: `${section2Inner.offsetTop - 150}px top`,
            end: () => `+=${section2.clientHeight * 0.3}`,
            scrub: 1,
            // markers: true,
        },
    });

    console.log(section2Inner.clientHeight , section2Inner.offsetTop);
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: section2,
            pin: true,
            start: `${section2Inner.offsetTop}px top`,
            // end: "bottom bottom",
            end: () => `bottom+=${section2Inner.clientHeight * 1.5}px bottom`,
            scrub: 1,
            // markers: true,
        },
    });

    tl.to(".section-2-text span", {
        opacity: 1,
        stagger: 0.5,
    });
}
function section3Animation(lenis) {
    const text1 = document.querySelector(".section-3 p");
    splitTextIntoSpans(text1);

    const tl = gsap.timeline();

    tl.from(".section-3 p span", {
        y: "100%",
        duration: 5,
        stagger: 0.5,
        ease: "sine.out",
        opacity: 0,
        scrollTrigger: {
            trigger: ".section-3",
            start: "top center",
            end: "bottom bottom",
            scrub: 1,
            // markers: true,
        },
    });
    tl.to(".section-3 p", {
        scale: 2, // Zoom in
        fontSize: "350vw",
        duration: 5,
        ease: "power2.in",
        transformOrigin: "48% 45%",
        scrollTrigger: {
            trigger: ".section-3",
            start: "center center",
            end: "bottom+=50% bottom",
            scrub: 0.5,
            pin: true,
            // markers: true,
        },
    },"a");

    const tl2 = gsap.timeline();
    tl2.to(".inner-section-4", {
        scale: 1, // Zoom in
        duration: 3,
        ease: "power2.in",
        scrollTrigger: {
            trigger: ".section-4",
            start: "top top",
            end: "+=1000px center",
            scrub: true, // Smooth scroll animation
            pin: true, // Pin the section while scrolling
            // markers: true, // Show markers on the timeline
        },
    });

    // tl2.to(".nav-menu",{
    //     color: "black",
    //     scrollTrigger: {
    //         trigger: ".section-4",
    //         start: "top top",
    //         scrub: true, // Smooth scroll animation
    //     },
    // },"b")
    // tl2.to(".logo svg path",{
    //     fill: "black",
    //     ease: "power2.in",
    //     scrollTrigger: {
    //         trigger: ".section-4",
    //         start: "top top",
    //         scrub: true, // Smooth scroll animation
    //     },
    // },"b")
}
function section4Animation() {
    const texts = document.querySelectorAll(".degree");
    texts.forEach(element => {
        splitTextIntoSpans(element); // This function splits text into spans
    });

    const eduCards = document.querySelectorAll(".edu-card");

    eduCards.forEach(element => {
        const degreeTitle = element.querySelector(".degree-title");
        const degreeInfo = element.querySelector(".degree-info");
        const degreeInfoPs = element.querySelectorAll(".degree-info p");

        // Mouseover event to trigger animation and opacity change
        degreeTitle.addEventListener("mouseover", () => {
            let text1 = degreeTitle.querySelectorAll(".first-text span");
            let text2 = degreeTitle.querySelectorAll(".second-text span");

            // Animate the hovered text
            gsap.to(text1, {
                yPercent: -100,
                stagger: 0.01,
                ease: "sine.out",
                duration: 0.5,
                delay: 0.35,
            });
            gsap.to(text2, {
                yPercent: -100,
                stagger: 0.01,
                ease: "sine.out",
                duration: 0.5,
                delay: 0.35,
            });

            gsap.to(degreeInfoPs, {
                opacity: 1, // Show the degree info
                ease: "sine.out",
                stagger: 0.3,
            });

            // Reduce opacity of sibling degreeTitles
            eduCards.forEach(sibling => {
                if (sibling !== element) {
                    const siblingDegreeTitle = sibling.querySelector(".degree-title");
                    gsap.to(siblingDegreeTitle, {
                        opacity: 0.3, // Set lower opacity for siblings
                        duration: 0.3,
                    });
                }
            });
        });

        // Mouseleave event to reset the text animation and opacity
        degreeTitle.addEventListener("mouseleave", () => {
            // Reset the text animation
            let text1 = degreeTitle.querySelectorAll(".first-text span");
            let text2 = degreeTitle.querySelectorAll(".second-text span");

            gsap.to(text1, {
                yPercent: 0, // Move back to original position
                stagger: 0.01,
                ease: "power2.in",
                duration: 0.5,
                delay: 0.35,
            });
            gsap.to(text2, {
                yPercent: 100, // Move back to original position
                stagger: 0.01,
                ease: "power2.in",
                duration: 0.5,
                delay: 0.35,
            });

            gsap.to(degreeInfoPs, {
                opacity: 0.35, // Show the degree info
                ease: "sine.out",
                stagger: 0.3,
            });

            // Restore opacity of all degreeTitles
            eduCards.forEach(sibling => {
                const siblingDegreeTitle = sibling.querySelector(".degree-title");
                gsap.to(siblingDegreeTitle, {
                    opacity: 1, // Reset to full opacity
                    duration: 0.3,
                });
            });
        });
    });
}
function section5Animation() {
    let section5Title = document.querySelector(".experience-title");
    let section5TitleSpan = splitTextIntoSpans(section5Title);

    let section5Ps = document.querySelectorAll(".experience-wrapper p");

    let section5Timeline = gsap.timeline();

    section5Timeline.from(".experience-title span ", {
        yPercent: 30,
        opacity: 0,
        // color: "black",
        duration: 6,
        stagger: 0.6,
        ease: "power2.in",
        scrollTrigger: {
            trigger: ".experience-heading",
            start: "top center",
            end: "bottom bottom",
            scrub: 1,
            // markers: true,
        },
    });


    const experience_cards = gsap.utils.toArray(".experience-card");

    experience_cards.forEach((card, index) => {
        // if (index !== 0) {
            gsap.from(card, {
                yPercent: 50,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "-50% 80%",
                    end: "+=800px bottom",
                    // markers: true,
                    scrub: 1,
                }
            });
        // }
    })


}
function section6Animation() {
    const section6 = document.querySelector(".section-6");
    const section5 = document.querySelector(".section-5");
    const section6Title = document.querySelector(".my-works-heading-warpper p");
    const section6TitleSpan = splitTextIntoSpans(section6Title);
    let sections = gsap.utils.toArray(".panel");


    const section6Timeline = gsap.timeline();

    section6Timeline.to(section6, {
        backgroundColor: "black",
        duration: 2,
        ease: "power2.in",
        scrollTrigger: {
            trigger: section6,
            start: "20% center",
            end: "30% center",
            scrub: 1,
        },
    })
    .to(section5, {
        backgroundColor: "black",
        duration: 2,
        ease: "power2.in",
        scrollTrigger: {
            trigger: section6,
            start: "20% center",
            end: "30% center",
            scrub: 1,
        },
    })
    .from(".my-works-heading-warpper p span", {
        duration: 5,
        stagger: 0.5,
        ease: "sine.out",
        opacity: 0,
        scrollTrigger: {
            trigger: section6,
            start: "20% center",
            end: "bottom center",
            scrub: 1,
            // markers: true,
        },
    })
    

    gsap.to(".inner-section-6", {
        x: () => -(section6.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: section6,
            start: "50% center", // Start after text animation ends
            end: "+=3000", // Adjust this value to control scroll length
            pin: true,
            scrub: 1,
            // snap: {
            //     snapTo: 1 / (sections.length - 1),
            //     duration: {min: 0.2, max: 0.3},
            //     delay: 0,
            //     ease: "power1.inOut"
            // },
            // markers: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // markers: true,
            invalidateOnRefresh: true, // Handle window resizing
            anticipatePin: 1,
        },
    });



}
function section7Animation() {
    const section7 = document.querySelector(".section-7");
    const section7Inner = document.querySelector(".section-7-inner");

    const section7Timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section7,
            start: `${section7Inner.offsetTop}px top`,
            end: `+=2000px center`,
            pin: true,
            scrub: 1, // Uncomment if you want smooth scrubbing
            // markers: true,
        }
    });


    section7Timeline.to("#python", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#django", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#figma", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#gsap", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#webflow", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#git", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#postgres", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#fastapi", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#laravel", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#spring-boot", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#wordpress", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#redis", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#javascript", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#drf", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#docker", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#php", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#mysql", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#rabbitmq", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#java", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
    section7Timeline.to("#framer", {
        filter: "blur(0)",
        opacity: 1,
        duration: 0.3,
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const lenisInstance = smoothenScroll();
    navbar(lenisInstance);
    heroSectionAnimation();
    customCursor();
    showHideNavbar();
    section2Animation();
    section3Animation(lenisInstance);
    section4Animation();
    section5Animation();
    section6Animation();
    section7Animation();
    updateDhakaTime();
    setInterval(updateDhakaTime, 1000);
});
