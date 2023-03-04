// load all data from server 
const loadData = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayItems(data.data.tools,dataLimit);
};
// load details data 
const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
    
    
}

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
        console.log(item);
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
                    <button onclick="detailsHandler('${item.id}')" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn text-danger-emphasis"><i class="fa-solid fa-arrow-right"></i></button>
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

// details (->) button handler
const detailsHandler = (id) => {
    loadDetails(id);
    
}

// display item details into modal 
const displayDetails = (itemDetails) => {
    const itemDetailsContainer = document.getElementById('item-details-container');

    itemDetailsContainer.innerHTML = `
        <div id="card-details-container" class="col">
        <div class="card h-100">
            <div id="card-details" class="card-body rounded">
                <h5 id="card-details-title" class="card-title">${itemDetails.description}</h5>
                <div id="price-card-container" class="d-flex justify-content-between">
                    <div class="price-card rounded shadow-sm">
                        ${
                            itemDetails.pricing && itemDetails.pricing[0].price != 0 && itemDetails.pricing[0].price != 'No cost'   ? (itemDetails.pricing[0].price + '<br>' + itemDetails.pricing[0].plan) : 'Free of Cost'
                        }
                    </div>
                    <div class="price-card rounded shadow-sm">
                        ${
                            itemDetails.pricing && itemDetails.pricing[1].price != 0 && itemDetails.pricing[0].price != 'No cost'   ? (itemDetails.pricing[1].price + '<br>' + itemDetails.pricing[1].plan) : 'Free of Cost'
                        }
                    </div>
                    <div class="price-card rounded shadow-sm">
                        ${
                            itemDetails.pricing ? (itemDetails.pricing[2].price + '<br>' + itemDetails.pricing[2].plan) : 'Free of Cost'
                        }
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <div>
                        <h1>Features</h1>
                        <ul id="details-features">
                            
                        </ul>
                    </div>
                    <div>
                        <h1>Integrations</h1>
                        <ul id="integrations">
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="col">
        <div id="card-thumbnail-container" class="card h-100 p-3">
            <img id="card-thumbnail" class="rounded" src="" class="card-img-top" alt="...">
            <div id="accuracy">
            
            </div>
            <div class="card-body text-center">
            <div id="input-output-examples">
                
            </div>
            </div>
        </div>
        </div>
    `;
};


loadData(6)