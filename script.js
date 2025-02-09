let timeout = null; // 记录检测手指是否离开
let lastInteractionTime = 0; // 记录上次交互时间
let disableZoom = false; // 是否禁用双击放大

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const texts = document.querySelectorAll(".fade-text");

    function checkScroll() {
        let closestSection = findClosestSection();

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const screenCenter = window.innerHeight / 2;
            const distance = Math.abs(center - screenCenter);

            // 计算缩放比例（适配不同设备）
            if (distance < 100) {
                // 🌟 靠近屏幕中心的 section，放大 1.1（桌面）| 1.08（手机/平板）
                section.classList.add("section-center");
                section.classList.remove("section-near-center");
            } else if (distance < 250) {
                // 🔹 进入屏幕但不在中心，放大 1.04（桌面）| 1.03（手机/平板）
                section.classList.add("section-near-center");
                section.classList.remove("section-center");
            } else {
                // ❌ 其他部分恢复正常大小
                section.classList.remove("section-near-center", "section-center");
            }
        });

        texts.forEach(text => {
            const rect = text.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                text.classList.add("visible");
            } else {
                text.classList.remove("visible");
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

        // 让目标 section 放大
        sections.forEach(sec => sec.classList.remove("section-center"));
        section.classList.add("section-center");
    }

    function handleEndInteraction() {
        let now = Date.now();
        if (now - lastInteractionTime >= 700) {
            let closestSection = findClosestSection();
            smoothScrollToSection(closestSection);
            disableZoom = false; // 允许放大
        }
    }

    function resetInteractionTimer() {
        lastInteractionTime = Date.now();
        clearTimeout(timeout);
        timeout = setTimeout(handleEndInteraction, 700);
        disableZoom = true; // 禁用放大
    }

    // 监听滚动事件
    document.addEventListener("scroll", () => {
        resetInteractionTimer();
        requestAnimationFrame(checkScroll);
    });

    // 监听触摸事件（适配手机和平板）
    document.addEventListener("touchstart", resetInteractionTimer);
    document.addEventListener("touchmove", resetInteractionTimer);
    document.addEventListener("touchend", resetInteractionTimer);
    document.addEventListener("mousedown", resetInteractionTimer);
    document.addEventListener("mouseup", resetInteractionTimer);

    // 防止双击放大
    document.addEventListener("dblclick", (event) => {
        if (disableZoom) {
            event.preventDefault();
        }
    }, { passive: false });

    checkScroll(); // 页面加载时先执行一次
});