// Create inputs for the header rows
function makeHeaderInput(numHeaderRows){
	for (var i = 1; i <= numHeaderRows; i++) {
		document.getElementById('row').insertAdjacentHTML('beforeend', `<td><input type="text" placeholder="Header Row ${i} name" name="headerDataNum${i}" id="headerData_${i}"> </td>`)
	}
	document.getElementById('dataInfo').insertAdjacentHTML('beforeend', `<p></p><label for="dataRows">How many rows are there per line of text</label><input type="text" id="dataRows" placeholder="Number"><button name="submit" onclick="rowNames(document.getElementById('dataRows').value)">Submit</button>`)

}

var a = 1

function makeHeaderAnnotations(atts){
	document.getElementById('data').insertAdjacentHTML('beforeend', `<ul id = "row_${a}"">`)
	for (var i = 0; i < atts.length; i++) {
		 document.getElementById('data').insertAdjacentHTML('beforeend', `<li><input type="text" placeholder="${atts[i]}" name="${i}" id="data_${i}"> </li>`)
	}
	document.getElementById('data').insertAdjacentHTML('beforeend', `</ul>`)
	a += 1
}

function rowNames(num_rows){
	document.getElementById('dataInfo').insertAdjacentHTML('beforeend', `<table id="namesOfRows"><tr id="onlyRow">`)
	for (var i = 1; i <= num_rows; i++){
		document.getElementById('onlyRow').insertAdjacentHTML('beforeend', `<td><input type="text" placeholder="Name of Row" id="rowName${i}"</td>`)
	}
	document.getElementById('dataInfo').insertAdjacentHTML('beforeend', `</tr></table>`)
	document.getElementById('dataInfo').insertAdjacentHTML('beforeend', `<p>Now make sure your text is in and click submit.</p><button name="submit" onclick="annotateText()">Submit</button>`)
}

function annotateText(){
	var header = []
	for (var i = 1; i <= document.getElementById('headers').value; i++) {
		header.push(document.getElementById(`headerData_${i}`).value)
	}
	// var splitUp = document.getElementById('in').value.split('\n')
	// for (var i = splitUp.length - 1; i >= 0; i--) {
	// 	if (splitUp[i] == ''){
	// 		splitUp = splitUp.splice(i, 1)
	// 	}
	// }
        let splitUp = document.querySelector('#in').value.split('\n')
        splitUp = splitUp.filter(x => x.trim())
	console.log(splitUp)
	var annotations = []
	for (var i = 1; i <= document.getElementById('dataRows').value; i++) {
		annotations.push(document.getElementById(`rowName${i}`).value)
	}
	for (var i = 0; i < header.length; i++) {
		document.getElementById('out').value += '\\' + header[i] + ' ' + splitUp[i] + '\n'
	}
	var b = 0
	for (var i = header.length; i < splitUp.length; i++) {
		document.getElementById('out').value += '\\' + annotations[b%(annotations.length)] + ' ' + splitUp[i] + '\n'
		b = b + 1
	}
}