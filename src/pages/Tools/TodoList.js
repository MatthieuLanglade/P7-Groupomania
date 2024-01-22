import React, { useState } from 'react';
import Events from '../../components/Social/Events';
import Navigation from '../../components/Navigation';
import UserSumUp from '../../components/User/UserSumUp';
import CreateTodo from '../../components/TodoList/CreateTodo';
import ShowTodoList from '../../components/TodoList/ShowTodoList'

const TodoList = ({feed, updateFeed}) => {
    // States 
    // const [todoUpdate, setTodoUpdate] = useState(true) // MAJ de la liste 

    // Constante identifications
    let token = localStorage.getItem('token') // Token utilisateur [req.auth]
    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                    <div id='todolist'>
                    <CreateTodo
                        feed={feed} 
                        updateFeed={updateFeed}
                        token={token}
                    />
                    <ShowTodoList 
                        feed={feed} 
                        updateFeed={updateFeed}
                        token={token}/>
                        </div>
                </div>
                <div className="right-container">
                    {/* <Search /> */}
                    <UserSumUp />
                    <Events />
                </div>    
            </div>
        </div>
    );
};

export default TodoList;