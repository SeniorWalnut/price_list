const rp = require('request-promise');
const cheerio = require('cheerio');
// const $ = cheerio.load({decodeEntities: false});
const url = 'http://katarina.olvi.site/prays-list/#category_28';
const fs = require('fs');



rp(url)
  .then(function(html){
  	let container = cheerio('<div class="price-list__right"></div>');
	cheerio('.vc_tta-panel-body', html).each((index, item) => {
		mainItem = cheerio('<ul class="price-list__prices"></ul>');
		cheerio(item).children().each((index, inner) => {
			mainItem.append(
				`<li class="price-list__price">
					<span>${cheerio(inner).find('.db-restaurant-menu-name-with-price').text().trim()}</span>
					<span> ${cheerio(inner).find('.db-restaurant-menu-price').text().trim()}</span>
				</li>`
			);
		});
		container.append(mainItem);
	})

	fs.writeFileSync('./res.html', container.html())
    // console.log($(name, html).children().first().text())
  })
