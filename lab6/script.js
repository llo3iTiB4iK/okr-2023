function user_dialog(){
	let acquainted = confirm('Ви підтверджуєте, що уважно ознайомились з правилами та умовами нашого сервісу?')
	if (acquainted) {
		let age = prompt('Введіть Ваш вік:')
		if (age<21){
			let newButton = document.createElement('button')
			newButton.data = age
			newButton.id = 'rent_denied_button'
			newButton.style = 'background-color: #cf2525; border: none; border-radius: 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); color: white; font-size: 20px; padding: 12px 24px; text-align: center; text-decoration: none;'
			newButton.innerText = 'Оренда недоступна'
			document.getElementById('rental-btn').replaceWith(newButton)

			window.alert('Згідно наших умов, мінімальний вік для можливості оренди авто - 21 рік!')
			let originalBackground = document.body.style.background
			document.body.style.background = "none"
    		document.body.style.backgroundColor = 'yellow'
    		let seconds = 30
    		let countdown = setInterval(function(){
    			if (seconds === 0){
    				clearInterval(countdown)
    				document.body.style.background = originalBackground
    				console.log('Background settings returned to default')
    			} else {
    				console.log(seconds,'seconds left until background returns to default')
    				seconds --
    			}   			
    		}, 1000)
		} else {
			window.location.href = "rent_page.html"
		}
	} else {
		window.alert('Ви будете перенаправлені на сторінку з правилами та умовами!')
		window.location.href = "rules.html"
	}
}
function displayDeveloperInfo(surname, name, position = "Студент КПІ") {
  	alert("Інформація про розробника:\nІм'я: " + name + " " + surname + "\nПосада: " + position)
}
function compareStrings(str1, str2) {
  	if (str1 === str2) {
    	alert('Рядки рівні')
  	} else if (str1 > str2) {
    	alert('Більший рядок:\n' + str1)
  	} else {
    	alert('Більший рядок:\n' + str2)
  	}
}
auto_list_page = document.getElementById('auto_list_page')
if (auto_list_page) {
	auto_list_page.onload = function() {
    let btn = document.getElementById('rental-btn')
    btn.style = 'background-color: #4CAF50; border: none; border-radius: 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); color: white; font-size: 20px; padding: 12px 24px; text-align: center; text-decoration: none;';
    let images_to_set_floating = document.querySelectorAll('.to_right_side');
    images_to_set_floating.forEach(img => {
    	img.style.cssFloat = 'right';
    })
    let newButton = document.createElement("button")
    newButton.innerText = "Показувати тарифи в характеристиках"
    newButton.onclick = show_prices_in_list
    newButton.id = 'prices_in_list_btn'
    document.getElementById('we_offer').append(newButton)
}
}
function show_prices_in_list() {
	let specifications = document.querySelectorAll('.specifications')
	let pricelist = document.getElementById('pricelist')
	let labels = pricelist.rows[1].cells
	let newTable = '<table width="38%" style="border-collapse:collapse; text-align:center; margin-top:30px; font-size:16px; line-height:3em; border:1px solid black" class="prices_for_car" border="none"><tr bgcolor="#0057b7" style="color:white;"><td>Період</td>'
	for (let i=0; i<=3; i++) {
		newTable += '<td>'+labels[i].textContent+'</td>'
	}
	newTableCopy = newTable
	for (let i=0; i<specifications.length; i++) {
		newTable = newTableCopy
		newTable += '<td><span>Завдаток </span></td></tr><tr bgcolor="#ffd700" border="1px solid black"><td>Ціна за добу</td>'
		for (let j=0; j<=4; j++){
			newTable += '<td>'+pricelist.rows[i+2].cells[j+1].textContent+' грн</td>'
		}
		specifications[i].innerHTML += newTable+'</tr></table>'
	}
	document.querySelectorAll('.prices_for_car td').forEach(function(element) {
		element.style.border = "1px solid black"
	});
	let attention_text_node = null
	if (document.getElementById('rent_denied_button')) {
		if (document.getElementById('rent_denied_button').data) {
			attention_text_node = document.createTextNode('* На жаль, Ваш вік не дозволяє Вам орендувати автомобілі згідно умов нашого сервісу')
		} else {
			attention_text_node = document.createTextNode('* Нагадуємо, що для оренди автомобіля потрібно мати вік не менше 21 року та стаж водіння не менше 2 років')
		}
	} else {
		attention_text_node = document.createTextNode('* Нагадуємо, що для оренди автомобіля потрібно мати вік не менше 21 року та стаж водіння не менше 2 років')
	}
	console.log(attention_text_node)
	document.getElementById('auto_list').prepend(attention_text_node)
	pricelist.outerHTML = ''
	document.getElementById('prices_in_list_btn').remove()
	let annotation = document.getElementById('annotation')
	let questionButton = document.createElement('button')
	questionButton.innerText = "?"
	questionButton.style = "border-radius:50%; font-weight:bold;"
	document.querySelectorAll('.prices_for_car span').forEach(function(element) {
		let button = questionButton.cloneNode(true)
		button.onclick = function(){alert(annotation.textContent)}
		button.style.backgroundColor = "white"
		element.after(button)
	});
	annotation.remove()
	let elem = document.querySelectorAll('a')[5].remove()
}