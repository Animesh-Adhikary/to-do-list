import React, { useState, useEffect } from 'react'
import "./todoStyly.css"

const getLocalStorage = () =>{
    const localData = localStorage.getItem("todolist");
    if(localData)
        return JSON.parse(localData);
    else
        return [];
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStorage());

    const addItem = () => {
        if (!inputData)
            alert("Please Insert Item");
        else {
            const newItemData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };

            setItems([...items, newItemData]);
            setInputData("");
        }
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((curObj) => {
            if (curObj.id !== id)
                return curObj;
        })
        setItems(updatedItems);
    }

    const editItem = (id) => {
        const newUpdatedItems = items.filter((curObj) => {
            if (curObj.id !== id)
                return curObj;
        });
        const goForEdit = items.find((curObj)=>{
            if(curObj.id === id)
                return curObj;
        })
        setInputData(goForEdit.name);

        setItems(newUpdatedItems);
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todologo.jpg" alt="todoLogo" />
                        <figcaption>Add Your List Here ✌️</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder='✍️ Add Item'
                            className='form-control'
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)} />

                        <i class="fa fa-solid fa-plus add-btn" onClick={() => addItem()}></i>
                    </div>

                    {
                        items.map((curObj) => {
                            return (
                                <div className='showItems' key={curObj.id}>
                                    <div className="eachItem" >
                                        <h3>{curObj.name}</h3>
                                        <div className="todo-btn">
                                            <i class="fa-solid fa-edit add-btn" onClick={() => editItem(curObj.id)}></i>
                                            <i class="fa-solid fa-trash-alt add-btn" onClick={() => deleteItem(curObj.id)} ></i>
                                        </div>
                                    </div>
                                </div>

                            );
                        })
                    }
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo