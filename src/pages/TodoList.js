import Events from '../components/Events';
import Navigation from '../components/Navigation';
import UserSumUp from '../components/User/UserSumUp';
import ShowTodoList from '../components/TodoList/ShowTodoList'

const TodoList = () => {
    return (
        <div >
            <div className="main-container">
                <div className="top-container">
                    <Navigation />
                </div>
                <div className="content-container">
                    <ShowTodoList />
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