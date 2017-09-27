// Create inputs for the header rows
function makeHeaderInput(numHeaderRows){
  let row = document.querySelector('#row')
  let info = document.querySelector('#info')

  for (let i = 1; i <= numHeaderRows; i++) {
    row.insertAdjacentHTML('beforeend', `
<td>
<input 
  placeholder="Header Row ${i} name" 
  name="headerDataNum${i}" 
  id="headerData_${i}"> 
</td>
  `) }

  info.insertAdjacentHTML('beforeend', `
<p></p>
<label for="dataRows">How many rows are there per line of text</label>
<input id="dataRows" placeholder="Number">
<button name="submit" onclick="rowNames(document.querySelector('#dataRows').value)">Submit</button>
  `)

}

let a = 1

function makeHeaderAnnotations(atts){
  let data = document.querySelector('#data')
  data.insertAdjacentHTML('beforeend', `<ul id = "row_${a}">`)

  for (let i = 0; i < atts.length; i++) {
     data.insertAdjacentHTML('beforeend', `
<li>
  <input 
  placeholder="${atts[i]}" 
  name="${i}" 
  id="data_${i}"> 
</li>
  `) }
  data.insertAdjacentHTML('beforeend', `</ul>`)
  a += 1
}

// build table of rows of tier names
function rowNames(num_rows){
  let dataInfo = document.querySelector('#dataInfo')

  dataInfo.insertAdjacentHTML('beforeend', `
<table id="namesOfRows"><tr id="onlyRow">
`)

  let onlyRow = document.querySelector('#onlyRow')

  for (let i = 1; i <= num_rows; i++){
    onlyRow.insertAdjacentHTML('beforeend', `
<td><input placeholder="Name of Row" id="rowName${i}"</td>
  `)
  }
  dataInfo.insertAdjacentHTML('beforeend', `</tr></table>`)

  dataInfo.insertAdjacentHTML('beforeend', `<p>Now make sure your text is in and click submit.</p><button name="submit" onclick="annotateText()">Submit</button>`)
}

function annotateText(){
  let header = []
  for (let i = 1; i <= document.querySelector('#headers').value; i++) {
    header.push(document.querySelector(`#headerData_${i}`).value)
  }

        let splitUp = document.querySelector('#in').value.split('\n')
        splitUp = splitUp.filter(x => x.trim())

  let annotations = []
  for (let i = 1; i <= document.querySelector('#dataRows').value; i++) {
    annotations.push(document.querySelector(`#rowName${i}`).value)
  }
  for (let i = 0; i < header.length; i++) {
    document.querySelector('#out').value += '\\' + header[i] + ' ' + splitUp[i] + '\n'
  }
  let b = 0
  for (let i = header.length; i < splitUp.length; i++) {
    document.querySelector('#out').value += '\\' + annotations[b%(annotations.length)] + ' ' + splitUp[i] + '\n'
    b = b + 1
  }
}
