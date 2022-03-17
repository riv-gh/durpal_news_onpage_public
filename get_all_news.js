//https://hcj.gov.ua/admin/content/search?title=&type=news&language=All&date_filter%5Bmin%5D%5Bdate%5D=01.01.1999&date_filter%5Bmax%5D%5Bdate%5D=24.02.2022


/*********************************************************/
/*       завантаження всіх новин на одній сторінці       */
/*********************************************************/

const pages = +document.querySelector('ul.pager>li.pager-last.last>a').href.split('=').slice(-1)[0]
const link_tpl = document.querySelector('ul.pager>li.pager-last.last>a').href.replace([]+pages,'${page}')

const getLink = (page, tpl = link_tpl) => {return eval('`'+link_tpl+'`')}

const content_el = document.querySelector('#block-system-main .views-table.cols-9 tbody')


const insertBlock = (block_el) => {
	content_el.appendChild(block_el)
}

let count = 1
for (let page=1; page<=pages; page++) {
	fetch(getLink(page)).then(function (response) {
		return response.text()
	}).then(function (html) {
		// console.log(html)
		const parser = new DOMParser()
		const htmlDocument = parser.parseFromString(html, "text/html")
		htmlDocument.querySelectorAll('#block-system-main .views-table.cols-9 tbody tr').forEach(block=>{
			const clone_block = block.cloneNode(true)
			insertBlock(clone_block)
		})
		console.log(`Add page: ${page}\tCount: ${count++}/${pages} `)
	}).catch(function (err) {
		console.warn('Something went wrong.', err)
	});

}

/*********************************************************/
/*        пошук всіх поислань залежно від статусу        */
/*********************************************************/
// el.parentElement.querySelector('.views-field-edit-node>a').href

// Array.apply(null, 
// 	document.querySelectorAll('#block-system-main .views-table.cols-9 tbody tr>td.views-field.views-field-status')
// 	)
// 	.filter(el=>{
// 		return el.textContent.trim() === 'Опубліковано' // або 'Не опубліковано' (всі новини за період опубліковані)
// 	})
// 	.map(el=>{
// 		// const full_link = el.parentElement.querySelector('.views-field-edit-node>a').href
// 		// const short_link = el.parentElement.querySelector('.views-field-edit-node>a').href.split('?')[0]
// 		return el.parentElement.querySelector('.views-field-edit-node>a').href.split('?')[0]
// 		//https://hcj.gov.ua/node/<node>/edit
// 	})
// 	.map(el=>{
// 		return `'node/${el.split('/').slice(-2)[0]}'`
// 	})



var links_arr = Array.apply(null, 
	document.querySelectorAll('#block-system-main .views-table.cols-9 tbody tr>td.views-field.views-field-status')
	)
	.filter(el=>{
		return el.textContent.trim() === 'Опубліковано' // або 'Не опубліковано' (всі новини за період опубліковані)
	})
	.map(el=>{
		// const full_link = el.parentElement.querySelector('.views-field-edit-node>a').href
		// const short_link = el.parentElement.querySelector('.views-field-edit-node>a').href.split('?')[0]
		return el.parentElement.querySelector('.views-field-edit-node>a').href.split('?')[0]
		//https://hcj.gov.ua/node/<node>/edit
	})

var links_text = Array.apply(null, 
	document.querySelectorAll('#block-system-main .views-table.cols-9 tbody tr>td.views-field.views-field-status')
	)
	.filter(el=>{
		return el.textContent.trim() === 'Опубліковано' // або 'Не опубліковано' (всі новини за період опубліковані)
	})
	.map(el=>{
		// const full_link = el.parentElement.querySelector('.views-field-edit-node>a').href
		// const short_link = el.parentElement.querySelector('.views-field-edit-node>a').href.split('?')[0]
		return el.parentElement.querySelector('.views-field-edit-node>a').href.split('?')[0]
		//https://hcj.gov.ua/node/<node>/edit
	}).join(`
`)

var pre = document.createElement('pre')
document.body.appendChild(pre)

pre.textContent = links_text