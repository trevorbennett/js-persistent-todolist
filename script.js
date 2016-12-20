// Todo :
// si cliqué/coché, barrer texte
// déplacer item coché en bas
// déplacer item décoché en haut

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.tasks');
const items = JSON.parse(localStorage.getItem('items')) || [];
const checkBox = document.querySelector('.check-button');
const unCheckBox = document.querySelector('.uncheck-button');
const deleteAllButton = document.querySelector('.delete-all');

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };
    
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(tasks = [], tasksList) {
    tasksList.innerHTML = tasks.map((task, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${task.done ? 'checked' : ''} />
          <label for="item${i}">${task.text}</label>
          <a class="delete" href="#">x</a>
        </li>
      `;
    }).join('');
}

function deleteAll(e){
  e.preventDefault();
  localStorage.removeItem('items');
  items.length = [];
  itemsList.innerHTML = '';
  return true;
  
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function checkAll(e){
    items.forEach(function(element){
      element.done = true;
    })
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

function unCheckAll(e){

    items.forEach(function(element){
      element.done = false;
    })
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

checkBox.addEventListener('click', checkAll);
unCheckBox.addEventListener('click', unCheckAll);

deleteAllButton.addEventListener('click', deleteAll);

populateList(items, itemsList);
