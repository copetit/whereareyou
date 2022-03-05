import { Header } from './Header';
import { Map } from './MainPage/Map';
import { PostingButton } from './Parts/Button';

export function Main() {
  return (
    <div id="container">
      <Header />
      <Map />
      <PostingButton />
    </div>
  );
}
