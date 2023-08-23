import "./App.css";

// eslint-disable-next-line react/prop-types
export function TwitterFollowCard({ username, name }) {
  const imageSrc = `https://us.123rf.com/450wm/djvstock/djvstock1608/djvstock160803163/60730710-chico-avatar-persona-personas-icono-de-la-gente-ilustraci%C3%B3n-aislada-y-plana-gr%C3%A1fico-vectorial.jpg`;
  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img className="tw-followCard-avatar" src={imageSrc} alt="Avatar" />
        <div className="tw-followCard-info">
          <strong>{name}</strong>
          <span className="tw-followCard-infoUserName">{username}</span>
        </div>
      </header>
      <aside>
        <button className="tw-followCard-button">Seguir</button>
      </aside>
    </article>
  );
}
