// load data from server 
const loadData = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayItems(data.data.tools,dataLimit);
};

// display all items as card 
const displayItems = (items, dataLimit) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    // show only six item 
    const seeMore = document.getElementById('btn-seeMore-container');
    if (dataLimit && items.length > 6) {
        items = items.slice(0,6);
        seeMore.classList.remove('d-none');
    } else {
        seeMore.classList.add('d-none');
    }
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('col');
        itemDiv.innerHTML = `
        <div class="p-3 card h-100">
            <img src="${item.image}" class="card-img-top rounded" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol class="card-text">
                ${
                    item.features.map(feature =>`<li>${feature}</li>`).join('')
                }
                </ol>
                </div>
                <hr>
                <div class="p-3 d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">${item.name}</h5>
                        <div class="text-secondary">
                            <i class="fa-solid fa-calendar-days"></i>
                            ${item.published_in
                            }
                        </div>
                    </div>
                    <button class="btn text-danger-emphasis"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        
        `;
        cardContainer.appendChild(itemDiv);
    });
    // stop spinner 
    toggleLoader(false);
};

// spinner or loader 
const toggleLoader = (isLoading) => {
    const loaderContainer = document.getElementById('loader-container');
    if (isLoading) {
        loaderContainer.classList.remove('d-none');
    } else {
        loaderContainer.classList.add('d-none');
    }
};

// show all items when see more is clicked
document.getElementById('btn-seeMore').addEventListener('click', function () {
    toggleLoader(true);
    loadData();
    
})

loadData(6)