// load data from server 
const loadData = async () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayItems(data.data.tools);
};

// display all items as card 
const displayItems = (items) => {
    const cardContainer = document.getElementById('card-container');
    const sixItems = items.slice(0,6);
    // console.log(items);
    sixItems.forEach(item => {
        console.log(item);
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

const toggleLoader = (isLoading) => {
    const loaderContainer = document.getElementById('loader-container');
    if (isLoading) {
        loaderContainer.classList.remove('d-none');
    } else {
        loaderContainer.classList.add('d-none');
    }
};

loadData()