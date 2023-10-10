
var portSchema = {
  /* Version number of the port.json format, currently 2 */
  "version": 2,
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
    /* Installation instructions */
    "inst": "",
    /* Genres */
    "genres": [],
    /* screenshot/title screen of the game */
    "image": null,
    /* Does the port run without any additional files. */
    "rtr": false,
    /* What runtime do we require? */
    "runtime": null,
    /* Any hardware/software requirements: opengl, power, 4:3, 3:2, 16:9, lowres, hires */
    "reqs": [],
  }
}

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
  portJson.attr.inst = document.getElementById("instructions").value;
  portJson.attr.runtime = document.getElementById("runtime").value ? document.getElementById("runtime").value : null;
  //portJson.attr.reqs = Array.from(document.getElementById("requirements").selectedOptions).map(o => o.value);
  portJson.attr.rtr = document.getElementById("readytorun").checked;
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
  json = JSON.stringify(getFormValues(), null, 2);
  var file = new Blob([json], { type: "application/json" });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = document.getElementById("directoryname").value + ".port.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}


populatePorterList();