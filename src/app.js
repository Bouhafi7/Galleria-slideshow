let galleryContainer = document.querySelector('.galleryContainer');
let thubs = document.querySelectorAll('.thubs');
let slide = document.querySelector('.slide');
let slideBtn = document.querySelector('.slide-btn');

let url = 'data.json';
let cards = [];
let dataNum = 0;

const showSlide = () => {
    galleryContainer.classList.toggle('hide');
    slide.classList.toggle('show');
    slideBtn.classList.toggle('return');
    slide.classList.contains('show') ? slideBtn.innerText = 'RETURN TO GALLERY' : slideBtn.innerText = 'START SLIDESHOW';
}

slideBtn.addEventListener('click', showSlide);

const getGallery = async () => {
    let response = await fetch(url);
    let data = await response.json();

    try {
        let gallery = '';
        for (let i = 0; i < data.length; i++){
            gallery = `<div class="gallery" data-num=${i}>
                            <img src="${data[i].images.thumbnail}" alt="">
                            <div class="infos">
                                <h2>${data[i].name}</h2>
                                <p class="artist">${data[i].artist.name}</p>
                            </div>
                        </div>`;
            cards.push(gallery);
        }
        thubs[0].innerHTML = cards.slice(0, 4).join('');
        thubs[1].innerHTML = cards.slice(4, 7).join('');
        thubs[2].innerHTML = cards.slice(7, 11).join('');
        thubs[3].innerHTML = cards.slice(12, 16).join('');

        let galleries = document.querySelectorAll('.gallery');
        let length = data.length -1;
        galleries.forEach(gallery => {
            gallery.addEventListener('click', () => {
                dataNum = gallery.dataset.num;
                getSlide(data, artPic, artName, artistPic, year, artistName, desc, source, dataNum, length);
            });
            let artPic = data[dataNum].images.hero.large;
            let artName = data[dataNum].name;
            let artistPic = data[dataNum].artist.image;
            let year = data[dataNum].year;
            let artistName = data[dataNum].artist.name;
            let desc = data[dataNum].description;
            let source = data[dataNum].source;
            getSlide(data, artPic, artName, artistPic, year, artistName, desc, source, dataNum, length);
        });
    } catch (e) {
        console.log(e)
    }
    let galleries = document.querySelectorAll('.gallery');
    galleries.forEach(gallery => {
        gallery.onclick = () => showSlide();
    });
}

getGallery();


const getSlide = (data, artPic, artName, artistPic, year, artistName, desc, source, dataNum, length) => {
    slideDetails(artPic, artName, artistPic, year, artistName, desc, source, dataNum, length);
    document.querySelector('.back').onclick = () => {
        dataNum--;
        browse(data, dataNum, length);
    };
    document.querySelector('.next').onclick = () => {
        dataNum++;
        browse(data, dataNum, length);
    };
    browse(data, dataNum, length);
}


let slideContainer = document.querySelector('.slide .container');
const slideDetails = (artPic, artName, artistPic, year, artistName, desc, source, dataNum, length) => {
    let slideContent = `<div class="details">
                            <div class="pic-name">
                                <img src="${artPic}" alt="" class="hero">
                                <div class="name-artist">
                                    <div class="name">${artName}</div>
                                    <div class="artist">${artistName}</div>
                                </div>
                                <img src="${artistPic}" alt="" class="artist-pic">
                                <div class="view-img"> <img src="./shared/icon-view-image.svg" alt=""> <p>VIEW IMAGE</p></div>
                            </div>
                            <div class="desc">
                                <div class="year">${year}</div>
                                <p>${desc}</p>
                                <a href="${source}" target='_blank' class="source">GO TO SOURCE</a>
                            </div>
                        </div>
                        <div class="browsing">
                            <div class='progress'></div>
                            <div class="name-artist">
                                <div class="name">${artName}</div>
                                <div class="artist">${artistName}</div>
                            </div>
                            <div class="browse">
                                <img src="./shared/icon-back-button.svg" alt="" class='back'>
                                <img src="./shared/icon-next-button.svg" alt="" class='next'>
                            </div>
                        </div>`;
    slideContainer.innerHTML = slideContent;

    document.querySelector('.progress').style.width = `${(dataNum / length) * 100}%`;
    let viewImg = document.querySelector('.view-img');
    viewImg.onclick = () => modalBox(viewImg.previousElementSibling.previousElementSibling.previousElementSibling.src);
}


const modalBox = (artPic) => {
    let modalBox = document.createElement('div');
    modalBox.className = 'modal-box';
    let modalContent = `<div class="close-modal">CLOSE</div>
                        <img src="${artPic}" alt="" class='modal-img'>`;

    modalBox.classList.add('show');
    modalBox.innerHTML = modalContent;
    document.body.appendChild(modalBox);

    modalBox.onclick = (e) => {
        e.target.classList.contains('modal-img') ? false : modalBox.classList.remove('show');
    };
};

const browse = (data, dataNum, length) => {
    dataNum == length ? document.querySelector('.next').style.pointerEvents = 'none' : document.querySelector('.next').style.pointerEvents = 'auto';
    dataNum == 0 ? document.querySelector('.back').style.pointerEvents = 'none' : document.querySelector('.back').style.pointerEvents = 'auto';

    document.querySelector('.progress').style.width = `${(dataNum / length) * 100}%`;

    document.querySelector('.hero').src = data[dataNum].images.hero.large;
    document.querySelector('.pic-name .name').innerText = data[dataNum].name;
    document.querySelector('.pic-name .artist').innerText = data[dataNum].artist.name;
    document.querySelector('.artist-pic').src = data[dataNum].artist.image;
    document.querySelector('.year').innerText = data[dataNum].year;
    document.querySelector('.desc > p').innerText = data[dataNum].description;
    document.querySelector('.source').href = data[dataNum].source;
    document.querySelector('.name-artist .name').innerText = data[dataNum].name;
    document.querySelector('.name-artist .artist').innerText = data[dataNum].artist.name;
}