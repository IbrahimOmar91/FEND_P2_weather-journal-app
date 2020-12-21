/* Global Variables */
/*
Key=ee152a474b03b4cfd7b2a160770406ca
*/

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=ee152a474b03b4cfd7b2a160770406ca&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

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
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    })

    try {
        const newData = await res.json();
        return newData;
    }
    catch(error)
    {
        console.log(error);
    }
};

// Update data in the UI
const updateData = async () => {
    const projectData = await getData('/weather');
    document.getElementById('date').innerHTML = projectData.date;
    document.getElementById('temp').innerHTML = `${projectData.temp} &#8457`;
    document.getElementById('content').innerHTML = projectData.content;
};

const generateData = async () => {
    const content = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;

    const response = await fetch(`${baseURL}${zip}${apiKey}`);
    try {
        const res = await response.json();
        const data = {};
        data.content = content;
        data.date = newDate;
        data.temp = res.main.temp;
        await postData('/weather', data);
        updateData();
    } catch (error) {
        console.error("error", error);
    }
};

document.getElementById('generate').addEventListener('click', generateData);