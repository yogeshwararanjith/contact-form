const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRadioButtons(){
    const queryTypeLabel = Array.from(document.querySelectorAll('label')).find(label=>label.textContent.includes('Query Type'));
    const radioError = queryTypeLabel.querySelector(".error");
    const isChecked = document.querySelector("input[name='queryOption']:checked");

    if(!isChecked){
        radioError.style.display = 'block';
        return false;
    }else{
        radioError.style.display = 'none';
        return true;
    }  
}

function validateInputs(){
    let isValid = true;
    const inputs = document.querySelectorAll('#contactForm input:not([type="radio"]), #contactForm textarea');
    inputs.forEach((input)=>{
        let error;
        if(input.type === 'checkbox'){
            error = input.closest('.consent-check').querySelector('.error');
            if(!input.checked){
                error.style.display = 'block';
                isValid = false;
            }else{
                error.style.display = 'none';
            }
        }else if(input.type === 'email'){
            error = input.previousElementSibling.querySelector('.error');
            if(!input.value.trim()){
                error.style.display = 'block';
                isValid = false;
            }else if(!emailRegex.test(input.value.trim())){
                error.style.display = 'block';
                error.innerHTML = "Enter valid email address"
                isValid = false;
            }else{
                error.style.display = 'none';
            }
        }
        else{
          error = input.previousElementSibling.querySelector('.error');
        if(input.value.trim() === ''){
            error.style.display = 'block';
            isValid = false;
        }else{
            error.style.display = 'none';
        }
    }
    });
    return isValid;
}

document.addEventListener('DOMContentLoaded',function(){
    const success = document.querySelector('.success-box');
    const queryFeilds = document.querySelectorAll('.query-feild');
    queryFeilds.forEach((feild)=>{
        const radios = feild.querySelectorAll('input[type="radio"][name="queryOption"]');
        radios.forEach(radio=>{
            radio.addEventListener('change',function(){
                 const checked = document.querySelector('input[name="queryOption"]:checked');

                queryFeilds.forEach(qf=>{
                    qf.classList.remove("selected");
                });

                if(checked){
                    feild.classList.add("selected");
                }
                });
        })
    });

    const radioInputs = document.querySelectorAll("input[type='radio'][name='queryOption']");
    radioInputs.forEach((input)=>{
        input.addEventListener('change',validateRadioButtons)
    });

    document.querySelector('#contactForm').addEventListener('submit',function(event){
        event.preventDefault();

        if(validateInputs() && validateRadioButtons()){
            success.style.display = 'block';
        }else{
            validateRadioButtons();
            validateInputs();
            success.style.display = 'none';
        }

    });

});

