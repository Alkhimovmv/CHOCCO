(function() {   
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

    // verticalAcco();

    const isMobile = window.matchMedia("(max-width: 480px)").matches;

    const calculateWidth = (item) => {
        let reqItemWidth = 0;

        const screenWidth = $(window).width();
        const container = item.closest(".menu-acco");
        const titlesBlocks = container.find(".menu-acco__trigger");
        const titlesWidth = titlesBlocks.width() * titlesBlocks.length;
        const maxWidth = 524;

        const textContainer = item.find(".menu-acco__container");

        const isTablets = window.matchMedia("(max-width: 768px)").matches;

        const isMobile = window.matchMedia("(max-width: 480px)").matches;

        if (isMobile) {
            reqItemWidth = screenWidth;
        } else if (isTablets) {
            reqItemWidth = screenWidth - titlesWidth;
        } else {
            reqItemWidth = maxWidth;
        }

        return {
            container: reqItemWidth,
            textContainer: reqItemWidth
        }
    };

    const openItemAcco = (item) => {
        const hiddenContent = item.find(".menu-acco__content");
        const reqWidth = calculateWidth(item);
        const textBlock = item.find(".menu-acco__container");

        item.addClass("active");
        hiddenContent.width(reqWidth.container);
        textBlock.width(reqWidth.textContainer);
    };

    const closeEveryItemInContainer = (container) => {
        const items = container.find(".menu-acco__item");
        const content = container.find(".menu-acco__content");

        items.removeClass("active");
        content.width(0);
    };

    const isMobileAcco = window.matchMedia("(max-width: 480px)").matches;

    if(isMobileAcco){
        $(".menu-acco--trigger .menu-acco__trigger").on("click", e => {
            e.preventDefault();
    
            const $this = $(e.currentTarget);
            const item = $this.closest(".menu-acco__item");
            const itemNdx = item.index();
    
            const itemToOpen = $(".menu-acco--content .menu-acco__item").eq(itemNdx);
    
            item.addClass("hidden");
            openItemAcco(itemToOpen);
        });

        $(".menu-acco--content .menu-acco__trigger").on("click", e => {
            e.preventDefault();
    
            $(".menu-acco--trigger .menu-acco__item").removeClass("hidden");
            closeEveryItemInContainer($(".menu-acco--content"));
        });
    } else {
        $(".menu-acco__trigger").on("click", e => {
            e.preventDefault();
    
            const $this = $(e.currentTarget);
            const item = $this.closest(".menu-acco__item");
            const itemOpened = item.hasClass("active");
            const container = $this.closest(".menu-acco");
    
            if(itemOpened) {
                closeEveryItemInContainer(container);
            } else {
                closeEveryItemInContainer(container);
                openItemAcco(item);
            }
        });
    }
 
})() 