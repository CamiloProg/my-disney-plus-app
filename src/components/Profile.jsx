import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to view profile.</p>
      )}
    </div>
  );
};

export default Profile;
