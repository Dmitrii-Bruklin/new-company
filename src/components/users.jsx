import React, {useState} from "react";
import api from "../api"

const Users= ()=> {
    const [users,setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
      setUsers(prevState => prevState.filter(user =>user._id !== userId))
    };
    const renderPhrase = (number) => {
          if (number > 4)
          return <h2><span className="badge bg-primary">{number} человек тусанут с тобой сегодня</span></h2>
          if (number <= 4 && number > 1)
          return <h2><span className="badge bg-primary">{number} человека тусанут с тобой сегодня</span></h2>
          if (number === 1)
          return <h2><span className="badge bg-primary">{number} человек тусанёт с тобой сегодня</span></h2>
          if (number === 0) 
          return <h2><span class="badge bg-secondary bg-danger">Никто с тобой не тусанёт</span></h2>
    };
    return(
      <>
      
      {renderPhrase(users.length)}
      {users.length > 0 && (
          <div>
  <table className="table">
<thead>
  <tr >
    <th scope="col">Имя</th>
    <th scope="col">Качества</th>
    <th scope="col">Профессии</th>
    <th scope="col">Встретился, раз</th>
    <th scope="col">Оценка</th>
  </tr>
</thead>
<tbody>
  {users.map((user)=>(
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.qualities.map((quality)=>(
       <span className={`badge m-1 bg-${quality.color}`} key={quality._id}>{quality.name}</span>
      ))}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <button 
      className="badge bg-danger"
      onClick={()=>handleDelete(user._id)}>delete</button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
      )}
      </>
    )
    
}

export default Users;