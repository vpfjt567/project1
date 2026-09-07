
async function fetchBooks(query) {
    const REST_API_KEY = "fabf0d15ab33e4263ed790e6c0483958";
    const params = new URLSearchParams({
        target: 'title',
        query,
        size: 20
    })

    const url = `https://dapi.kakao.com/v3/search/book?${params}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });

    console.log(response);

    if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드:
                ${response.status}`);
    }

    return await response.json();
}

async function slideData() {
    const queries = [
        { query: '공단기', sectionId: "slider" },

    ];

    for (const { query, sectionId } of queries) {
        const data = await fetchBooks(query);


        const section = document.querySelector(`#${sectionId}`);
        const boxElements = section.querySelectorAll(".swiper-slide");
        console.log(section, boxElements);

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            console.log(box, i);
            if (!doc) return;


            box.innerHTML = `<img src="${doc.thumbnail}">
                        <div class="bookinfo">
                        
                            <h5>${doc.title}<br></h5>
                            
                            <h7>${doc.authors}<br></h7>
                            
                            <h5>${doc.sale_price}원<br></h5>
                            <p>${doc.contents.substring(0, 60)}</p>
                        </div>
                        `
        });


        var swiper = new Swiper('.mySwiper', {
            navigation: {
                nextEl: '#mainpage_page .swiper-button-next',
                prevEl: '#mainpage_page .swiper-button-prev',
            },
            loop: true,
            autoplay: {
                delay: 3000, // 3000ms = 3초마다 다음 슬라이드로 이동
                disableOnInteraction: false // 사용자가 버튼 클릭/스 와이프 후에도 자동 재생 유지
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (i, className) {
                    // return '<img class="' + className + ' alt="bookimg" src="' + data.documents[i].thumbnail + '">';
                    return `<img class="${className}" alt="bookimg" src="${data.documents[i].thumbnail}">`;
                },
            },
            clickable: true,
            mousewheel: true,
            keyboard: true,
        });
    }


}

slideData();


async function bookData() {
    const queries = [
        { query: '공무원', sectionId: "best" },
        { query: '동물', sectionId: "newbook" }

    ];

    for (const { query, sectionId } of queries) {
        const data = await fetchBooks(query);


        const section = document.querySelector(`#${sectionId}`);
        const boxElements = section.querySelectorAll(".book");
        console.log(section, boxElements);

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            console.log(box, i);
            if (!doc) return;


            box.innerHTML = `<img src="${doc.thumbnail}">
                        <div class="bookinfo">
                            <div>${i + 1}</div>
                            <h3>${doc.title}</h3>
                            <h6>${doc.authors}</h6>
                            <h3>${doc.sale_price}원</h3>
                        
                        </div>
                        `
        });
    }

}


bookData();

async function newbookData() {
    const queries = [

        { query: '동물', sectionId: "newbook" }

    ];

    for (const { query, sectionId } of queries) {
        const data = await fetchBooks(query);


        const section = document.querySelector(`#${sectionId}`);
        const boxElements = section.querySelectorAll(".newbook");
        console.log(section, boxElements);

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            console.log(box, i);
            if (!doc) return;


            box.innerHTML = `<img src="${doc.thumbnail}">
                        <div class="bookinfo">
                        
                            <h4>${doc.title}</h4>
                            <p>${doc.authors}</p>
                            <h4>${doc.sale_price}원</h4>
                        
                        </div>
                        `
        });
    }

}


newbookData();


async function subnewData() {
    const queries = [
        { query: '수학', sectionId: "subnewbook" },
        

    ];

    for (const { query, sectionId } of queries) {
        const data = await fetchBooks(query);


        const section = document.querySelector(`#${sectionId}`);
        const boxElements = section.querySelectorAll(".subnew_book");
        console.log(section, boxElements);

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            console.log(box, i);
            if (!doc) return;


            box.innerHTML = `<div class="subnewbookimg"><img src="${doc.thumbnail}"></div>
                        <div class="subnewbookinfo">
                            <div>${i + 1}</div>
                            <h3>${doc.title}</h3>
                            <h6>${doc.authors}</h6>
                            <h3>${doc.sale_price}원</h3>
                        
                        </div>
                        `
        });
    }

}

subnewData()

//tab menu
const tabItems = document.querySelectorAll('#booktab li')
const tabs = document.querySelectorAll("#best > div")

tabItems.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
        // tablistbold
        tabItems.forEach((tab)=> {
            tab.classList.remove('active');
        });        
        e.target.classList.add('active');

        tabs.forEach((tab, j) => {
            tab.style.display = (i === j) ? 'flex' : 'none';
        })
    })
})



