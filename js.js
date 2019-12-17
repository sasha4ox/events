if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  alert('The File APIs are not fully supported in this browser.');
}
const tableEl = document.querySelector('#table tbody');
const table = document.getElementById('table');
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
  table.addEventListener('click', function(e) {
    if (e.target.innerText === 'Train number') {
      console.log('ok');
      let newArr = arr.sort(function(a, b) {
        let aNumber = a.number.slice(0, -1);

        let bNumber = b.number.slice(0, -1);
        return aNumber - bNumber;
      });
      console.log(arr[0]);
      console.log(newArr);
      render(newArr);
    } else if (e.target.innerText === 'City Departing') {
      let newArr = arr.sort(function(a, b) {
        let city1 = a.departingCity.toLowerCase();
        let city2 = b.departingCity.toLowerCase();
        if (city1 < city2) return -1;
        if (city1 > city2) return 1;
        return 0;
      });
      render(newArr);
    } else if (e.target.innerText === 'City Arriving') {
      let newArr = arr.sort(function(a, b) {
        let city1 = a.ArrivingCity.toLowerCase();
        let city2 = b.ArrivingCity.toLowerCase();
        if (city1 < city2) return -1;
        if (city1 > city2) return 1;
        return 0;
      });
      render(newArr);
    } else if (e.target.innerText === 'Deprting Day') {
      let counter = 0;
      let newArr = arr.sort(function(a, b) {
        let city1 = a.ArrivingCity.toLowerCase();
        let city2 = b.ArrivingCity.toLowerCase();
        if (city1 < city2) return -1;
        if (city1 > city2) return 1;
        return 0;
      });
      render(newArr);
      counter++;
      console.log(counter);
    }
  });
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
