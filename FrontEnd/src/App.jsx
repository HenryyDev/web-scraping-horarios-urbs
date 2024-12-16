import { useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import BarraPesquisa from './BarraDpesquisa';

export default function App() {
  const [linha, setLinha] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);

  // Função para separar os horários em 4 colunas
  const separarHorariosEm4Colunas = (horarios) => {
    if (!horarios || !Array.isArray(horarios)) {
      console.error('Horários não encontrados ou formato inválido:', horarios);
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
    axios.get(`http://web-scraping-horarios-urbs-production.up.railway.app/${linha}`)
      .then((response) => {
        console.log("Resposta da API:", response.data);  // Verifique a resposta para depuração
  
        const horariosDiaUtil = response.data.data.horariosDiaUtil; // A chave correta é horariosDiaUtil
        const horarioSabado = response.data.data.horarioSabado; // Horários de Sábado
        const horarioDomingo = response.data.data.horarioDomingo; // Horários de Domingo
  
        // Verifique se a resposta de horários existe e é um array
        if (horariosDiaUtil && Array.isArray(horariosDiaUtil)) {
          // Se os dados de horários existirem, processa cada ponto e seus horários
          const horariosSeparadosDiaUtil = horariosDiaUtil.map(item => {
            return {
              ponto: item.ponto,
              horarios: separarHorariosEm4Colunas(item.horarios) // Chama a função de separação de horários
            };
          });
  
          // Processamento para Sábado e Domingo
          const horariosSeparadosSabado = horarioSabado ? horarioSabado.map(item => ({
            ponto: item.ponto,
            horarios: separarHorariosEm4Colunas(item.horarios),
          })) : [];

          const horariosSeparadosDomingo = horarioDomingo ? horarioDomingo.map(item => ({
            ponto: item.ponto,
            horarios: separarHorariosEm4Colunas(item.horarios),
          })) : [];
  
          const validadeHorario = response.data.data.validadeHorario;

          // Expressão regular para separar a data e o texto "DIA ÚTIL"
          const regex = /Válido a partir de:\s*(\d{2}\/\d{2}\/\d{4})\s*(DIA ÚTIL)/;

          // Aplica a regex na string `validadeHorario`
          const match = validadeHorario.match(regex);

          // Se houver correspondência, separa a data e o texto
          const validadeData = match ? match[1] : null; // Pega a data
          const diaUtil = match ? match[2] : null; // Pega "DIA ÚTIL"
          const nomeLinha = response.data.data.nomeLinha;
          
          // Armazena o resultado no estado
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
          // Caso a resposta não contenha horários válidos
          setResultado(null);
          setErro("Não há horários disponíveis ou formato inválido.");
        }
      })
      .catch((error) => {
        setResultado(null);
        setErro("Erro ao buscar os dados. Verifique o servidor ou a linha informada.");
        console.error(error);
      });
  };

  return (
    <div className="container my-4">
      <div className="row d-flex align-items-center justify-content-center mb-4">
        <div className="col-md-6">  {/* Ajuste a largura do campo conforme necessário */}
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
          <h2 className='mt-5'>{resultado.nome}</h2>
          <h3>{resultado.validade.diaUtil}</h3>
          

          {/* Horários de Dia Útil */}
          {resultado.horariosDiaUtil.map((item, index) => (
            <div key={index}>
              <h3 className="my-5">Ponto: {item.ponto} - Dia Útil</h3>
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)', // Cria 4 colunas
                  gap: '10px', // Espaço entre as colunas
                }}
              >
                {item.horarios.map((coluna, colIndex) => (
                  <div key={colIndex}>
                    <div className="card">
                      <div className="card-body">
                        <ul className="list-group">
                          {coluna.length === 0 || coluna === null ? (
                            <li className="list-group-item text-center text-muted">Sem horários disponíveis</li>
                          ) : (
                            coluna.map((horario, idx) => (
                              <li key={idx} className="list-group-item">
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
          {resultado.horarioSabado && resultado.horarioSabado.map((item, index) => (
            <div key={index}>
              <h3 className="my-5">Ponto: {item.ponto} - Sábado</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)', // Cria 4 colunas
                  gap: '10px', // Espaço entre as colunas
                }}
              >
                {item.horarios.map((coluna, colIndex) => (
                  <div key={colIndex}>
                    <div className="card">
                      <div className="card-body">
                        <ul className="list-group">
                          {coluna.length === 0 || coluna === null ? (
                            <li className="list-group-item text-center text-muted">Sem horários disponíveis</li>
                          ) : (
                            coluna.map((horario, idx) => (
                              <li key={idx} className="list-group-item">
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
          {resultado.horarioDomingo && resultado.horarioDomingo.map((item, index) => (
            <div key={index}>
              <h3 className="my-5">Ponto: {item.ponto} - Domingo</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)', // Cria 4 colunas
                  gap: '10px', // Espaço entre as colunas
                }}
              >
                {item.horarios.map((coluna, colIndex) => (
                  <div key={colIndex}>
                    <div className="card">
                      <div className="card-body">
                        <ul className="list-group">
                          {coluna.length === 0 || coluna === null ? (
                            <li className="list-group-item text-center text-muted">Sem horários disponíveis</li>
                          ) : (
                            coluna.map((horario, idx) => (
                              <li key={idx} className="list-group-item">
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
  );
}
