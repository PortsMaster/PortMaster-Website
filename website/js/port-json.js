
const portSchema = {
  /* Version number of the port.json format, currently 2 */
  "version": 4,
  /* Name of the zip file, this uniquely identifies the port */
  "name": "",
  /* Directories and scripts that comes with the port. */
  "items": [],
  /* Optional scripts / directories associated with the port. */
  "items_opt": [],
  "attr": {
    /* title of the game. */
    "title": "",
    /* who ported this */
    "porter": "",
    /* Description of the game. */
    "desc": "",
    /* Description of the game, allowing for markdown */
    "desc_md": null,
    /* Installation instructions */
    "inst": "",
    /* Installation instructions, allowing for markdown */
    "inst_md": null,
    /* Genres */
    "genres": [],
    /* screenshot/title screen of the game */
    "image": null,
    /* Does the port run without any additional files. */
    "rtr": false,
    /* experimental port flag */
    "exp": false,
    /* What runtime do we require? */
    "runtime": [],
    /* Links to store wher yo can buy */
    "store": [], 
    /* Is this a free game? */
    "free": false,
    /* Any hardware/software requirements: opengl, power, 4:3, 3:2, 16:9, lowres, hires */
    "reqs": [],
     /* Architecture aarch64,armhf, x86_64, x86  */
    "arch": [],
    /* glibc version */
    "min_glibc": ""
  }
}

const descriptionMarkdown = new EasyMDE({ element: document.getElementById('description_md') });
const instructionsMarkdown = new EasyMDE({ element: document.getElementById('instructions_md') });

function getJsonTemplate() {
  var copiedTemplate = { ...portSchema };
  return copiedTemplate
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function addStoreLink() {
  var table = document.getElementById("store");
  var row = table.insertRow(-1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = '<div><input></div>';
  cell2.innerHTML = '<div><input></div>';
  cell3.innerHTML = '<input type="button" class="btn btn-danger" value="Delete" onclick="deleteRow(this)"/>';
}

async function populatePorterList() {
  var porters = {};
  try {
    var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/porters.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    porters = await response.json();
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }

  var porterList = document.getElementById("porter")
  for (let x in porters) {
    var option = document.createElement('option');
    option.text = option.value = x;
    porterList.add(option);
  }
}

function addPorter() {
  var porterList = document.getElementById("porter")
  var porters = Array.from(porterList.options).map(e => e.value);
  var newPorter = document.getElementById("addporter");
  if (!porters.includes(newPorter.value) && newPorter.value != "") {
    var option = document.createElement('option');
    option.text = option.value = newPorter.value;
    porterList.add(option, 0);
  }
  newPorter.value = "";
}

function getFormValues() {
  var portJson = getJsonTemplate();
  portJson.attr.title = document.getElementById("title").value;
  portJson.name = document.getElementById("zipname").value;
  portJson.items = document.getElementById("scriptname").value.split(",");
  portJson.items.push(document.getElementById("directoryname").value);
  portJson.attr.genres = Array.from(document.getElementById("genres").selectedOptions).map(o => o.value);
  portJson.attr.porter = Array.from(document.getElementById("porter").selectedOptions).map(o => o.value);
  portJson.attr.desc = document.getElementById("description").value;
  portJson.attr.desc_md = descriptionMarkdown.value() ? descriptionMarkdown.value() : null;
  portJson.attr.inst = document.getElementById("instructions").value;
  portJson.attr.inst_md = instructionsMarkdown.value() ? instructionsMarkdown.value() : null;
  portJson.attr.runtime = Array.from(document.getElementById("runtime").selectedOptions).map(o => o.value);
  portJson.attr.rtr = document.getElementById("readytorun").checked;
  portJson.attr.free = document.getElementById("free").checked;
  portJson.attr.exp = document.getElementById("experimental").checked;
  portJson.attr.reqs = [];

  portJson.attr.arch = [];
  if (document.getElementById("arch").value != ""){
  portJson.attr.arch = Array.from(document.getElementById("arch").selectedOptions).map(o => o.value);
  }

  // res requirements
  if (document.getElementById("notlowres").checked){
    portJson.attr.reqs.push("!lowres");
  }
  if (document.getElementById("hires").checked){
    portJson.attr.reqs.push("hires");
  }

  // ram requirements
  if (document.getElementById("2gb").checked){
    portJson.attr.reqs.push("2gb");
  }
  if (document.getElementById("4gb").checked){
    portJson.attr.reqs.push("4gb");
  }

    // opengl requirement
    if (document.getElementById("opengl").checked){
      portJson.attr.reqs.push("opengl");
    }

  // power requirement
  if (document.getElementById("power").checked){
    portJson.attr.reqs.push("power");
  }

  var table = document.getElementById("store");
  var storeLinks = [];
  for (var i = 1, row; row = table.rows[i]; i++) {
    var store = {};
    var name = row.cells[0].getElementsByTagName('input')[0].value;
    var url = row.cells[1].getElementsByTagName('input')[0].value;
    store["name"] = name;
    store["url"] = url;
    storeLinks.push(store);
  }
  portJson.attr.store = storeLinks;

  return portJson;
}

function validateForm(){
  form = document.getElementById("form");
  if (form.checkValidity()) {
    downloadJson();
  }

  form.classList.add('was-validated')
}

function downloadJson() {
  var json = JSON.stringify(getFormValues(), null, 2);
  var file = new Blob([json], { type: "application/json" });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = "port.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}



populatePorterList();
