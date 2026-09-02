
async function fetchBooks(query) {
    const REST_API_KEY = "fabf0d15ab33e4263ed790e6c0483958";
    const params = new URLSearchParams({
        target: 'title',
        query,
        size:20
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
        { query: '동물', sectionId: "new" }    
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
                            <h3>${doc.title}</h3>
                            <h6>${doc.authors}</h6>
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
        {query : '공무원', sectionId :"best"},
        
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
                            <div>${i+1}</div>
                            <h3>${doc.title}</h3>
                            <h6>${doc.authors}</h6>
                            <p>${doc.contents.substring(0, 60)}</p>
                        
                        </div>
                        `
        });
    }

}


bookData();
