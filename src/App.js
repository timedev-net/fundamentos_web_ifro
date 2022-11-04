/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
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
      console.log(res.data)
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
        style={{margin: 10}}
      >
        Limpa tela
      </button>
      <div className="card">
      <img src={data.avatar_url} alt="foto perfil" className="foto"/>
        <h3>{data.name}</h3>
        <p>{data.bio}</p>
        <table>
          <tr><td>Github: <a className="App-link" href={data.html_url} target="_blank">{data.html_url}</a></td></tr>
          <tr><td>Linkedin: <a className="App-link" href={data.blog} target="_blank">{data.blog}</a></td></tr>
        </table>
        <p></p>
        <p></p>
        <spam>Tem interesse em aprender mais sobre a tecnologia utilizada?</spam>
        <h5>
        <a className="App-link" href="https://docs.google.com/forms/d/e/1FAIpQLSfhPSSuCXRZFAoxf4EZDmRoCZVsreYg8uDeLfZwz0x9cTt8pQ/viewform" target="_blank">
          Inscreva-se 
        </a> na Oficina React
        </h5>
      </div>
    </div>
  );
}
 