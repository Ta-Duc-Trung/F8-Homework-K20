const tabsWrapperEl = document.getElementById("tabs");
const tabsBarEl = document.getElementById("tabsBar");
const tabButtons = tabsBarEl.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
let activeTabIndex = 0;
let tabKeydownListener = null;
function activateTab(index) {
    let total = tabButtons.length;
    activeTabIndex = (index + total) % total;

    for (let i = 0; i < tabButtons.length; i++) {
        if (i === activeTabIndex) {
            tabButtons[i].classList.add("is-active");
        } else {
            tabButtons[i].classList.remove("is-active");
        }
    }

    for (let i = 0; i < tabPanels.length; i++) {
        if (i === activeTabIndex) {
            tabPanels[i].classList.add("is-active");
        } else {
            tabPanels[i].classList.remove("is-active");
        }
    }

    tabButtons[activeTabIndex].focus();
}

tabsBarEl.addEventListener("click", function (e) {
    const clickedBtn = e.target.closest(".tab-btn");
    if (!clickedBtn) return;

    for (let i = 0; i < tabButtons.length; i++) {
        if (tabButtons[i] === clickedBtn) {
            activateTab(i);
            break;
        }
    }
});

function attachTabKeydown() {
    if (tabKeydownListener !== null) return;

    tabKeydownListener = function (e) {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            activateTab(activeTabIndex - 1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            activateTab(activeTabIndex + 1);
        }
    };
    document.addEventListener("keydown", tabKeydownListener);
}

function detachTabKeydown() {
    if (tabKeydownListener === null) return;
    document.removeEventListener("keydown", tabKeydownListener);
    tabKeydownListener = null;
}

tabsWrapperEl.addEventListener("focusin", function () {
    attachTabKeydown();
});

tabsWrapperEl.addEventListener("focusout", function (e) {
    if (!tabsWrapperEl.contains(e.relatedTarget)) {
        detachTabKeydown();
    }
});
