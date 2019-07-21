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
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const message4 = document.querySelector('#message-4');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = searchInput.value;

    message1.textContent = 'loading...';
    message2.textContent = '';
    message3.textContent = '';
    message4.textContent = '';

    search(location, (error, data) => {
        if (error) {
              return message1.textContent = error;
        }
        message1.textContent = `Location: ${data.location.toString()}`;
        message2.textContent = `${data.forecast.m1.toString()}`;
        message3.textContent = `${data.forecast.m2.toString()}`;
        message4.textContent = `${data.forecast.m3.toString()}`;
    });
})