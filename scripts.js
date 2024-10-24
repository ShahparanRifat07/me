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
function navbar() {
    const menuBtn = document.querySelector(".nav-menu");
    const expendMenu = document.querySelector(".expend-nav");
    const closebtn = document.querySelector(".close-btn-text");
    const logo = document.querySelector(".logo svg path");
    const logoFillColor = getComputedStyle(logo).getPropertyValue('fill');

    menuBtn.addEventListener("click", () => {
        // Reset the zIndex to make the menu visible again
        gsap.set(".right-nav", { yPercent: 0 });
        gsap.set(".nav-link", { xPercent: 0 });
        expendMenu.style.zIndex = 100;
        gsap
            .timeline()
            .to(expendMenu, { duration: 0.2, opacity: 1 })
            .from(".right-nav", { yPercent: 100, duration: 0.5 }, "a")
            .from(".nav-link", { xPercent: 100, duration: 0.5, stagger: 0.1 }, "a");
    });

    closebtn.addEventListener("click", () => {
        gsap
            .timeline()
            .to(".right-nav", { yPercent: 100, duration: 0.5 }, "a")
            .to(".nav-link", { xPercent: 100, duration: 0.5, stagger: 0.1 }, "a")
            .to(expendMenu, { duration: 0.2, opacity: 0 })
            .to(expendMenu, { zIndex: -100, duration: 0.1 })
    });
}
function updateDhakaTime() {
    const options = {
        timeZone: "Asia/Dhaka", // Set the time zone to Dhaka
        hour: "2-digit", // Format the hours
        minute: "2-digit", // Format the minutes
        second: "2-digit", // Format the seconds
        hour12: true, // Use 12-hour format
    };

    const now = new Date(); // Get the current date and time
    const dhakaTime = new Intl.DateTimeFormat("en-US", options).format(now); // Format the time

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
    const section2Title = document.querySelector(
        ".section-2 > div:first-child  p"
    );
    const section2Text = document.querySelector(".section-2 > div:last-child p");

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
            start: "top top",
            end: () => `+=${section2.clientHeight * 0.5}`,
            scrub: 1,
        },
    });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: section2,
            pin: true,
            start: "10% top",
            // end: "bottom bottom",
            end: () => `bottom+=${section2.clientHeight * 1.5}px bottom`,
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
        scale: 230, // Zoom in
        duration: 5,
        ease: "power2.in",
        transformOrigin: "46% 50%",
        scrollTrigger: {
            trigger: ".section-3",
            start: "center center",
            end: "bottom+=75% bottom",
            scrub: 0.5,
            pin: true,
            // markers: true,
        },
    });

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
        // yPercent: 50,
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

document.addEventListener("DOMContentLoaded", () => {
    const lenisInstance = smoothenScroll();
    navbar();
    heroSectionAnimation();
    section2Animation();
    section3Animation(lenisInstance);
    section4Animation();
    section5Animation();
    // updateDhakaTime();
    // setInterval(updateDhakaTime, 1000);
});
