if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  alert('The File APIs are not fully supported in this browser.');
}
const tableEl = document.querySelector('#table tbody');
console.log(tableEl);
function creationTr(innerText, el) {
  let trEl = document.createElement('td');
  trEl.append(`${innerText}`);
  el.append(trEl);
}
function render(arr) {
  arr.forEach(x => {
    let tdEl = document.createElement('tr');
    creationTr(x.number, tdEl);
    creationTr(x.departingCity, tdEl);
    creationTr(x.ArrivingCity, tdEl);
    creationTr(x.dayDeprting, tdEl);
    creationTr(x.timeDeparting, tdEl);
    creationTr(x.dayArriving, tdEl);
    creationTr(x.timeArriving, tdEl);
    creationTr(x.price, tdEl);
    tableEl.append(tdEl);
  });
}
function getObj(arr) {
  render(arr);
}
//

let arrayOfObjects = [];
function handleFileSelect(evt) {
  var file = evt.target.files[0];
  console.log(file);
  if (!file.type.match('text.*')) {
    return alert(file.name + ' is not a valid text file.');
  }
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function(e) {
    var textToArray = reader.result.split('\n').map(function(x) {
      return x.split(',').map(x => x.split(' '));
    });
    arrayOfObjects = textToArray.map(x => {
      return new Train(x[0][0], x[0][1], x[0][2], x[0][5], x[0][6], x[0][8], x[0][9], x[0][10]);
    });
    getObj(arrayOfObjects);
  };
}

function Train(
  number,
  departingCity,
  ArrivingCity,
  dayDeprting,
  timeDeparting,
  dayArriving,
  timeArriving,
  price
) {
  this.number = number;
  this.departingCity = departingCity;
  this.ArrivingCity = ArrivingCity;
  this.dayDeprting = dayDeprting;
  this.timeDeparting = timeDeparting;
  this.dayArriving = dayArriving;
  this.timeArriving = timeArriving;
  this.price = price;
}
window.onload = function() {
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
};
