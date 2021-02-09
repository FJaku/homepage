 import axios from 'axios'
 
 //Remove task by dragging into <i> trashcan icon
const removeTask = (event) => {
    event.preventDefault()
    var a = event.dataTransfer.getData("Text");
    var b = document.getElementById(a)
    b.classList.add('hidden') //Hide the removed task as not to mutate react state directly
    axios
        .delete(`http://localhost:3001/tasks/${a}`)
}

//Drag to trashcan to delete
const onDragOver = (event) => {
    event.preventDefault()
}

const onDragStart = (event) => {
    event.dataTransfer.setData("Text", event.target.id) //Get id of dragged element
    var x = document.getElementById('trash')
    x.classList.add('trashHighlight') //Highlight trashcan icon
}

const onDragEnd = (event) => {
    event.preventDefault()
    var x = document.getElementById('trash')
    x.classList.remove('trashHighlight') //Remove highlight from trashcan icon
}

export { removeTask, onDragOver, onDragStart, onDragEnd }