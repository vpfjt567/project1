async function submainData() {
    const queries = [
        { query: '독해 알고리즘', sectionId: "submain" },
        

    ];

    for (const { query, sectionId } of queries) {
        const data = await fetchBooks(query);


        const section = document.querySelector(`#${sectionId}`);
        const boxElements = section.querySelectorAll(".submainapi");
        console.log(section, boxElements);

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            console.log(box, i);
            if (!doc) return;


            box.innerHTML = `<div class="submainbookimg"><img src="${doc.thumbnail}"></div>
                        <div class="submainbookinfo">
                            <div>${i + 1}</div>
                            <h3>${doc.title}</h3>
                            <h6>${doc.authors}</h6>
                            <h3>${doc.sale_price}원</h3>
                        
                        </div>
                        `
        });
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
const tabItems = document.querySelectorAll('.tab-btn')
const tabs = document.querySelectorAll(".tab-content")

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
