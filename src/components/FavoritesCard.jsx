

const FavoritesCard = ({ favorites, removeFavorite }) => (
  <div className="favorites-card">
    <h2>Favorite Cities</h2>
    <ul className="favorites-list">
      {favorites.map((fav, index) => (
        <li key={index}>
          <p>{fav}</p>
          <button onClick={() => removeFavorite(fav)}>Remove</button>
        </li>
      ))}
    </ul>
  </div>
);

export default FavoritesCard;
