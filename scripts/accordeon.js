//horizontal accordeon

const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__content');
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);
}

$('.team__title').click( e => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this); 
    }
});

//vertical accordeon

const verticalAcco = () => {
    const links = document.querySelectorAll(".menu-acco__trigger");
    const body = document.querySelector("body");
    const calculateWidth = () => {
        const windowWidth = window.innerWidth;
        const MAX_WIDTH = 524;
        
        const linksWidth = links[0].offsetWidth;

        const redWidth = windowWidth - (linksWidth * links.length);

        return redWidth > MAX_WIDTH ? MAX_WIDTH : redWidth;
    };

    function closeItem(activeElement) {
        const activeText = activeElement.querySelector(".menu-acco__content");
        activeText.style.width = "0px";
        activeElement.classList.remove("active");
    }

    links.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
            e.preventDefault();
            const link = e.target.closest(".menu-acco__trigger");
            const active = document.querySelector(".menu-acco__item.active");
            if (active) {
                closeItem(active);
            }

            if (!active || active.querySelector(".menu-acco__trigger") !== link) {
                const current = link.closest(".menu-acco__item");
                current.classList.add("active");
                const currentText = current.querySelector(".menu-acco__content");
                if (body.offsetWidth > 768) {
                    currentText.style.width = calculateWidth() + 'px';
                } else {
                    currentText.style.width = '100%';
                }
            }
        });
    });
}

verticalAcco();