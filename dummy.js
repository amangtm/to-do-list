const form=document.getElementById('form');
const cardContainer=document.getElementById('toDo')

function createCardElement(title,desc){
    const noOfCards=cardContainer.childElementCount;
    const card=document.createElement('div')
    card.className='to-do-card';
    card.id=`card${noOfCards}`;

    const header=document.createElement('div') // header 
    header.className='card-header';

    const a1=document.createElement('a');
    a1.setAttribute('href','#!');
    const img1=document.createElement('img');
    img1.id="edit-task";
    img1.setAttribute('src','tiny-pencil.png');
    //img1.addEventListener('click',editCard(card.id));
    a1.append(img1);

    const checkBox=document.createElement('input');
    checkBox.id="complete-task";
    checkBox.setAttribute('type','checkbox');
    
    const a2= a1.cloneNode(true); // Cancel ICon
    const img2= a2.childNodes[0];
    img2.id="delete-task";
    img2.setAttribute('src','close.png');
    img2.addEventListener('click',removeCard(card))
    a2.append(img2);

    header.append(a1);
    header.append(checkBox);
    header.append(a2);

    const cardTitle=document.createElement('div') // Title
    cardTitle.className='card-title';
    cardTitle.innerText=title;


    const cardDesc=cardTitle.cloneNode(true) // Description
    cardDesc.className='card-desc';
    cardDesc.innerText=desc;

                     
    card.append(header);  // add all card component
    card.append(cardTitle);
    card.append(cardDesc);

    return card;
}

form.addEventListener('submit',function (event){  // CREATE TASK CARD
    const card=createCardElement(form.elements[0].value, form.elements[1].value);   
    cardContainer.append(card);
    event.preventDefault();
});

function removeCard(card){ // Remove Task Card using Cancel Button
    card.remove();
}

// create Modal for edit Card
// function createModal(cardId,titleText, descText){

//     const modalDiv= document.createElement('div');
//     modalDiv.className='card-modal';
//     modalDiv.id='modal';

//     const modalForm=document.createElement('form');
//     modalForm.className='modal-form';

//     const inputTitle=document.createElement('input');
//     inputTitle.setAttribute('type','text');
//     inputTitle.className='modal-title'
//     inputTitle.setAttribute('value',titleText);

//     const inputDesc=document.createElement('textarea');
//     inputDesc.className='modal-desc';
//     inputDesc.setAttribute('value',descText);

//     const btn=document.createElement('input');
//     btn.setAttribute('type','submit');
//     btn.className='modal-submit';
//     btn.addEventListener('click',function (){
//         // console.log('Title and desc updated');
//         document.getElementById(cardId).querySelector('.card-title').textContent=modalForm.elements[0].value;
//         document.getElementById(cardId).querySelector('.card-desc').textContent=modalForm.elements[1].value;
//     })

//     modalForm.append(inputTitle);
//     modalForm.append(inputDesc);
//     modalForm.append(inputTitle);

//     modalDiv.append(modalForm);

//     return modalDiv;
// }

// function editCard(cardId){
//     const modalDiv= createModal(cardId,form.elements[0].value, form.elements[1].value)
//     modalDiv.style.display='block';

// }
