import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState(null);
  const [newUser, setNewUser] = useState({ name: '' });
  const [updatedNames, setUpdatedNames] = useState({});
  //const [errorMsg, setErrorMsg] = useState({});
  // Below function performs the POST operation when called
  const addUser = () => {
    fetch('http://127.0.0.1:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          // Here we call fetchdata to retrieve the updated data!

          fetchData();
        } else {
          console.log('Error updating users');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Below function performs the GET operation when called 
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/api/users', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching data');
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const updateUser = (userId) => {
    fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedNames[userId] }), // Use the updatedName for the specific user
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Fetch data again to reflect the changes
        } else {
          // If the response is not ok, parse the response body as JSON
          return response.json().then((errorData) => {
            // Throw an error with the error message from the server
            //setErrorMsg(errorData.message);
            alert(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteUser = (userId) => {
    fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Fetch data again to reflect the changes
        } else {
          console.log('Error deleting the user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App-header">
      <div className="Post">
        <p>This is where post operation is performed:</p>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <div className="PUT and Delete">
        
        {data ? (
          <ul>
            <h2>Displayed Data</h2>


            {}
            <p>In the input field you type the updated name you want for your user</p>
            {Object.keys(data.users).map((userId) => (
              <li key={userId}>
                id: {userId} {}
                Name: {data.users[userId].name}
                <input
                  type="text"
                  value={updatedNames[userId] || ''}
                  onChange={(e) =>
                    setUpdatedNames({
                      ...updatedNames,
                      [userId]: e.target.value,
                    })
                  }
                  placeholder="Name"
                />
                <button onClick={() => updateUser(userId)}>Update</button>
                <button onClick={() => deleteUser(userId)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          'Loading...'
        )}
      </div>

    </div>
  );
};

export default Home;
