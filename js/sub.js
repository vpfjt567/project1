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


async function submainData() {
    const queries = [
        { query: '독해 알고리즘', sectionId: "submain" },
        

    ];

    for (const { query, sectionId } of queries) {
        const data = await fetchBooks(query);
        console.log(data)

        const section = document.querySelector(`#${sectionId}`);
        const boxElements = section.querySelector(".submainapi");
        console.log(section, boxElements);

        boxElements.innerHTML = `<ul>
                    <li id="submainimgpage">

                        <div id="mainimg"> <img src="${data.documents[0].thumbnail}" alt="책 이미지"></div>

                        <div id="mainbutton"><button>크게보기</button> <button>미리보기</button></div>


                    </li>
                    <li id="submaintextpage">
                        <ul>
                            <li class="pagetext">
                                <ul>
                                    <li><span>추천</span> <span>사은품</span></li>
                                    <li>
                                        <ul>
                                            <li><h3>${data.documents[0].title}</h3></li>
                                            <li>공단기 월간 베스트셀러 4위</li>
                                            <li>공단기 주간 베스트셀러 3위</li>
                                            <li>별점</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li id="mainprice" class="pagetext"><h3>${data.documents[0].sale_price}원</h3></li>
                            <li id="radiobox" class="pagetext">
                                <ul>
                                    <li>
                                        <ul>
                                            <li><input type="radio"></li>
                                            <li>분철신청</li>
                                            <li>이모지</li>
                                        </ul>
                                    </li>
                                    <li>1pcs(+1,500원)</li>
                                </ul>
                            </li>
                            <li id="bookdetail" class="pagetext">
                                <ul>
                                    <li>
                                        <ul>
                                            <li>배송비</li>
                                            <li><h6>3,000원</h6><br>
                                            <p>20,000원 이상 구매시 무료배송</p></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li><p>${data.documents[0].authors}</p></li>
                                            <li></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li><p>${data.documents[0].publisher}</p></li>
                                            <li></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul>
                                            <li><h6>${data.documents[0].datetime}</h6></li>
                                            <li></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li id="totalprice" class="pagetext">
                                <ul>
                                    <li>
                                        <h3>총 상품의 금액</h3>
                                    </li>
                                    <li><h3>${data.documents[0].sale_price}원</h3></li>
                                </ul>
                            </li>

                            <li id="btn" class="pagetext">
                                <ul>
                                    <li><span>장바구니</span></li>
                                    <li><span>바로 구매하기</span></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>`
    }

}
submainData()



 async function loadmemo() {
    const response = await fetch('memo.txt')
    const text = await response.text()
    document.getElementById('memo').innerHTML=text;

    
 }

 loadmemo()



 async function loadindex() {
    const response = await fetch('목차.txt')
    const text = await response.text()
    document.getElementById('index').innerHTML=text;

    
 }

 loadindex()

  async function loadindex2() {
    const response = await fetch('출판사서평.txt')
    const text = await response.text()
    document.getElementById('index2').innerHTML=text;

    
 }

 loadindex2()


 document.addEventListener('DOMContentLoaded', () => {
            const headers = document.querySelectorAll('.accordion-header');

            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const currentItem = header.parentElement;

                    // 이미 열려있는지 확인
                    const isActive = currentItem.classList.contains('active');

                    // 모든 항목 닫기 (아코디언 기능)
                    document.querySelectorAll('.accordion-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // 현재 클릭한 항목이 닫혀있었다면 열기
                    if (!isActive) {
                        currentItem.classList.add('active');
                    }
                });
            });
        });




// --------------------------------------tab
const reviewtabItems = document.querySelectorAll('.tab-btn')
const reviewtabs = document.querySelectorAll(".tab-content")

reviewtabItems.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
        reviewtabItems.forEach((tab)=> {
            tab.classList.remove('active');
        });        
        e.target.classList.add('active');

        reviewtabs.forEach((tab, j) => {
            tab.style.display = (i === j) ? 'flex' : 'none';
        })
    })
})


async function bookData() {
    const queries = [
    
        { query: '음악', sectionId: "slider1" }

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