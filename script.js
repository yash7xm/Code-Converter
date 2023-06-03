const givenCode = document.getElementById('message');
const dropDown = document.getElementById('options');
const button = document.getElementById('convert-btn');
const res = document.getElementById('result');
let langToBeConverted = dropDown.value;
let converted = false;
let conversionAllowed = true;

var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&*()-=+[]{}|;:',.<>/?~`\"\\";


dropDown.addEventListener('change', () => {
     langToBeConverted = dropDown.value;
})
res.readOnly = true;
button.addEventListener('click', () => {
  
    if(!givenCode.value){
        res.value = 'No Code Detected'
        return;
    }
    showBlurText();
    if(conversionAllowed){
        fetchData();
        conversionAllowed = false;
        setTimeout(() => {
            conversionAllowed = true;
        },60000)
    }else {
        givenCode.value = 'Please wait for a minute for further request';
        console.log('wait a minute buddy');
        converted = true;
        showBlurText();
    }
})

let intervalId = null;

function showBlurText() {
  if (converted) {
    res.textContent = '';
    converted = false;
    res.style.filter = 'blur(0px)';
    clearInterval(intervalId);
    return;
  }

  intervalId = setInterval(() => {
    res.textContent = givenCode.value.split('')
      .map(letter => letters[Math.floor(Math.random() * 94)])
      .join("");
    res.style.filter = 'blur(2px)';
  }, 100);
}


function fetchData(){
    fetch('https://code-converter-us52.onrender.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lang: langToBeConverted,
            message: givenCode.value
        })
    })
    .then(res => res.json())
    .then(data => {
        converted = true;
        showBlurText();
        res.textContent = `${data.completion.content}`
    })
    .catch(error => {
        converted = true;
        showBlurText();
        res.textContent = `Some error has Occured on the server side please try again after sometime`
    })
}
