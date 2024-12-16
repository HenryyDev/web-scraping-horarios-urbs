import React, { useState, useEffect, useRef } from "react";
import onibus from "../assets/frente-do-onibus.png";
import "./style.css";

const onibusData = [
  { bairro: "A. MUNHOZ / JD. BOTÂNICO", numero: "464" },
  { bairro: "ABAETÉ", numero: "226" },
  { bairro: "ABRANCHES", numero: "182" },
  { bairro: "ACRÓPOLE", numero: "332" },
  { bairro: "AGRÍCOLA", numero: "334" },
  { bairro: "ÁGUA VERDE", numero: "863" },
  { bairro: "AHÚ / LOS ANGELES", numero: "265" },
  { bairro: "ALFERES POLI", numero: "560" },
  { bairro: "ALIANÇA", numero: "232" },
  { bairro: "ALTO BOQUEIRÃO", numero: "629" },
  { bairro: "ALTO TARUMÃ", numero: "373" },
  { bairro: "ANITA GARIBALDI", numero: "245" },
  { bairro: "ARAGUAIA", numero: "311" },
  { bairro: "ATUBA / PINHEIRINHO", numero: "350" },
  { bairro: "AUGUSTA", numero: "823" },
  { bairro: "AUGUSTA/V. MARQUETO", numero: "820" },
  { bairro: "AUGUSTO STRESSER", numero: "361" },
  { bairro: "B. ALTO / BOA VISTA", numero: "342" },
  { bairro: "B. ALTO / STA. CÂNDIDA", numero: "341" },
  { bairro: "B. ALTO / STA. FELICIDADE", numero: "307" },
  { bairro: "BAIRRO NOVO", numero: "506" },
  { bairro: "BAIRRO NOVO A", numero: "541" },
  { bairro: "BAIRRO NOVO B", numero: "542" },
  { bairro: "BAIRRO NOVO B/C", numero: "524" },
  { bairro: "BAIRRO NOVO C", numero: "547" },
  { bairro: "BANESTADO / CALIFÓRNIA", numero: "231" },
  { bairro: "BARIGUI", numero: "862" },
  { bairro: "BARREIRINHA", numero: "205" },
  { bairro: "BARREIRINHA / SÃO JOSÉ", numero: "206" },
  { bairro: "BIGORRILHO", numero: "875" },
  { bairro: "BOA VISTA / BARREIRINHA", numero: "225" },
  { bairro: "BOM RETIRO / PUC", numero: "175" },
  { bairro: "BOQUEIRÃO", numero: "503" },
  { bairro: "BOQUEIRÃO / C. CÍVICO", numero: "505" },
  { bairro: "BOQUEIRÃO/PINHEIRINHO", numero: "528" },
  { bairro: "BOSCH", numero: "627" },
  { bairro: "BRACATINGA", numero: "170" },
  { bairro: "BRF / COPEL", numero: "X43" },
  { bairro: "BUTIATUVINHA", numero: "913" },
  { bairro: "BUTIATUVINHA/ OURO VERDE", numero: "948" },
  { bairro: "C. BELEM / S. FILHO", numero: "516" },
  { bairro: "C. COMPRIDO / C. RASO", numero: "828" },
  { bairro: "C. COMPRIDO / CIC", numero: "826" },
  { bairro: "C. MÚSICA / V. ALEGRE", numero: "150" },
  { bairro: "C. RASO / C. DO SIQUEIRA", numero: "027" },
  { bairro: "C. RASO / CAIUÁ", numero: "658" },
  { bairro: "C. RASO / CAMP. SIQUEIRA", numero: "024" },
  { bairro: "CABRAL / OSÓRIO", numero: "207" },
  { bairro: "CABRAL / PORTÃO", numero: "216" },
  { bairro: "CABRAL / PQ.TANGUÁ", numero: "177" },
  { bairro: "CAIUÁ", numero: "703" },
  { bairro: "CAIUA / C.COMPRIDO", numero: "732" },
  { bairro: "CAIUA/CACHOEIRA", numero: "702" },
  { bairro: "CAIUA/FAZ/CENTRO", numero: "706" },
  { bairro: "CAJURU", numero: "386" },
  { bairro: "CAMARGO", numero: "322" },
  { bairro: "CAMP. SIQUEIRA / BATEL", numero: "801" },
  { bairro: "CAMP. SIQUEIRA / STA.FELICIDADE", numero: "816" },
  { bairro: "CAMPO ALEGRE", numero: "654" },
  { bairro: "CANAL BELÉM", numero: "475" },
  { bairro: "CARBOMAFRA", numero: "628" },
  { bairro: "CASA DE CUSTÓDIA", numero: "668" },
  { bairro: "CASSIOPÉIA", numero: "224" },
  { bairro: "CAXIMBA / OLARIA", numero: "659" },
  { bairro: "CENTENÁRIO", numero: "305" },
  { bairro: "CENTENÁRIO / BOQUEIRÃO", numero: "335" },
  { bairro: "CENTENÁRIO / C. COMPRIDO", numero: "303" },
  { bairro: "CENTENÁRIO / HAUER", numero: "338" },
  { bairro: "CENTENÁRIO / RUI BARBOSA", numero: "302" },
  { bairro: "CENTRO POLITÉCNICO", numero: "469" },
  { bairro: "CIC/CABRAL", numero: "210" },
  { bairro: "CIRCULAR SUL (ANTI-HORÁRIO)", numero: "602" },
  { bairro: "CIRCULAR SUL (HORÁRIO)", numero: "502" },
  { bairro: "COLINA VERDE", numero: "211" },
  { bairro: "COLOMBO / CIC", numero: "607" },
  { bairro: "COMPLEXO INDUSTRIAL", numero: "722" },
  { bairro: "COTOLENGO", numero: "778" },
  { bairro: "CRISTO REI", numero: "385" },
  { bairro: "DALAGASSA", numero: "681" },
  { bairro: "DETRAN / VIC. MACHADO", numero: "380" },
  { bairro: "DOM ÁTICO", numero: "662" },
  { bairro: "E. VERÍSSIMO / PANTANAL", numero: "533" },
  { bairro: "EMÍLIO ROMANI", numero: "723" },
  { bairro: "ERASTO GAERTNER", numero: "465" },
  { bairro: "ESPECIAL B.ALTO / C.IMBUIA", numero: "X45" },
  { bairro: "ESPECIAL BOQUEIRÃO", numero: "X12" },
  { bairro: "ESPECIAL CABRAL / C. IMBUIA", numero: "X42" },
  { bairro: "ESTRIBO AHÚ", numero: "266" },
  { bairro: "ESTUDANTES", numero: "466" },
  { bairro: "F. NORONHA / LARANJEIRAS", numero: "275" },
  { bairro: "FANNY", numero: "621" },
  { bairro: "FAZENDINHA", numero: "701" },
  { bairro: "FAZENDINHA / C. COMPRIDO", numero: "720" },
  { bairro: "FAZENDINHA / C.RASO", numero: "831" },
  { bairro: "FAZENDINHA / PORTÃO", numero: "611" },
  { bairro: "FAZENDINHA / PUC", numero: "614" },
  { bairro: "FAZENDINHA/CAIUÁ-B.VISTA", numero: "724" },
  { bairro: "FERNÃO DIAS", numero: "821" },
  { bairro: "FORMOSA", numero: "673" },
  { bairro: "FUTURAMA", numero: "639" },
  { bairro: "FUTURAMA / S. CERCADO", numero: "683" },
  { bairro: "GABINETO", numero: "822" },
  { bairro: "GANCHINHO", numero: "642" },
  { bairro: "GRAMADOS", numero: "625" },
  { bairro: "GUILHERMINA", numero: "561" },
  { bairro: "HAUER / BOQUEIRÃO", numero: "513" },
  { bairro: "HIGIENÓPOLIS", numero: "371" },
  { bairro: "HUGO LANGE", numero: "374" },
  { bairro: "IGUAPE I", numero: "523" },
  { bairro: "IGUAPE II", numero: "515" },
  { bairro: "INTER 2 (ANTI-HORÁRIO)", numero: "023" },
  { bairro: "INTER 2 (HORÁRIO)", numero: "022" },
  { bairro: "INTERBAIRROS I (ANTI-HORÁRIO)", numero: "011" },
  { bairro: "INTERBAIRROS I (HORÁRIO)", numero: "010" },
  { bairro: "INTERBAIRROS II (ANTI-HORÁRIO)", numero: "021" },
  { bairro: "INTERBAIRROS II (HORÁRIO)", numero: "020" },
  { bairro: "INTERBAIRROS III", numero: "030" },
  { bairro: "INTERBAIRROS IV", numero: "040" },
  { bairro: "INTERBAIRROS V", numero: "050" },
  { bairro: "INTERBAIRROS VI", numero: "060" },
  { bairro: "ITAMARATI", numero: "512" },
  { bairro: "ITATIAIA", numero: "711" },
  { bairro: "ITUPAVA / HOSP. MILITAR", numero: "366" },
  { bairro: "JD. CENTAURO", numero: "468" },
  { bairro: "JD. CHAPARRAL", numero: "183" },
  { bairro: "JD. DA ORDEM", numero: "655" },
  { bairro: "JD. DO ARROIO", numero: "244" },
  { bairro: "JD. ESPLANADA", numero: "865" },
  { bairro: "JD. INDEPENDÊNCIA / CIC", numero: "712" },
  { bairro: "JD. IPÊ", numero: "917" },
  { bairro: "JD. ITÁLIA", numero: "972" },
  { bairro: "JD. ITIBERÊ", numero: "474" },
  { bairro: "JD. KOSMOS", numero: "169" },
  { bairro: "JD. LUDOVICA", numero: "617" },
  { bairro: "JD. MERCÊS / GUANABARA", numero: "160" },
  { bairro: "JD. SOCIAL / BATEL", numero: "365" },
  { bairro: "JD.PARANAENSE", numero: "532" },
  { bairro: "JOSÉ CULPI", numero: "912" },
  { bairro: "JÚLIO GRAF", numero: "967" },
  { bairro: "LIGEIRÃO BOQUEIRÃO", numero: "500" },
  { bairro: "LIGEIRÃO NORTE / SUL", numero: "250" },
  { bairro: "LIGEIRÃO PINHEIRINHO / C. GOMES", numero: "550" },
  { bairro: "LINDÓIA", numero: "661" },
  { bairro: "LONDRINA", numero: "635" },
  { bairro: "LUIZ NICHELE", numero: "641" },
  { bairro: "MAD. ABRANCHES", numero: "189" },
  { bairro: "MAD. BAIRRO NOVO", numero: "549" },
  { bairro: "MAD. BOQUEIRÃO", numero: "509" },
  { bairro: "MAD. CAIUÁ", numero: "789" },
  { bairro: "MAD. CAMPO COMPRIDO", numero: "809" },
  { bairro: "MAD. CENTENÁRIO", numero: "309" },
  { bairro: "MAD. CENTENÁRIO / RUI BARBOSA", numero: "308" },
  { bairro: "MAD. CIC", numero: "609" },
  { bairro: "MAD. PENHA / F. NORONHA", numero: "229" },
  { bairro: "MAD. PETRÓPOLIS / SOLITUDE", numero: "489" },
  { bairro: "MAD. PILARZINHO / UBERABA", numero: "188" },
  { bairro: "MAD. S. CÂNDIDA / C. RASO", numero: "209" },
  { bairro: "MAD. S. FRANCISCO / IGUAPE", numero: "519" },
  { bairro: "MAD. S. PEDRO / R. NEGRO", numero: "689" },
  { bairro: "MAD. SÃO BRÁZ", numero: "889" },
  { bairro: "MAD. STA. FELICIDADE", numero: "989" },
  { bairro: "MAD. TARUMÃ / AUGUSTA", numero: "389" },
  { bairro: "MAD. TATUQUARA", numero: "679" },
  { bairro: "MAD. V. VELHA", numero: "788" },
  { bairro: "MAL. HERMES / STA. EFIGÊNIA", numero: "260" },
  { bairro: "MARIA ANGÉLICA", numero: "633" },
  { bairro: "MARINGÁ", numero: "522" },
  { bairro: "MÁRIO JORGE", numero: "721" },
  { bairro: "MATEUS LEME", numero: "181" },
  { bairro: "MERCÚRIO", numero: "331" },
  { bairro: "MONTANA", numero: "812" },
  { bairro: "MORADIAS PQ. IGUAÇU", numero: "553" },
  { bairro: "MOSSUNGUÊ", numero: "814" },
  { bairro: "NATAL PQ. BARIGUI", numero: "X50" },
  { bairro: "NATAL PQ. NÁUTICO", numero: "X51" },
  { bairro: "NIVALDO BRAGA", numero: "521" },
  { bairro: "NOVENA", numero: "360" },
  { bairro: "NOVO MUNDO", numero: "666" },
  { bairro: "NSA. SRA. DA LUZ", numero: "674" },
  { bairro: "NSA.SRA.DE NAZARÉ", numero: "280" },
  { bairro: "OLARIA", numero: "233" },
  { bairro: "OSTERNACK / BOQUEIRÃO", numero: "535" },
  { bairro: "OSTERNACK / S. CERCADO", numero: "548" },
  { bairro: "OSTERNACK / S. CERCADO L.D.", numero: "520" },
  { bairro: "OURO VERDE (VIA VL.BÁDIA)", numero: "915" },
  { bairro: "PAINEIRAS", numero: "272" },
  { bairro: "PALMEIRA", numero: "640" },
  { bairro: "PALOTINOS", numero: "387" },
  { bairro: "PARÁÍSO", numero: "343" },
  { bairro: "PARIGOT DE SOUZA", numero: "534" },
  { bairro: "PARQUE ATUBA", numero: "237" },
  { bairro: "PARQUE INDUSTRIAL", numero: "623" },
  { bairro: "PARQUE NÁUTICO", numero: "529" },
  { bairro: "PARQUE TANGUÁ", numero: "176" },
  { bairro: "PASSAÚNA", numero: "911" },
  { bairro: "PASSAÚNA / JD.IPÊ", numero: "928" },
  { bairro: "PETRÓPOLIS", numero: "462" },
  { bairro: "PINHAIS / C. COMPRIDO", numero: "304" },
  { bairro: "PINHEIRINHO", numero: "638" },
  { bairro: "PINHEIRINHO / CIC", numero: "644" },
  { bairro: "PINHEIRINHO/CABRAL", numero: "700" },
  { bairro: "PINHEIRINHO/RUI BARBOSA", numero: "603" },
  { bairro: "PINHEIROS", numero: "916" },
  { bairro: "PINHEIROS / JOSÉ CULPI", numero: "958" },
  { bairro: "PIRATINI / BR-476", numero: "631" },
  { bairro: "PIRINEUS", numero: "649" },
  { bairro: "POMPEIA/JANAINA", numero: "646" },
  { bairro: "PORTÃO", numero: "671" },
  { bairro: "PORTÃO / CIC", numero: "612" },
  { bairro: "PORTAO / STA.BERNADETHE", numero: "616" },
  { bairro: "PORTAO/SITIO CERCADO", numero: "X20" },
  { bairro: "PORTO BELO", numero: "718" },
  { bairro: "POSIVILLE / INC", numero: "832" },
  { bairro: "PQ. LAGO AZUL", numero: "794" },

  { bairro: "PRIMAVERA", numero: "171" },
  { bairro: "PUC/RODOFERROVIARIA", numero: "518" },
  { bairro: "QUARTEL GENERAL", numero: "632" },
  { bairro: "RAPOSO TAVARES", numero: "168" },
  { bairro: "REF. GUADALUPE / FAZENDINHA", numero: "X36" },
  { bairro: "REFORÇO PINHEIRINHO", numero: "X08" },
  { bairro: "REFORÇO SABARÁ", numero: "X41" },
  { bairro: "REFORÇO TUBO BARIGUI", numero: "X02" },
  { bairro: "REFORÇO TUIUTI", numero: "815" },
  { bairro: "RIO BONITO", numero: "684" },
  { bairro: "RIO BONITO / CIC", numero: "685" },
  { bairro: "RIO BONITO (SEMI-DIRETO)", numero: "X38" },
  { bairro: "RIO NEGRO", numero: "636" },
  { bairro: "RIVIERA", numero: "827" },
  { bairro: "RONDON", numero: "622" },
  { bairro: "R.PRADO/C.GOMES", numero: "164" },
  { bairro: "RURBANA", numero: "680" },
  { bairro: "S. CERCADO / C. RASO", numero: "610" },
  { bairro: "SABARÁ", numero: "653" },
  { bairro: "SAGRADO CORAÇÃO", numero: "375" },
  { bairro: "SAMBAQUI", numero: "552" },
  { bairro: "SÃO BENEDITO", numero: "236" },
  { bairro: "SÃO BERNARDO", numero: "965" },
  { bairro: "SÃO BRAZ", numero: "870" },
  { bairro: "SÃO FRANCISCO", numero: "511" },
  { bairro: "SÃO JOÃO", numero: "213" },
  { bairro: "SÃO JORGE", numero: "670" },
  { bairro: "SATURNO / VENEZA", numero: "817" },
  { bairro: "SAVÓIA", numero: "876" },
  { bairro: "SITIO CERCADO / C. RASO", numero: "X11" },
  { bairro: "SÍTIO CERCADO (ANTI-HORÁRIO)", numero: "508" },
  { bairro: "SÍTIO CERCADO (HORÁRIO)", numero: "507" },
  { bairro: "SOLAR", numero: "212" },
  { bairro: "SOLITUDE", numero: "463" },
  { bairro: "STA. AMÉLIA", numero: "713" },
  { bairro: "STA. BARBARA", numero: "461" },
  { bairro: "STA. CÂNDIDA / C. RASO", numero: "203" },
  { bairro: "STA. CRUZ", numero: "620" },
  { bairro: "STA. FELICIDADE", numero: "901" },
  { bairro: "STA. FELICIDADE / PCA.TIRADENTES", numero: "902" },
  { bairro: "STA. FELICIDADE / STA. CÂNDIDA", numero: "924" },
  { bairro: "STA. GEMA", numero: "274" },
  { bairro: "STA. INÊS", numero: "531" },
  { bairro: "STA. JOANA", numero: "637" },
  { bairro: "STA. QUITÉRIA", numero: "760" },
  { bairro: "STA. RITA / CIC", numero: "619" },
  { bairro: "STA. RITA / PINH. (SEMI DIRETO)", numero: "X37" },
  { bairro: "STA. RITA / PINHEIRINHO", numero: "650" },
  { bairro: "STA. TEREZINHA", numero: "243" },
  { bairro: "STA.AMELIA/P.BELO", numero: "710" },
  { bairro: "TARUMÃ", numero: "372" },
  { bairro: "TATUQUARA / CENTRO", numero: "707" },
  { bairro: "TEQUALY", numero: "864" },
  { bairro: "TEQUALY/QUARTEL GENERAL", numero: "600" },
  { bairro: "TINGUI", numero: "214" },
  { bairro: "TRABALHADOR", numero: "545" },
  { bairro: "TRAMONTINA", numero: "861" },
  { bairro: "TRINDADE", numero: "321" },
  { bairro: "TUPY/JULIANA", numero: "772" },
  { bairro: "TURISMO", numero: "979" },
  { bairro: "UBERABA", numero: "472" },
  { bairro: "UBERLÂNDIA", numero: "615" },
  { bairro: "UMBARÁ", numero: "643" },
  { bairro: "UNIV.POSITIVO", numero: "829" },
  { bairro: "V. AUTÓDROMO", numero: "323" },
  { bairro: "V. CUBAS", numero: "663" },
  { bairro: "V. ESPERANÇA", numero: "222" },
  { bairro: "V. IZABEL", numero: "761" },
  { bairro: "V. JULIANA", numero: "690" },
  { bairro: "V. LEONICE", numero: "242" },
  { bairro: "V. MACEDO VIA GUABIROTUBA", numero: "477" },
  { bairro: "V. MARQUETO", numero: "825" },
  { bairro: "V. NORI", numero: "166" },
  { bairro: "V. RENO", numero: "336" },
  { bairro: "V. REX", numero: "665" },
  { bairro: "V. ROSINHA", numero: "762" },
  { bairro: "V. SANDRA", numero: "860" },
  { bairro: "V. SÃO PAULO", numero: "471" },
  { bairro: "V. SÃO PEDRO", numero: "624" },
  { bairro: "V. SUIÇA", numero: "184" },
  { bairro: "V. VELHA", numero: "777" },
  { bairro: "V. VELHA/BURITI", numero: "779" },
  { bairro: "V. VERDE", numero: "652" },
  { bairro: "VITÓRIA RÉGIA", numero: "630" },
  { bairro: "VIZINHANÇA/STA. RITA", numero: "773" },
  { bairro: "XAXIM / CAPÃO RASO", numero: "657" },
  { bairro: "ZOOLÓGICO", numero: "536" },
];

