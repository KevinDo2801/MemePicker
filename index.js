import { catsData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');
const memeModalInner = document.getElementById('meme-modal-inner');

renderEmotionCatData(catsData);

function renderEmotionCatData(catsData) {
    let emotion = '';

    const uniqueEmotionTags = [];

    for (let cat of catsData) {
        for (let emotionTag of cat.emotionTags) {
            if (!uniqueEmotionTags.includes(emotionTag)) {
                uniqueEmotionTags.push(emotionTag);
                emotion += `
                    <div class="radio">
                        <label for="${emotionTag}">${emotionTag}</label>
                        <input
                        type="radio"
                        id="${emotionTag}"
                        value="${emotionTag}"
                        name="emotions">
                    </div>
                `;
            }
        }
    }

    emotionRadios.innerHTML = emotion;
}

emotionRadios.addEventListener('change', function (event) {
    const checkedRadios = document.querySelectorAll('input[name="emotions"]:checked');

    document.querySelectorAll('.radio').forEach(function (container) {
        container.classList.remove('highlight');
    });

    checkedRadios.forEach(function (checkedRadio) {
        const container = checkedRadio.closest('.radio');
        container.classList.add('highlight');
    });
});


getImageBtn.addEventListener('click', function () {
    const checkedRadios = document.querySelectorAll('input[name="emotions"]:checked');

    if (checkedRadios.length === 0) {
        alert('Please choose an emotion');
        return; // Stop further execution
    }

    const catSelected = matchingCat(checkedRadios);

    memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catSelected.image}"
        alt="${catSelected.alt}"
        >
        `
    memeModal.style.display = 'flex';
});


memeModalCloseBtn.addEventListener('click', function () {
    memeModal.style.display = 'none';
});

function matchingCat(checkedRadios) {
    const emotionSelected = checkedRadios[0].value;
    const isGif = gifsOnlyOption.checked;

    memeModal.style.display = 'block';
    const catSelected = catsData.filter(function (cat) {
        if (isGif) {
            return cat.emotionTags.includes(emotionSelected) && cat.isGif;
        } else {
            return cat.emotionTags.includes(emotionSelected);
        }
    })

    if (catSelected.length === 0) {
        return catSelected[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catSelected.length)
        return catSelected[randomNumber]
    }
}