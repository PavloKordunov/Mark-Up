const profileHideButtonEl = document.querySelector('.profile-text-button')
const profileTextEl = document.querySelector('.profile-text')
const experienceHideButtonEl = document.querySelector('.experience-text-button')
const experienceListEl = document.querySelector('.experience-list');

profileHideButtonEl.addEventListener('click', () => {
    profileTextEl.classList.toggle('hide');
    if(profileTextEl.classList.contains('hide')){
        profileHideButtonEl.textContent = 'show'
    } else{
        profileHideButtonEl.textContent = 'hide'
    }
})

experienceHideButtonEl.addEventListener('click', () => {
    experienceListEl.classList.toggle('hide');
    if (experienceListEl.classList.contains('hide')) {
        experienceHideButtonEl.textContent = 'show';
    } else {
        experienceHideButtonEl.textContent = 'hide';
    }
});


const xmlhttp = new XMLHttpRequest();
const url = 'http://127.0.0.1:8080/data/data.json';

xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            renderProfileText(data);
        } else {
            console.error('Помилка під час завантаження даних (XMLHttpRequest)');
        }
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function renderProfileText(data) {
    const textEl = document.querySelector('.profile-text');
    if (textEl) {
        textEl.textContent = data.profileText;
    } else {
        console.error('Елемент з класом "profile-text" не знайдено.');
    }
}

async function getData() {
    try {
        const response = await fetch('http://127.0.0.1:8080/data/data.json');
        if (!response.ok) throw new Error('Помилка при завантаженні даних (fetch)');
        const data = await response.json();
        renderContacts(data.contacts)

    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
    }
}

function renderContacts(contacts) {
    const contactContainer = document.querySelector('.contacts-list');
    if (contactContainer) {
        contacts.forEach(item => {
            const div = document.createElement('div');
            const contactType = document.createElement('p');
            const contactInfo = document.createElement('p');
            div.classList.add('col');
            div.classList.add('text-center');

            contactType.textContent = item.type;
            contactInfo.textContent = item.info;

            contactType.classList.add('contact-type');
            contactInfo.classList.add('contact-info');

            div.appendChild(contactType);
            div.appendChild(contactInfo);
            contactContainer.appendChild(div);
        });
    } else {
        console.error('Елемент з класом "contacts-list" не знайдено.');
    }
}

async function getDataEducation() {
    try {
        const response = await fetch('http://127.0.0.1:8080/data/data.json');
        if (!response.ok) throw new Error('Помилка при завантаженні даних (fetch)');
        const data = await response.json();
        renderEducation(data.education)

    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
    }
}


function renderEducation(education) {
    const educationContainer = document.querySelector('.education-title');
    if (educationContainer) {
        education.forEach(item => {
            const div = document.createElement('div');
            const educationDate = document.createElement('p');
            const educationDegree = document.createElement('p');
            const educationUniversity = document.createElement('p');

            educationDate.textContent = item.date;
            educationDegree.textContent = item.degree;
            educationUniversity.textContent = item.university;

            educationDate.classList.add('education-list-text-color');
            educationDegree.classList.add('education-list-text-bold');
            educationUniversity.classList.add('education-list-text');

            div.appendChild(educationDate);
            div.appendChild(educationDegree);
            div.appendChild(educationUniversity);
            educationContainer.appendChild(div);
        });
    } else {
        console.error('Елемент з класом "contacts-list" не знайдено.');
    }
}

getData();
getDataEducation();
