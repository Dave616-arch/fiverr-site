let timeout = null;
let isUserScrolling = false;

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-section");

    function checkScroll() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    }

    function findClosestSection() {
        let minDistance = Infinity;
        let closest = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const distance = Math.abs(center - window.innerHeight / 2);

            if (distance < minDistance) {
                minDistance = distance;
                closest = section;
            }
        });

        return closest;
    }

    function smoothScrollToSection(section) {
        if (!section || isUserScrolling) return;
        section.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function handleEndInteraction() {
        if (!isUserScrolling) {
            let closestSection = findClosestSection();
            smoothScrollToSection(closestSection);
        }
    }

    function startUserScroll() {
        isUserScrolling = true;
        clearTimeout(timeout);
    }

    function stopUserScroll() {
        isUserScrolling = false;
        clearTimeout(timeout);
        timeout = setTimeout(handleEndInteraction, 300); // 停止滑动 0.3 秒后再触发
    }

    document.addEventListener("scroll", () => {
        startUserScroll();
        requestAnimationFrame(checkScroll);
    });

    document.addEventListener("touchmove", startUserScroll);
    document.addEventListener("mousemove", startUserScroll);

    document.addEventListener("touchend", stopUserScroll);
    document.addEventListener("mouseup", stopUserScroll);

    checkScroll(); // 初始检查，防止刷新后动画丢失
});