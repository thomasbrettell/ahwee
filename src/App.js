import { useState } from "react";
import MainWrapper from "./components/ui/MainWrapper/MainWrapper";
import Card from './components/ui/Card/Card'
import UserForm from "./components/UserForm/UserForm";
import User from './components/User/User'
import ModalOverlay from './components/ui/ModalOverlay/ModalOverlay'
import Modal from './components/Modal/Modal'

let initialUsers = [
  {name: 'John', age: 2},
  {name: 'Bob', age: 15},
  {name: 'Kevin', age: 35}
]

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setModal] = useState()

  const addUser = (user) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers.unshift(user);
      return updatedUsers;
    });
  }

  const invalidHandler = (invalid, message) => {
    if(invalid) {
      setModal(
        <ModalOverlay disableModal={invalidHandler}>
          <Modal message={message} />
        </ModalOverlay>
      )
    } else {
      setModal()
    }
  }

  return (
    <>
      <MainWrapper>
        <Card>
          <UserForm onAddUser={addUser} onInvalidSubmission={invalidHandler} />
        </Card>
        <Card>
          {users.map((user, index) => (
            <User key={index} user={user} />
          ))}
        </Card>
      </MainWrapper>
      {showModal}
    </>
  );
}

export default App;
