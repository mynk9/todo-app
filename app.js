const inputt= document.querySelector('#add');
const addTodo = document.querySelector('.btn');
const list = document.querySelector('.box');



const generateTemplate = (todo,id) => {
    const html = `<li class="box-1 " data-id="${id}"> 
                    <h4>${todo}</h4>
                    <i class="fas fa-trash fa-lg color"></i>
                    </li>`;

    list.innerHTML += html;
}

const deletetodo = (id) =>{
    const todos = document.querySelectorAll('li');
    todos.forEach((todo) => {
        if (todo.getAttribute('data-id') === id) {
            todo.remove();
        }
    });
}

db.collection('todos').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if (change.type === 'added') {
            const jdata= doc.data();
            generateTemplate(jdata.todo,doc.id);
        }else if(change.type === 'removed'){
            deletetodo(doc.id);
        }
        
    });
});



addTodo.addEventListener('click', (e)=>{
    e.preventDefault();
    const todo = {todo:inputt.value};

    db.collection('todos').add(todo).then(() => {console.log('recipe added')});
    inputt.value = "";
});


list.addEventListener('click', (e) => {
    if (e.target.classList.contains('color')) {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('todos').doc(id).delete().then(()=> {console.log('recipe deleted')});
    }
});

