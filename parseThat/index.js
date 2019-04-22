const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://katarina.olvi.site/prays-list/#category_28';
const fs = require('fs');



rp(url)
  .then(function(html){
  	let container = $('<div class="price-list__right"></div>');
	$('.vc_tta-panel-body', html).children().each((index, item) => {
		mainItem = $('<ul class="price-list__prices"></ul>');
		$(item).each((index, inner) => {
			mainItem.append(
				`<li class="price-list__price">
					<span>${$(inner).find('.db-restaurant-menu-name-with-price').text().trim()}</span>
					<span> ${$(inner).find('.db-restaurant-menu-price').text().trim()}</span>
				</li>`
			);
		});
		container.append(mainItem);
	})

	let final = $.load(container, {decodeEntities: false})
	console.log(final)

	// fs.writeFileSync('./res.html', final.html())
    // console.log($(name, html).children().first().text())
  })
