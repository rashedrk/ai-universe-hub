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
    /*--------------------------------- 
    item details part start (left side)
    ----------------------------------*/
    console.log(itemDetails);
    //title
    const detailsTitle = document.getElementById('card-details-title');
    detailsTitle.innerText = itemDetails.description;
    // price card 
    const priceCardContainer = document.getElementById('price-card-container');
    priceCardContainer.innerHTML = '';
    priceCardContainer.innerHTML = `
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
    `
    // Features
    const detailsFeatures = document.getElementById('details-features');
    detailsFeatures.innerHTML = '';
    const features = itemDetails.features;
    for (const key in features){
        // console.log(features[key].feature_name);
        const li = document.createElement('li');
        li.innerHTML = `
            ${features[key].feature_name}
        `;
        detailsFeatures.appendChild(li);
    }
    // Integrations
    const integrationsUl = document.getElementById('integrations');
    integrationsUl.innerHTML = '';
    itemDetails.integrations.map(integration => {
        const li = document.createElement('li');
        li.innerHTML = `
            <li>${integration}</li>
        `;
        integrationsUl.appendChild(li);
    });
    /*--------------------------------- 
    item details part End (left side)
    ----------------------------------*/

    /*-----------------------------------
    item thumbnail part start (right side)
    ------------------------------------*/

    //Thumbnail image 
    const cardThumbnail = document.getElementById('card-thumbnail');
    cardThumbnail.src = `${itemDetails.image_link[0]}`;
    // title
    const inputOutputContainer = document.getElementById('input-output-examples');
    inputOutputContainer.innerHTML = '';
    const inputOutputData = itemDetails.input_output_examples;
    const random = Math.floor(Math.random() * inputOutputData.length);
    inputOutputContainer.innerHTML = `
    <h5 id="thumbnail-title" class="card-title">${inputOutputData[random].input}</h5>
    <p class="card-text">${inputOutputData[random].output}</p>
    `
    // accuracy 
    const accuracyContainer = document.getElementById('accuracy');
    const accuracy = itemDetails.accuracy.score;
    if (accuracy) {
        accuracyContainer.innerHTML = `
        ${accuracy * 100}% accuracy
    `;
    accuracyContainer.classList.remove('d-none')
    } else {
        accuracyContainer.classList.add('d-none');
    }
    /*-----------------------------------
    item thumbnail part End (right side)
    ------------------------------------*/
};


loadData(6)