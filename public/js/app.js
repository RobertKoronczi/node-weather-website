const search = (location, callback) => {
    fetch(`/weather?adress=${location}`).then( response => {
        response.json().then( data => {
            if (data.error) return callback(data.error, undefined);
            callback(undefined, data);
        });
    });
}

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = searchInput.value;

    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    search(location, (error, data) => {
        if (error) {
              return messageOne.textContent = error;
        }
        messageOne.textContent = `Location: ${data.location.toString()}`;
        messageTwo.textContent = `${data.forecast.toString()}`;
    });
})