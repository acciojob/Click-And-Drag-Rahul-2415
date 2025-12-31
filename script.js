// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    selectedItem = item;

    const rect = item.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    item.style.position = 'absolute';
    item.style.zIndex = 1000;

    document.addEventListener('mousemove', moveItem);
    document.addEventListener('mouseup', dropItem);
  });
});

function moveItem(e) {
  if (!selectedItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = selectedItem.getBoundingClientRect();

  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;

  
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left + itemRect.width > containerRect.width) {
    left = containerRect.width - itemRect.width;
  }
  if (top + itemRect.height > containerRect.height) {
    top = containerRect.height - itemRect.height;
  }

  selectedItem.style.left = left + 'px';
  selectedItem.style.top = top + 'px';
}

function dropItem() {
  document.removeEventListener('mousemove', moveItem);
  document.removeEventListener('mouseup', dropItem);
  selectedItem = null;
}
