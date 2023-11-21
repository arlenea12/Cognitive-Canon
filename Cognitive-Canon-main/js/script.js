// Function to create a new timeline for each link
function createHoverTimeline(link, pink) {
  let hoverTL = gsap.timeline();
  hoverTL.pause();

  hoverTL.to(pink, {
    width: "calc(100% + 1.3em)",
    ease: "Elastic.easeOut(0.25)",
    duration: 0.4
  });

  hoverTL.to(pink, {
    width: "2em",
    left: "calc(100% - 1.45em)",
    ease: "Elastic.easeOut(0.4)",
    duration: 0.6
  });

  link.addEventListener("mouseenter", () => {
    hoverTL.play();
  });

  link.addEventListener("mouseleave", () => {
    hoverTL.reverse();
  });

  return hoverTL; // Return the timeline for reference
}

// Get all links and iterate over them to create timelines
const links = document.querySelectorAll(".link");
links.forEach(link => {
  const pink = link.querySelector(".color");
  const hoverTimeline = createHoverTimeline(link, pink);
});
