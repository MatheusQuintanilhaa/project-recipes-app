import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [data, setData] = useState('');
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem('user'));
    // if (!getData) return history.push('/');
    setData(getData);
  }, [history]);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <div>
        <Header title="Profile" searchIcon={ false } />

        <p data-testid="profile-email">{data?.email}</p>
        <button
          onClick={ () => history.push('/done-recipes') }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          onClick={ () => history.push('/favorite-recipes') }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes

        </button>
        <button
          onClick={ logout }
          data-testid="profile-logout-btn"
        >
          Logout

        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
