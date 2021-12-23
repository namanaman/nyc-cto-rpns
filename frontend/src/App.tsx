import './App.css';
import '@trussworks/react-uswds/lib/uswds.css';
import '@trussworks/react-uswds/lib/index.css';
import SubscribeForm from './SubscribeForm';

const PETS_IMG_URL = "https://media.istockphoto.com/photos/british-short-hair-cat-and-golden-retriever-picture-id992637094?k=20&m=992637094&s=612x612&w=0&h=TsroJcfNHlnIuOsoyosl-NQJITGHAnI79ROvHU7lPs8=";

function App() {
  return (
    <>
      <header className="padding-x-3">
        <h1>
          NYC Rescued Pet Notification Service 🐾
        </h1>
      </header>
      <main className="main bg-base-lightest">
        <section className="padding-3">
          <h2>
            Is your pet missing? Get notified if the city finds them!
          </h2>
          <ul>
            <li>
              <strong>What is the Rescued Pet Notification Service (RPNS)? </strong>
              The RPNS is provided by New York City's Department for the
              Protection of Pets (DPP). If you ever lose your pet and we find them, we will send you an email to let you know.
            </li>
            <li>
              <strong>Am I eligible? </strong>
              Any resident of New York City with pets can sign up for free.
            </li>
            <li>
              <strong>How do I sign up? </strong>
              Fill out and submit the adjacent form and you will be automatically be subscribed for notifications if your pet is found.
            </li>
          </ul>
          <div className="pets-image margin-3">
            <img alt="Dog and cat snuggling" src={PETS_IMG_URL} />
          </div>
        </section>
        <section className="signup margin-3 padding-2 bg-white">
          <SubscribeForm />
        </section>
      </main>
    </>
  );
}

export default App;