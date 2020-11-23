const btn = document.getElementById('hamburger');

btn.addEventListener('click', ()=>{
   const modal = document.getElementById('menu');
   modal.classList.add('modal_active');
});



const close = document.getElementById('modal__close');

close.addEventListener('click', ()=>{
   const modal = document.getElementById('menu');
   modal.classList.remove('modal_active');
});

/////////////////////////////////////////////////

const phone = document.querySelector('#phone');

phone.addEventListener('keydown', function(event) {
   let isDigit = false;
   let isDash = false;
   let isControl = false;

   if (event.key >= 0 || event.key <= 9) {
      isDigit = true;
   }

   if (event.key == '-') {
      isDash = true;
   }

   if (event.key == 'ArrowLeft'  || event.key == 'ArrowRight'  || event.key == 'Backspace') {
      isControl = true;
   }

   if (!isDigit && !isDash && !isControl) {
      event.preventDefault();
   }
});



///////////////////////
function validateForm(form) {
   let valid = true;

   if (!validateField(form.elements.name)) {
      valid = false;
   }

   if (!validateField(form.elements.phone)) {
      valid = false;
   }

   if (!validateField(form.elements.comment)) {
      valid = false;
   }

   return valid;
}

function validateField(field) {
   field.nextElementSibling.textContent = field.validationMessage;
   return field.checkValidity();
}


//////////////////////////////////////////////////////////

// const form = document.querySelector('#form');
// const sendButton = document.querySelector('#sendButton');

// sendButton.addEventListener('click', function(event) {
//    event.preventDefault();


//    if (validateForm(form)) {
//       const data = {
//          name: form.elements.name.value,
//          phone: form.elements.phone.value,
//          comment: form.elements.comment.value,
//          to: "alkhimovmv@yandex.ru"
//       };
//       console.log(data);
//       const xhr = new XMLHttpRequest();
//       xhr.responseType = 'json';
//       xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
//       xhr.setRequestHeader('content-type', 'application/json');
//       xhr.send(JSON.stringify(data));
//       xhr.addEventListener('load', () => {
//          if(xhr.response.status) {
//             console.log('Все ок!');
//          }
//       });
//    }
// });

