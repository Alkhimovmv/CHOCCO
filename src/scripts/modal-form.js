(function() {       
    const validateFields = (form, fieldsArray) => {
        fieldsArray.forEach((field) => {
            field.removeClass("input-error");
            if (field.val().trim() == "") {
                field.addClass("input-error");
            }
        });

        const errorFields = form.find(".input-error");

        return errorFields.length == 0;
    }

    $(".form").submit(e => {
        e.preventDefault();

        const form = $(e.currentTarget);
        const name = form.find("[name='name']");  
        const phone = form.find("[name='phone']"); 
        const comment = form.find("[name='comment']"); 
        const to = form.find("[name='to']"); 

        const isValid = validateFields(form, [name, phone, comment, to])

        const modalForm = $("#modal-form");
        const content = modalForm.find(".modal-form__content");

        modalForm.removeClass("error-modal");

        if(isValid) {
            const request = $.ajax({
                url: "https://webdev-api.loftschool.com/sendmail",
                method: "post",
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    comment: comment.val(),
                    to: to.val(),
                },
            });
        
            request.done(data => {
                content.text(data.message);
            });
        
            request.fail(data => {
                const message = data.responseJSON.message;
                content.text(message);
                modalForm.addClass("error-modal");
            });
        
            request.always(() => {
                $.fancybox.open({
                    src: "#modal-form",
                    type: "inline",
                });
            });
        }

    });


    $(".app-close-modal").click(e => {
        e.preventDefault();

        $.fancybox.close();
        form.reset();
    })
})() 
 