import React, {Component} from 'react';
import axios from 'axios'

class List extends Component {
constructor(){
    super()
    this.state = {
        itemText: "",
        itemsArray: []
    }
}

componentDidMount(){
    axios.get('/todos')
    .then(response => this.setState({itemsArray: response.data}))
}

textHandler(e){
this.setState({itemText: e.target.value})
}

addItem(item, e){
e.preventDefault()

    axios.post('/addtodo?item='+item)
    .then(response => this.setState({itemsArray: response.data}))
    e.target.reset()
}

deleteItem(id){
    axios.delete('/deleteitem/'+id)
    .then(response => this.setState({itemsArray: response.data}))
}

render() {
    console.log(this.state)
    const itemList = this.state.itemsArray.map((item, ind) => (
        <div className="items" style={{transform: `rotate(${Math.random()*360}deg)`}} key={ind}><button onClick={()=>this.deleteItem(ind)}>{item}</button></div>
    ))
return(
<div>
    <form onSubmit={(e) => this.addItem(this.state.itemText, e)}>
    <input type="text" onChange={(e) => this.textHandler(e)}/>
    <input type="submit"/>
        </form>
<div className="itemflex">
    {itemList}
    </div>
</div>
)}
}
export default List