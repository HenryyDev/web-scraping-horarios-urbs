import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import BarraPesquisa from "./components/BarraDpesquisa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import onibus from "./assets//frente-do-onibus.png";
import "./components/style.css";
export default function App() {
  const [linha, setLinha] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);

  // Função para separar os horários em 4 colunas
  const separarHorariosEm4Colunas = (horarios) => {
    if (!horarios || !Array.isArray(horarios)) {
      console.error("Horários não encontrados ou formato inválido:", horarios);
      return [[], [], [], []]; // Retorna colunas vazias caso o formato não seja válido
    }

    const colunas = [[], [], [], []]; // Inicializa 4 colunas vazias

    // Distribui os horários nas 4 colunas
    horarios.forEach((horario, index) => {
      colunas[index % 4].push(horario); // Adiciona o horário na coluna correta
    });

    return colunas;
  };
  const busca = () => {
    const toastId = toast.info("Carregando...", {
      autoClose: false,
      closeOnClick: false,
    });
    // https://web-scraping-horarios-urbs-production.up.railway.app
    axios
      .get(
        `http://localhost:3000/${linha}`
      )
      .then((response) => {
        toast.dismiss(toastId);

        const horariosDiaUtil = response.data.data.horariosDiaUtil;
        const horarioSabado = response.data.data.horarioSabado;
        const horarioDomingo = response.data.data.horarioDomingo;

        if (horariosDiaUtil && Array.isArray(horariosDiaUtil)) {
          // Processamento dos horários
          const horariosSeparadosDiaUtil = horariosDiaUtil.map((item) => ({
            ponto: item.ponto,
            horarios: separarHorariosEm4Colunas(item.horarios),
          }));

          const horariosSeparadosSabado = horarioSabado
            ? horarioSabado.map((item) => ({
                ponto: item.ponto,
                horarios: separarHorariosEm4Colunas(item.horarios),
              }))
            : [];

          const horariosSeparadosDomingo = horarioDomingo
            ? horarioDomingo.map((item) => ({
                ponto: item.ponto,
                horarios: separarHorariosEm4Colunas(item.horarios),
              }))
            : [];

          const validadeHorario = response.data.data.validadeHorario;
          const regex =
            /Válido a partir de:\s*(\d{2}\/\d{2}\/\d{4})\s*(DIA ÚTIL)/;
          const match = validadeHorario.match(regex);
          const validadeData = match ? match[1] : null;
          const diaUtil = match ? match[2] : null;
          const nomeLinha = response.data.data.nomeLinha;

          // Armazenando o resultado no estado
          setResultado({
            horariosDiaUtil: horariosSeparadosDiaUtil,
            horarioSabado: horariosSeparadosSabado,
            horarioDomingo: horariosSeparadosDomingo,
            validade: {
              data: validadeData,
              diaUtil: diaUtil,
            },
            nome: nomeLinha,
          });

          setErro(null);
        } else {
          // Caso não haja horários válidos
          setResultado(null);
          toast.error("Não há horários disponíveis ou formato inválido.");
        }
      })
      .catch((error) => {
        // Fecha o toast de "Carregando..." em caso de erro
        toast.dismiss(toastId);

        // Mostra o erro no toast
        setResultado(null);
        ("Erro ao buscar os dados. Verifique o servidor ou a linha informada.");
        console.error(error);

        // Exibe um toast de erro
        toast.error("Erro ao buscar os dados.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-4">
        <div className="row d-flex align-items-center justify-content-center mb-4">
          <div className="col-md-6">
            <div className="d-flex">
              <BarraPesquisa setLinha={setLinha} />
              <div>
                <button onClick={busca} className="btn btn-primary ms-2">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        {resultado && (
          <div>
            <div className="d-flex mt-5">
              <img
                src={onibus}
                alt=""
                height={"40px"}
                style={{ marginRight: "20px" }}
              />
              <h2>{resultado.nome}</h2>
            </div>

            {/* Horários de Dia Útil */}
            {resultado.horariosDiaUtil.map((item, index) => (
              <div key={index}>
                <h3 className="my-5">Ponto: {item.ponto} - Dia Útil</h3>
                <div className="grid-horario">
                  {item.horarios.map((coluna, colIndex) => (
                    <div key={colIndex}>
                      <div className="card">
                        <div className="card-body card-horario">
                          <ul className="list-group ">
                            {coluna.length === 0 || coluna === null ? (
                              <li className="li-horario list-group-item text-center text-muted">
                                Sem horários disponíveis
                              </li>
                            ) : (
                              coluna.map((horario, idx) => (
                                <li
                                  key={idx}
                                  className="li-horario list-group-item"
                                  
                                >
                                  {horario}
                                </li>
                                
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Horários de Sábado */}
            {resultado.horarioSabado &&
              resultado.horarioSabado.map((item, index) => (
                <div key={index}>
                  <h3 className="my-5">Ponto: {item.ponto} - Sábado</h3>
                  <div className="grid-horario">
                    {item.horarios.map((coluna, colIndex) => (
                      <div key={colIndex}>
                        <div className="card">
                          <div className="card-body card-horario">
                            <ul className="list-group ">
                              {coluna.length === 0 || coluna === null ? (
                                <li className="li-horario list-group-item text-center text-muted">
                                  Sem horários disponíveis
                                </li>
                              ) : (
                                coluna.map((horario, idx) => (
                                  <li key={idx} className="li-horario list-group-item">
                                    {horario}
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* Horários de Domingo */}
            {resultado.horarioDomingo &&
              resultado.horarioDomingo.map((item, index) => (
                <div key={index}>
                  <h3 className="my-5">Ponto: {item.ponto} - Domingo</h3>
                  <div className="grid-horario">
                    {item.horarios.map((coluna, colIndex) => (
                      <div key={colIndex}>
                        <div className="card">
                          <div className="card-body card-horario">
                            <ul className="list-group ">
                              {coluna.length === 0 || coluna === null ? (
                                <li className="li-horario list-group-item text-center text-muted">
                                  Sem horários disponíveis
                                </li>
                              ) : (
                                coluna.map((horario, idx) => (
                                  <li key={idx} className="li-horario list-group-item">
                                    {horario}
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
