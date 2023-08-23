import "./App.css";

import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

// eslint-disable-next-line react/prop-types
export function App() {
  return (
    <section className="App">
      <TwitterFollowCard username="@anthony.loyaga" name="Anthony Loyaga" isFollowing />
      <TwitterFollowCard username="@anthony.loyaga" name="Anthony Loyaga" isFollowing />
      <TwitterFollowCard username="@anthony.loyaga" name="Anthony Loyaga"  isFollowing/>
    </section>
  );
}
