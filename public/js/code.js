

const formElement = document.querySelector('form');
const inputElement = document.querySelector('input');

const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    address = inputElement.value;

    if (!address) {
        console.log("Please enter address");
    } else {
        fetch('http://localhost:3070/weather?address=' + address).then( (response) => {

            response.json().then((data) => {

                    if (data.error) {
                        console.log("Error :", data.error);
                        msg1.textContent = data.error;
                        msg2.textContent = '';
                    } else {
                        console.log(data);
                        msg1.textContent = data.location;
                        msg2.textContent = data.Forcast;

                    }
            });
        });
    }
});


