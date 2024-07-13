const inputListText = document.getElementById('inputListText');
const inputListTime = document.getElementById('inputListTime');
const addButton = document.getElementById('add');
const resultsContainer = document.getElementById('resultsContainer');
const showReportElement = document.getElementById('showReport');

addButton.addEventListener("click", addTodo);

function addTodo() {
    const textValue = inputListText.value.trim();
    const timeValue = inputListTime.value.trim();
    
    if (textValue === '' || timeValue === '') {
        alert('รบกวนกรอก "ข้อมูล" และ "เวลา" ด้วยนะคะ');
        return;
    }

    // Create new result div
    const newResultDiv = document.createElement('div');
    newResultDiv.classList.add('result');
    
    // Create elements inside new result div
    const newResultText = document.createElement('p');
    newResultText.textContent = textValue;
    
    const newResultTime = document.createElement('p');
    newResultTime.textContent = timeValue;
    newResultTime.style.display = 'flex';
    newResultTime.style.justifyContent = 'center';
    
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    
    const redP = document.createElement('p');
    redP.id = 'redColor';
    redP.classList.add('red-color');
    redP.addEventListener('click', toggleColor);
    
    const greenP = document.createElement('p');
    greenP.id = 'greenColor';
    greenP.classList.add('green-color');
    greenP.style.display = 'none';
    greenP.addEventListener('click', toggleColor);
    
    const deleteP = document.createElement('p');
    deleteP.id = 'delete';
    deleteP.style.color = 'white';
    deleteP.classList.add('delete');
    deleteP.textContent = 'delete';
    deleteP.addEventListener('click', deleteInput);    

    // Append elements to new result div
    colorDiv.appendChild(redP);
    colorDiv.appendChild(greenP);
    newResultDiv.appendChild(newResultText);
    newResultDiv.appendChild(newResultTime);
    newResultDiv.appendChild(colorDiv);
    newResultDiv.appendChild(deleteP);
    
    // Append new result div to resultsContainer
    resultsContainer.appendChild(newResultDiv);
    
    // Reset input fields
    inputListText.value = '';
    inputListTime.value = '';
}

function toggleColor() {
    const colorDiv = this.parentNode;
    const redP = colorDiv.querySelector('.red-color');
    const greenP = colorDiv.querySelector('.green-color');
    
    if (this.classList.contains('red-color')) {
        redP.style.display = 'none';
        greenP.style.display = 'block';
    } else if (this.classList.contains('green-color')) {
        redP.style.display = 'block';
        greenP.style.display = 'none';
    }
}

function deleteInput() {
    const colorDiv = this.parentNode.querySelector('.color');
    const redP = colorDiv.querySelector('.red-color');
    const greenP = colorDiv.querySelector('.green-color');

    if (greenP.style.display !== 'block') {
        
        const confirmDelete = confirm('คุณต้องการลบ List นี้ใช่ไหม?');
        if (!confirmDelete) {
            return;
        } else {
            this.parentNode.remove();
        }
    } else {
    
    const textValue = this.parentNode.querySelector('p:first-child').textContent;
    const timeValue = this.parentNode.querySelector('p:nth-child(2)').textContent;

    const newReportDiv = document.createElement('div');
    newReportDiv.classList.add('report');

    const newResultText = document.createElement('p');
    newResultText.textContent = `List: ${textValue}`;

    const newResultTime = document.createElement('p');
    newResultTime.textContent = `Time: ${timeValue}`;
    newResultTime.style.display = 'flex';
    newResultTime.style.justifyContent = 'right';

    const newStatus = document.createElement('p');
    newStatus.textContent = 'FINISH';
    newStatus.style.display = 'flex';
    newStatus.style.justifyContent = 'right';

    newReportDiv.appendChild(newResultText);
    newReportDiv.appendChild(newResultTime);
    newReportDiv.appendChild(newStatus);

    showReportElement.appendChild(newReportDiv);

    this.parentNode.remove();

    }
}

const reportButton = document.getElementById('report');
const reportButtonHide = document.getElementById('hideReport');

reportButton.addEventListener('click', toggleReport);
reportButtonHide.addEventListener('click', toggleReportHide);

function toggleReport() {
    showReportElement.style.display = 'grid';
}

function toggleReportHide() {
    showReportElement.style.display = 'none';
}