function BarraPesquisa({ setLinha }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasFocus, setHasFocus] = useState(false); // Para controlar o foco do input
  const inputRef = useRef(null); // Referência para o input

  // Lógica para filtrar os dados conforme o termo de pesquisa
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData([]); // Se o campo de pesquisa estiver vazio, não mostra nada
    } else {
      const filtered = onibusData.filter(
        (item) =>
          item.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.numero.toString().includes(searchTerm)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm]); // Executa a filtragem sempre que `searchTerm mudar`

  useEffect(() => {
    // Adiciona o evento de scroll para fazer o input perder o foco
    const handleScroll = () => {
      if (inputRef.current && document.activeElement === inputRef.current) {
        inputRef.current.blur(); // Remove o foco ao rolar a página
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove o eventListener quando o componente for desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsTyping(true);
  };

  // Detecta quando o input perde o foco
  const handleBlur = () => {
    setTimeout(() => {
      // Usando `setTimeout` para garantir que o clique na lista seja processado antes de o input perder o foco
      setHasFocus(false);
      setIsTyping(false); // Também para a filtragem ao perder o foco
    }, 100);
  };

  // Detecta quando o input recebe o foco
  const handleFocus = () => {
    setHasFocus(true);
  };

  // Função que lida com o clique em um item da lista
  const handleItemClick = (item) => {
    setLinha(item.numero);
    setSearchTerm(`${item.bairro} - ${item.numero}`);
    setFilteredData([]); // Fecha a lista ao selecionar um item
    setIsTyping(false); // Para de exibir a lista
    inputRef.current.focus(); // Garante que o input continua com foco após selecionar
  };

  return (
    <>
      <div>
        <input
          className="form-control"
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Digite o número ou nome da linha"
          style={{
            width: "400px",
          }}
        />

        {/* Exibe a lista de resultados apenas quando o campo tem foco e o usuário está digitando */}
        {hasFocus && isTyping && filteredData.length > 0 && (
          <ul className="ul-linha" style={{ paddingLeft: 0 }}>
            {filteredData.slice(0, 10).map((item, index) => (
              <li
                className="li-linha"
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  listStyle: "none",
                  marginBottom: "5px",
                  marginLeft: "10px",
                }}
                onClick={() => handleItemClick(item)} // Lida com o clique
              >
                <img
                  src={onibus}
                  height={"20px"}
                  style={{ marginRight: "15px" }}
                  alt=""
                />
                {item.bairro} - {item.numero}
              </li>
            ))}
          </ul>
        )}

        {/* Exibe mensagem se não houver resultados */}
        {hasFocus && isTyping && filteredData.length === 0 && (
          <p className="my-2" style={{ color: "red" }}>
            Nenhuma linha de ônibus encontrada
          </p>
        )}
      </div>
    </>
  );
}

export default BarraPesquisa;
