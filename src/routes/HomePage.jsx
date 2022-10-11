import { BigSidebar, Chat, SmallSidebar } from '../components/layouts';

const HomePage = () => {
  return (
    <main className="page-100">
      <div className="d-flex">
        <BigSidebar />
        <SmallSidebar />
        <Chat />
      </div>
    </main>
  );
};
export default HomePage;
