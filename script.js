const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const formField = document.querySelector("form");

let target = "Lahore"
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=4950197a2adb4392982141813232505&q=${target}`
        const response = await fetch(url);
        const data = await response.json();
        const { current: { temp_c, condition: { text, icon } },
            location: { name, localtime }
        } = data;
        updateDom(temp_c, name, icon, text, localtime)
    } catch (error) {
        alert(error)
    }
    // console.log(data);
};
formField.addEventListener("submit", (e) => {
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
})

function updateDom(temperature, city, emoji, text, localtime) {

    const exactTime = localtime.split(" ")[1];
    const exactDate = localtime.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();

    dateField.innerText = ` ${exactTime}  -  ${getDayName(exactDay)} - ${exactDate}`
    temperatureField.innerText = temperature
    cityField.innerText = city



    emojiField.src = emoji
    weatherField.innerText = text
}
function getDayName(num) {
    switch (num) {
        case 0:
            return "Sunday"
            break;
        case 1:
            return "Monday"
            break

        case 2:
            return "Tuesday"
            break

        case 3:
            return "Wednesday"
            break

        case 4:
            return "Thursday"
            break

        case 5:
            return "Friday"
            break

        case 6:
            return "Saturday"
            break

        default:
            return "don't know"
            break;
    }
}



fetchData(target);
