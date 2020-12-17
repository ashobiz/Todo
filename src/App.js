import React, {Component} from "react";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      newItem : '',
      lists : ["Buy chocolates", "Clean cupboard", "Take baby for walk", "Download movies", "Pay broadband bill"],
      error : '',
      updateID : null,
      updateItem : '',
      isForUpdate : false
    }
  }

  // Set input value to state
  handleInput = (e, type="new")=>{
    if(type === "new"){
      this.setState({newItem: e.target.value})
    }else{
      this.setState({updateItem: e.target.value})
    }
  }

  // Add item
  addItem = () =>{
    // Item should be > 0 and less than 100
    if(this.state.newItem.length>0){
      if(this.state.newItem.length<100){        
        this.setState({lists : [...this.state.lists, this.state.newItem]})
        this.setState({newItem : ''})
        this.setState({error: ""})
      }else{
        // else throw error and set input field to blank
        this.setState({error: "Item length should be less than 100"})
        this.setState({newItem : ''})
      }
    }else{
      this.setState({error: "Please type something"})
    }
  }

  // update item
  updateItem = (e) =>{
    let key = this.state.updateID;
    // Item should be > 0 and less than 100
    if(this.state.updateItem.length>0){
      if(this.state.updateItem.length<100){        

        let list = [...this.state.lists]
        list[key] = this.state.updateItem;
        this.setState({lists : [...list]})

        this.cancelUpdate();
        this.setState({error: ""})
      }else{
        // else throw error and set input field to blank
        this.setState({error: "Item length should be less than 100"})
        this.cancelUpdate();
      }
    }else{
      this.setState({error: "Please type something"})
    }
  }

  // Cancel update
  cancelUpdate = ()=> {
    this.setState({updateID : null, updateItem : '', isForUpdate : false})
  }

  //Update item using key
  edit(i){
    this.setState({isForUpdate : true})
    this.setState({updateID : i})
    this.setState({updateItem : this.state.lists[i]})
  }

  // Delete item using key
  delete(i){
    // copying list to a new array
    let list = [...this.state.lists]
    let newList = list.filter((li)=> li !== list[i])
    this.setState({lists : [...newList]})
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Todo List</h1>
          <h2>{this.state.lists.length} Items</h2>
        </header>
        <div className="todos">

          {this.state.lists.length<1 ? 
          (<div className="no-item">
            No items
          </div>) : ''}
          
          <ul>

            {this.state.lists.map((list, i) =>{
              return (<li key={i+Math.random()}>
                        {list} 
                        <span onClick={() => this.edit(i)}> edit</span> 
                        <span onClick={() => this.delete(i)}> x</span>
                      </li>)
            })}

          </ul>
        </div>

        {this.state.error ? (
          <div className="error">
            {this.state.error}
          </div>
        ) : ''
        }

        {this.state.isForUpdate ? (
          <div className="input-item">
            <form onSubmit={(e) => e.preventDefault()} className="pure-form">
              <input 
                name="edit-item"
                className="input-field"
                value={this.state.updateItem}
                type="text"
                onChange={(e) => this.handleInput(e, 'update')}
              />
              <br />
              <input 
                className="input-btn pure-button btn-mt"
                type="submit"
                value="Update Item" 
                onClick={(e) => this.updateItem(e)}
              />
              <input 
                className="input-btn pure-button btn-mt"
                type="reset"
                value="Cancel" 
                onClick={() => this.cancelUpdate()}
              />
            </form>
            <br />
          </div>
        
        ) : ''        
        }
        
        <div className="input-item">
            <form onSubmit={(e) => e.preventDefault()} className="pure-form">
              <input 
                name="todo-item"
                className="input-field"
                value={this.state.newItem}
                type="text"
                onChange={(e) => this.handleInput(e)}
              />
              <input 
                className="input-btn pure-button"
                type="submit"
                value="Add Item" 
                onClick={() =>this.addItem()}
              />
            </form>
        </div>
        
      </div>
    )}
}

export default App;
