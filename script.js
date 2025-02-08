document.addEventListener("DOMContentLoaded", () => {
    const sections = [...document.querySelectorAll(".fade-section")];
    const items = [...document.querySelectorAll(".portfolio-item")];
    let isTouching = false;
    let lastTouchTime = 0;

    function checkScroll() {
        let centerItem = null;
        let minDistance = Infinity;

        // **1️⃣ 让 Portfolio 小板块单独检测自己的中心位置**
        items.forEach((item) => {
            let rect = item.getBoundingClientRect();
            let centerDistance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

            if (centerDistance < minDistance) {
                minDistance = centerDistance;
                centerItem = item;
            }
        });

        // **2️⃣ 让所有小板块都有默认缩小**
        items.forEach((item) => item.classList.remove("active-item"));

        // **3️⃣ 只放大最近的 Portfolio 板块**
        if (centerItem) centerItem.classList.add("active-item");

        // **4️⃣ 让大板块 fade-section 也能检测自己**
        let centerSection = null;
        let minSectionDistance = Infinity;

        sections.forEach((section) => {
            let rect = section.getBoundingClientRect();
            let centerDistance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

            if (centerDistance < minSectionDistance) {
                minSectionDistance = centerDistance;
                centerSection = section;
            }
        });

        sections.forEach((section) => section.classList.remove("active-section"));
        if (centerSection) centerSection.classList.add("active-section");

        if (!isTouching) {
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                let targetSection = centerItem || centerSection;
                if (targetSection) {
                    window.scrollTo({
                        top: window.scrollY + targetSection.getBoundingClientRect().top - (window.innerHeight / 2) + (targetSection.offsetHeight / 2),
                        behavior: "smooth"
                    });
                }
            }, 200);
        }
    }

    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    document.addEventListener("touchstart", () => { isTouching = true; });
    document.addEventListener("touchmove", () => { lastTouchTime = Date.now(); });
    document.addEventListener("touchend", () => {
        isTouching = false;
        setTimeout(() => {
            if (Date.now() - lastTouchTime > 100) checkScroll();
        }, 200);
    });

    checkScroll();
});