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




const form = document.querySelector('#form');
const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', function(event) {
   event.preventDefault();

   console.log(form.elements.name.value);
   console.log(form.elements.phone.value);
   console.log(form.elements.street.value);
   console.log(form.elements.building.value);
   console.log(form.elements.block.value);
   console.log(form.elements.appartment.value);
   console.log(form.elements.floor.value);
   console.log(form.elements.comment.value);
   
   if (form.elements['shortChanges'].checked == true) {
      console.log('потребуется сдача');
   };

   if (form.elements['card'].checked == true) {
      console.log('оплата по карте');
   };

   if (form.elements.call.checked == true) {
      console.log('не перезванивать');
   } else {
      console.log('перезванивать');
   };
   
})