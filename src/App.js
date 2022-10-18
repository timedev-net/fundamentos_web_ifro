import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ github }) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${github}`);
      setData(res.data);
    } catch (error) {
      if (error) alert("Usuário não encontrado!");
    }
  };

  return !data ? (
    <div className="App-header">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="github">Digite seu usuário do Github</label>
        <input
          id="github"
          {...register("github", { required: true })}
          className="form_input"
        />
        {errors.github && <span>Preencha o campo corretamente!</span>}
        <button type="submit" className="form_button">
          Pesquisar
        </button>
      </form>
      <img src={logo} alt="logo" className="App-logo" />
      <p>
        Conheça o poder do{" "}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
      </p>
    </div>
  ) : (
    <div className="App-header">
      <button
        type="button"
        className="App-button"
        onClick={() => setData(null)}
      >
        Limpa tela
      </button>
      <img src={data.avatar_url} alt="foto perfil" className="foto" />
      <p>{data.name}</p>
      <a
        className="App-link"
        href="https://docs.google.com/forms/d/e/1FAIpQLSfhPSSuCXRZFAoxf4EZDmRoCZVsreYg8uDeLfZwz0x9cTt8pQ/viewform"
        target="_blank"
      >
        Aprenda React
      </a>
    </div>
  );
}

export default App;
