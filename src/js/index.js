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