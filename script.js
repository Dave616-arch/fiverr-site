document.addEventListener("DOMContentLoaded", () => {
    const sections = [...document.querySelectorAll(".fade-section")];
    const items = [...document.querySelectorAll(".portfolio-item")];
    let isTouching = false;
    let lastTouchTime = 0;

    // 初始化页面滚动到顶部
    window.scrollTo(0, 0);

    // 延迟执行 checkScroll，确保页面完全渲染
    setTimeout(checkScroll, 300);

    function checkScroll() {
        let centerItem = null;
        let minDistance = Infinity;

        // 检测距离视口中心最近的 .portfolio-item
        items.forEach((item) => {
            let rect = item.getBoundingClientRect();
            let centerDistance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

            if (centerDistance < minDistance) {
                minDistance = centerDistance;
                centerItem = item;
            }
        });

        // 移除所有 .portfolio-item 的 active-item 类
        items.forEach((item) => item.classList.remove("active-item"));

        // 为最近的 .portfolio-item 添加 active-item 类
        if (centerItem) {
            centerItem.classList.add("active-item");
        }

        let centerSection = null;
        let minSectionDistance = Infinity;

        // 检测距离视口中心最近的 .fade-section
        sections.forEach((section) => {
            let rect = section.getBoundingClientRect();
            let centerDistance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

            if (centerDistance < minSectionDistance) {
                minSectionDistance = centerDistance;
                centerSection = section;
            }
        });

        // 移除所有 .fade-section 的 active-section 类
        sections.forEach((section) => section.classList.remove("active-section"));

        // 为最近的 .fade-section 添加 active-section 类
        if (centerSection) {
            centerSection.classList.add("active-section");
        }

        // 自动滚动到最近的元素（仅在非触摸状态下）
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

    // 监听滚动事件
    document.addEventListener("scroll", () => {
        requestAnimationFrame(checkScroll);
    });

    // 触摸事件处理
    document.addEventListener("touchstart", () => {
        isTouching = true;
    });

    document.addEventListener("touchmove", () => {
        lastTouchTime = Date.now();
    });

    document.addEventListener("touchend", () => {
        isTouching = false;
        setTimeout(() => {
            if (Date.now() - lastTouchTime > 100) checkScroll();
        }, 200);
    });
});