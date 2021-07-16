
    const form=document.getElementById('form');
    const cardContainer=document.getElementById('toDo')
    let noOfCards=0;

    localStorage.setItem('todo',"[]");  // using local storage 
    localStorage.setItem('done',"[]");

   
    function findIndexInArray(arr,objTitle,objDesc){ // arr is array of object of {title and desc}
        let pos=-1;
        for(i=0;i< arr.length;i++){
                if(arr[i].title==objTitle && arr[i].desc==objDesc){
                    pos=i;
                    break;
                }
        }
        return pos;

    }
    
    function addElementInArray(key,title,desc){
        let arr=JSON.parse(localStorage.getItem(key)); 
        arr.push({'title':title, 'desc':desc});
        localStorage.setItem(key,JSON.stringify(arr));
    }
    function removeElementInArray(key,title,desc){
            let pos=-1; // remove data  from global object
            
            let arr=JSON.parse(localStorage.getItem(key)); 
            pos=findIndexInArray(arr,title,desc);
            if(pos!==-1){
                arr.splice(pos,1);
            }
            localStorage.setItem(key,JSON.stringify(arr));
    }
    
    function removeCardHandler(event){ // Remove card Handler
            const cardId=event.target.parentNode.parentNode.parentNode.id;
            
            let cardTitle=document.getElementById(cardId).childNodes[1].innerText;
            let cardDesc=document.getElementById(cardId).childNodes[2].innerText;
            removeElementInArray('todo',cardTitle,cardDesc); // update todo array 
            document.getElementById(cardId).remove();
    }
    
    function createCardElement(title,desc){
        noOfCards=noOfCards+1;
        const card=document.createElement('div')
        card.className='to-do-card';
        card.id=`card${noOfCards}`;
        card.setAttribute('draggable','true');
       card.addEventListener('dragstart',cardDragStartHandler);
    
        const header=document.createElement('div') // header 
        header.className='card-header';
    
        const a1=document.createElement('a');
        a1.setAttribute('href','#!');
        const img1=document.createElement('img');
        img1.id="edit-task";
        img1.setAttribute('src','tiny-pencil.png');
        img1.addEventListener('click',editCardHandler)
        a1.append(img1);
    
        // const checkBox=document.createElement('input');
        // checkBox.id="complete-task";
        // checkBox.setAttribute('type','checkbox');
        
        const a2= a1.cloneNode(true); // Cancel ICon
        const img2= a2.childNodes[0];
        img2.id="delete-task";
        img2.setAttribute('src','close.png');
        img2.addEventListener('click',removeCardHandler)
        a2.append(img2);
    
        header.append(a1);
        //header.append(checkBox);
        header.append(a2);
    
        const cardTitle=document.createElement('div') // Title
        cardTitle.className='card-title';
        cardTitle.innerText=title;
    
    
        const cardDesc=cardTitle.cloneNode(true) // Description
        cardDesc.className='card-desc';
        cardDesc.innerText=desc;
    
                         
        card.append(header);  
        card.append(cardTitle);
        card.append(cardDesc);
    
        return card;
    }
    
    
    

    form.addEventListener('submit',function (event){  // CREAT TASK CARD
        const card=createCardElement(form.elements[0].value, form.elements[1].value);

        addElementInArray('todo',form.elements[0].value,form.elements[1].value)
        cardContainer.append(card);
        event.preventDefault();
    });
    
    // create Modal for edit Card
    
    function createModal(cardId,titleText, descText){
        // make background blur
        document.body.style.backgroundColor='rgba(1,1,1,0.8)';
    
        const modalDiv= document.createElement('div');
        modalDiv.className='card-modal';
        modalDiv.id='modal';
    
        const modalHeading= document.createElement('h1');
        modalHeading.className='modal-heading';
        modalHeading.innerText='Edit task';
    
        const modalForm=document.createElement('form');
        modalForm.className='modal-form';
    
        const inputTitle=document.createElement('input');
        inputTitle.setAttribute('type','text');
        inputTitle.className='modal-title';
        inputTitle.defaultValue=titleText;
        // console.log(inputTitle.textContent);
    
        const inputDesc=document.createElement('textarea');
        inputDesc.className='modal-desc';
        inputDesc.innerText=descText;
    
        const btn=document.createElement('input');
        btn.setAttribute('type','submit');
        btn.setAttribute('value','Update');
        btn.className='modal-submit';
        btn.addEventListener('click',function (event){
            // console.log('Title and desc updated');
            document.getElementById(cardId).querySelector('.card-title').textContent=modalForm.elements[0].value;
            document.getElementById(cardId).querySelector('.card-desc').textContent=modalForm.elements[1].value;
           
    
            // update in global obj: 
            // (titleText,descText) => (modalForm.elements[0].value,modalForm.elements[1].value)
            let pos=-1; 
            let oldTitle=titleText;
            let oldDesc=descText;
            let arr=JSON.parse(localStorage.getItem('todo')); 
            pos=findIndexInArray(arr,oldTitle,oldDesc);
            if(pos!==-1){
                arr[pos].title=modalForm.elements[0].value;
                arr[pos].desc=modalForm.elements[1].value
                localStorage.setItem('todo',JSON.stringify(arr));
            }

            modalDiv.style.display='none';
            document.body.style.backgroundColor='white';
        })
    
        modalForm.append(inputTitle);
        modalForm.append(inputDesc);
        modalForm.append(btn);
    
        modalDiv.append(modalHeading);
        modalDiv.append(modalForm);
    
        document.querySelector('#toDo').append(modalDiv);
        return modalDiv;
    }
    
    function editCardHandler(event){
        const cardId=event.target.parentNode.parentNode.parentNode.id;
        const title=document.getElementById(cardId).childNodes[1].innerText;
        const desc=document.getElementById(cardId).childNodes[2].innerText;
    
        const modalDiv= createModal(cardId,title,desc)
        modalDiv.style.display='flex';
    
    }
    
    // When Modal is open and user click anywhere
    // document.body.addEventListener('click', function (event){
    //     if(modalDiv.style.display=='flex'){ // modal 
    //         modalDiv.style.display='none';
    //     }
    // })
    
    function createItemElement(cardId,title,desc){
        const item=document.createElement('div');
        item.className='item-card';
        item.id=cardId;
        item.setAttribute('draggable','true');
        item.addEventListener('dragstart',itemDragStartHandler);
    
        const itemTitle=document.createElement('div');
        itemTitle.className='item-title'
        itemTitle.innerText=title;
    
        const itemDesc=document.createElement('div');
        itemDesc.className='item-desc'
        itemDesc.innerText=desc;
    
        item.append(itemTitle);
        item.append(itemDesc);
        return item;
    }

    // DRAG and Drop ACTION
     // 1. from ToDO -> Completed 
    function cardDragStartHandler(event){
        event.dataTransfer.setData('text/plain',event.target.id);
        event.dataTransfer.effectAllowed='move';
    }
    
    // Drop event
    
        const itemListWrapper=document.getElementById('item-list-wrapper');
        itemListWrapper.addEventListener('dragover',function (event){
            event.preventDefault();
            event.dataTransfer.dropEffect='allowed';
        })
        itemListWrapper.addEventListener('drop', function (event){
            event.preventDefault();
            let cardId=event.dataTransfer.getData('text/plain');
            // console.log(data);
            let title=document.getElementById(cardId).childNodes[1].innerText;
            let desc=document.getElementById(cardId).childNodes[2].innerText;

            removeElementInArray('todo',title,desc);
            addElementInArray('done',title,desc);

            document.getElementById(cardId).remove();
            let item = createItemElement(cardId,title,desc);
            itemListWrapper.append(item);
        })
    
    
        // 2. From Completed -> ToDo
        const dropzone= cardContainer;
    
        function itemDragStartHandler(event){
                event.dataTransfer.setData('text/plain',event.target.id);
                event.dataTransfer.effectAllowed='move';   
        }
        dropzone.addEventListener('dragover',function (event){
            event.preventDefault();
            event.dataTransfer.dropEffect='allowed';
    
        })
        dropzone.addEventListener('drop',function (event){
            event.preventDefault();
            let itemId=event.dataTransfer.getData('text/plain');
            let title=document.getElementById(itemId).childNodes[0].innerText;
            let desc=document.getElementById(itemId).childNodes[1].innerText;
            document.getElementById(itemId).remove();
            const newCard=createCardElement(title,desc);
            dropzone.append(newCard);

            removeElementInArray('done',title,desc);
            addElementInArray('todo',title,desc);
        })
    
    
    
    // persisting the data using local storage
    // create card/Items using saved data
    let todoArr=[{title:'Task1', desc:'This is about task1'},{title:'Task2', desc:'This is about task2'}];
    localStorage.setItem('todo',JSON.stringify(todoArr));
    let cardData=JSON.parse(localStorage.getItem('todo'));
    cardData.map(({title,desc}) => {
        let card=createCardElement(title,desc);
        cardContainer.append(card);
    })

    let doneArr=[{title:'Task3', desc:'This is about completed task3'},{title:'Task4', desc:'This is about completed task4'}];
    localStorage.setItem('done',JSON.stringify(doneArr));
    let itemData=JSON.parse(localStorage.getItem('done'));
    itemData.map(({title,desc},index) => {
        let cardId=`item${index}`;
        console.log(cardId);
        let item=createItemElement(cardId,title,desc);
        itemListWrapper.append(item);
    })
