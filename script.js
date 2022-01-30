const regForm = document.querySelector('#regForm');
const email = document.querySelector('#email');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const output = document.querySelector('#userArray');
const idNumber = document.querySelector('#id-number');
const SaveBtn = document.querySelector('#SaveBtn');
const RegBtn = document.querySelector('#RegBtn');


let user = []



const validateText = (id) => {
    let input = document.querySelector(id);

    if(input.value === '' || input.value.length < 2) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        input.focus();
        return false;
    }
    else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}

const validateEmail = (emailInput) => {
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    let emailError = document.querySelector('#emailError');
    emailError.innerText = 'You have to enter a correct email.'

    let mail = true;
    if (user.find(u => u.email === emailInput.value)) {
      emailError.innerText = 'That email already exists'
      emailInput.classList.remove ('is-valid');
      emailInput.classList.add ('is-invalid');
      email.focus();
      mail = false;
    }

    if (mail) {
      if(regEx.test(emailInput.value)) {
          emailInput.classList.add('is-valid');
          emailInput.classList.remove('is-invalid');
          return true;
      }
      else {
          emailInput.classList.remove('is-valid');
          emailInput.classList.add('is-invalid');
          emailInput.focus();
          return false;
      }
    }
    else {
      return false;
    }
}



const listUsers = () => {
  output.innerHTML = '';
  email.classList.remove ('is-valid');
  firstNameInput.classList.remove('is-valid');
  lastNameInput.classList.remove('is-valid');
  
  user.forEach(newUser => {
    output.innerHTML += `
    <div id="${newUser.id}" class="d-flex justify-content-between align-items-center border bg-white p-2 mb-2">
    <p class="m-0 h4">${newUser.firstName}</p>
    <p class="m-0 h4">${newUser.lastName}</p>
    <a href class="m-0">${newUser.email}</a>
    <div class="d-flex align-items-center" id="${newUser.id}">
    <button type="button" class="btn btn-secondary btn-sm me-2" id="editButton">Edit</button>
    <button type="button" class="btn btn-danger btn-sm">X</button>
    </div>
  </div>
    `
  })
  console.log(user)

}





regForm.addEventListener('submit', e => {
    e.preventDefault();

    const errors = [];

    if(e.submitter.id === 'RegBtn'){
      for(let i = 0; i < e.currentTarget.length; i++ ) {
          if(e.currentTarget[i].type === "text") {
            errors[i] = validateText('#' + e.currentTarget[i].id);
          }
          else if(e.currentTarget[i].type === "email") {
            errors[i] = validateEmail(email);
          }
        }
    
        console.log(errors)
    
        if(errors.includes(false)) {
          console.log('Nope, försök igen.')
        }
        else {
          console.log('Success!')

          const newUser = {
          id: Date.now().toString(),
          firstName : firstName.value,
          lastName : lastName.value,
          email : email.value 
          }
          
          user.push(newUser);
          listUsers();

          SaveBtn.classList.add('d-none');
          RegBtn.classList.remove('d-none');
          
          for(let i = 0; i < e.currentTarget.length; i++ ) {
            e.currentTarget[i].value = ''
          }
        }
      }


     else if(e.submitter.id === 'SaveBtn'){
      let changeUser = user.find(u => u.id === idNumber.innerText);
      let mail2 = user.find(u => u.id === idNumber.innerText).email;
      let index = user.indexOf(changeUser);

      for(let i = 0; i < e.currentTarget.length; i++ ) {
        if(e.currentTarget[i].type === "text") {
          errors[i] = validateText('#' + e.currentTarget[i].id);
        }
        else if(e.currentTarget[i].type === "email") {
          if(mail2 !== email.value){
          errors[i] = validateEmail(email);
          }
        }
      }
     if(errors.includes(false)) {
      console.log('Nope, försök igen.')
    }
    user[index] = {
      id: idNumber.innerText,
      firstName : firstNameInput.value,
      lastName : lastNameInput.value,
      email : email.value 
      }

    listUsers();
    
    for(let i = 0; i < e.currentTarget.length; i++ ) {
      e.currentTarget[i].value = ''
    }
    
    SaveBtn.classList.add('d-none');
    RegBtn.classList.remove('d-none');
   
  }
})




output.addEventListener('click', e => {
  
  let changeUser = user.find(u => u.id === e.target.parentNode.id);

  console.log(changeUser);

  if (e.target.id === 'editButton') {

    firstNameInput.value = changeUser.firstName;
    lastNameInput.value = changeUser.lastName;
    email.value = changeUser.email;
    idNumber.innerText = changeUser.id;

    RegBtn.classList.add('d-none');
    SaveBtn.classList.remove('d-none');

    console.log(user)
  }

  // if(e.target.type === 'button') 
  else {
    user = user.filter(newUser => newUser.id !== e.target.parentNode.id);
    listUsers();
  }


})


