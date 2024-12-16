const { default: puppeteer } = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/:Linha", async (req, res) => {
  const { Linha } = req.params;

  try {
    async function horarioOnibus() {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // Navega até a URL
      await page.goto(
        `https://www.urbs.curitiba.pr.gov.br/horario-de-onibus/${Linha}`
      );

      // Retorna todas as divs com a classe "DIATIL"
      const horariosDiaUtil = await page.evaluate(() => {
        const elementos = document.querySelectorAll(".DIATIL"); // Pega todos os elementos com a classe 'DIATIL'

        return Array.from(elementos).map((elemento) => {
          const texto = elemento.textContent
            .trim()
            .replace(/\s+/g, " ")
            .replace(/\n/g, " ");

          const pontoMatch = texto.match(/^Ponto: (.*?) Válido/); // Captura o nome do ponto
          const horariosMatch = texto.match(
            /DIA ÚTIL(.*?)(Os horários sublinhados|$)/
          ); // Captura os horários
          const ponto = pontoMatch ? pontoMatch[1].trim() : null;
          const horarios = horariosMatch
            ? horariosMatch[1].trim().split(" ")
            : [];

          return { ponto, horarios }; // Retorna o ponto e os horários
        });
      });
      const horarioSabado = await page.evaluate(() => {
        const elementos = document.querySelectorAll(".SBADO");

        return Array.from(elementos).map((elemento) => {
          const texto = elemento.textContent
            .trim()
            .replace(/\s+/g, " ")
            .replace(/\n/g, " ");
          const pontoMatch = texto.match(/^Ponto: (.*?) Válido/); // Captura o nome do ponto
          const horariosMatch = texto.match(
            /SÁBADO(.*?)(Os horários sublinhados|$)/
          ); // Captura os horários
          const ponto = pontoMatch ? pontoMatch[1].trim() : null;
          const horarios = horariosMatch
            ? horariosMatch[1].trim().split(" ")
            : [];

          return { ponto, horarios }; // Retorna o ponto e os horários
        });
      });
      const horarioDomingo = await page.evaluate(() => {
        const elementos = document.querySelectorAll(".DOMINGO");

        return Array.from(elementos).map((elemento) => {
          const texto = elemento.textContent
            .trim()
            .replace(/\s+/g, " ")
            .replace(/\n/g, " ");
          const pontoMatch = texto.match(/^Ponto: (.*?) Válido/); // Captura o nome do ponto
          const horariosMatch = texto.match(
            /SÁBADO(.*?)(Os horários sublinhados|$)/
          ); // Captura os horários
          const ponto = pontoMatch ? pontoMatch[1].trim() : null;
          const horarios = horariosMatch
            ? horariosMatch[1].trim().split(" ")
            : [];

          return { ponto, horarios }; // Retorna o ponto e os horários
        });
      });
      // Retorna o nome da linha
      const nomeLinha = await page.evaluate(() => {
        const elemento = document.querySelector(".left.schedule");
        return elemento ? elemento.textContent.trim() : null;
      });
      const validadeHorario = await page.evaluate(() => {
        const elemento = document.querySelector(".grey.margin0");
        return elemento ? elemento.textContent.trim() : null;
      });

      // Fecha o navegador
      await browser.close();

      return {
        nomeLinha,
        horariosDiaUtil,
        validadeHorario,
        horarioSabado,
        horarioDomingo,
      }; // Retorna o nome da linha, os horários e o ponto
    }

    // Chama a função e obtém o resultado
    const resultado = await horarioOnibus();

    // Envia o resultado como resposta
    res.send({
      success: true,
      message: "Processado com sucesso",
      data: resultado,
    });
  } catch (error) {
    // Lida com erros e envia uma resposta de erro
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
