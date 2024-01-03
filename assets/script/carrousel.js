const apiUrl = 'https://api.brchallenges.com/api/paqueta/shoes';
const items = document.querySelector('#shoesDestaque');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const newListProduct = data.map(products => {
            const isSoldOut = products.soldout ? 'produto esgotado' : 'normal';
            const idSoldout = products.soldout ? 'soldout' : 'normal';
            return `
            <div  class="swiper-slide">
     
        <li class='listItems' >
          <p class="${idSoldout}">${isSoldOut}</p>
          <div class="heart">
          <div title="Like" class="heart-container">
          <input id="Give-It-An-Id" class="checkbox" type="checkbox">
          <div class="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-outline" viewBox="0 0 24 24">
                  <path
                      d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                  </path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-filled" viewBox="0 0 24 24">
                  <path
                      d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                  </path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="svg-celebrate">
              </svg>
          </div>
      </div>
      </div>
          <img class="imgItems" src="${products.image}">
          <p class="nameItems">${products.name}</p>
          <p class="priceItem">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                products.price.value.toFixed(2))}</p>
          ${products.soldout
                    ? '<button class="buttonSoldout">me avise quando chegar</button>'
                    : '<button class="buttonOrangeCards">comprar</button>'
                }
        </li>             </div>
        `;
        }).join('');

        items.innerHTML = newListProduct;
    })
    .catch(error => {
        console.error(`Erro na requisição: ${error.message}`);
    });

    const swiper = new Swiper('.swiper', {

        direction: 'horizontal',
        loop: true,
    
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
    
        },
    
        autoplay: {
            delay: 2000,
        },
    
        slidesPerView: 4,
    });
