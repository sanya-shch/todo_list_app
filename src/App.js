import React from 'react';
import uuid from "uuid";

import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export default class App extends React.Component {

    state = {
        items: [],
        id: uuid(),
        item: "",
        item_old: "",
        editItem: false
    };

    handleChange = e => {
        this.setState({
            item: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        if(this.state.item !== ""){
            const newItem = {
                id: this.state.id,
                title: this.state.item
            };

            const updatedItems = [...this.state.items, newItem];

            this.setState({
                items: updatedItems,
                item: "",
                item_old: "",
                id: uuid(),
                editItem: false
            });
        }else if(this.state.item === "" && this.state.editItem){
            const newItem = {
                id: this.state.id,
                title: this.state.item_old
            };

            const updatedItems = [...this.state.items, newItem];

            this.setState({
                items: updatedItems,
                item: "",
                item_old: "",
                id: uuid(),
                editItem: false
            });
        }
    };

    clearList = () => {
        this.setState({
            items: []
        });
    };

    handleDelete = id => {
        const filteredItems = this.state.items.filter(item => item.id !== id);
        this.setState({
            items: filteredItems
        });
    };

    handleEdit = id => {
        const filteredItems = this.state.items.filter(item => item.id !== id);
        const selectedItem = this.state.items.find(item => item.id === id);

        this.setState({
            items: filteredItems,
            item: selectedItem.title,
            item_old: selectedItem.title,
            editItem: true,
            id: id
        });
    };

    componentDidMount = () => {
        const items = JSON.parse(localStorage.getItem("todoApp")) || [];
        this.setState({ items });
    };

    componentDidUpdate = () => {
        localStorage.setItem("todoApp", JSON.stringify(this.state.items))
    };

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-8 mt-4">
                        <h3 className="text-center">TODO APP</h3>
                        <TodoInput
                            item={this.state.item}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            editItem={this.state.editItem}
                        />
                        {
                            this.state.items.length !== 0 &&
                                <TodoList
                                    items={this.state.items}
                                    clearList={this.clearList}
                                    handleDelete={this.handleDelete}
                                    handleEdit={this.handleEdit}
                                />
                        }
                    </div>
                </div>
            </div>
        );

    }

}
