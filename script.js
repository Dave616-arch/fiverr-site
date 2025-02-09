let timeout = null; // 用于检测手指是否真的离开
let lastInteractionTime = 0; // 记录最后一次交互时间

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
        if (!section) return;
        section.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function handleEndInteraction() {
        let now = Date.now();
        if (now - lastInteractionTime >= 400) { // 由 200 改为 400
            let closestSection = findClosestSection();
            smoothScrollToSection(closestSection);
        }
    }

    document.addEventListener("scroll", () => {
        lastInteractionTime = Date.now();
        clearTimeout(timeout);
        timeout = setTimeout(handleEndInteraction, 400); // 由 200 改为 400
        requestAnimationFrame(checkScroll);
    });

    document.addEventListener("touchend", () => {
        lastInteractionTime = Date.now();
        clearTimeout(timeout);
        timeout = setTimeout(handleEndInteraction, 400); // 由 200 改为 400
    });

    document.addEventListener("mouseup", () => {
        lastInteractionTime = Date.now();
        clearTimeout(timeout);
        timeout = setTimeout(handleEndInteraction, 400); // 由 200 改为 400
    });

    checkScroll(); // 初始检查，防止刷新后动画丢失
});