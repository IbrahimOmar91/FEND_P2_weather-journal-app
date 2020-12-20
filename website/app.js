/* Global Variables */
/*
Key=ee152a474b03b4cfd7b2a160770406ca
*/

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=ee152a474b03b4cfd7b2a160770406ca';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Getting data from a url
const getData = async (url = '') => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// Function for data posting
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        });
};

// Update data in the UI
const updateData = async () => {
    const projectData = await getData('/data');
    document.getElementById('date').innerHTML = `${projectData.date}`;
    document.getElementById('temp').innerHTML = `${projectData.temperature} &#8457`;
    document.getElementById('content').innerHTML = projectData.feelings;
};

const generateData = async () => {
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    const response = await fetch(`${url}${zip}${apiKey}`);
    try {
        const data = await response.json();
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateData();
    } catch (error) {
        console.error("error", error);
    }
};

document.getElementById('generate').addEventListener('click', generateData);