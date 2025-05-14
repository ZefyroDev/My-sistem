let xpAtual = 0;

function nivelAtual(xpAtual) {
    let xpMin = 0;
    let xpMax = 0;
    let indice1 = 0;
    let indice2 = 1;
    let lv = 0;
    while (xpMax < xpAtual) {
        xpMin += 82 * indice1;
        xpMax += 82 * indice2;
        indice1++;
        indice2++;
        lv++;
    }
    let tamanhoBarra = Math.floor(((xpAtual - xpMin) * 100) / (xpMax - xpMin));
    let status = {
        xpMin,
        xpAtual,
        xpMax,
        tamanhoBarra,
        lv
    };
    localStorage.setItem("personagem", JSON.stringify(status));

    return status;
}

let buttonXp = document
    .getElementById("medir-xp")
    .addEventListener("click", () => {
        let progress = document.getElementById("progress");
        let level = document.getElementById("status-level");
        let xp = document.getElementById("xp");
        xpAtual += 1000;
        let status = nivelAtual(xpAtual);
        progress.style.width = status.tamanhoBarra + "%";
        xp.innerText = `${xpAtual} / ${status.xpMax}`;
        level.innerText = `Level ${status.lv}`;
    });

document.addEventListener("DOMContentLoaded", () => {
    let progress = document.getElementById("progress");
    let level = document.getElementById("status-level");
    let xp = document.getElementById("xp");
    let personagem = JSON.parse(localStorage.getItem("personagem"));
    console.log({ personagem });
    if (personagem) {
        xpAtual = personagem.xpAtual;
        progress.style.width = personagem.tamanhoBarra + "%";
        xp.innerText = `${personagem.xpAtual} / ${personagem.xpMax}`;
        level.innerText = `Level ${personagem.lv}`;
    } else {
        console.log("Nada");
    }
});
let salvarMd = document
    .getElementById("salvar-md")
    .addEventListener("click", () => {
        personagem = JSON.parse(localStorage.getItem("personagem"));

        const textoMd = `
# Meu Personagem

- **Level:** ${personagem.lv}
- **XP Atual:** ${personagem.xpAtual}
- **XP Mínimo:** ${personagem.xpMin}
- **XP Máximo:** ${personagem.xpMax}
- **Barra de Progresso:** ${personagem.tamanhoBarra}%
`.trim();

        const blob = new Blob([textoMd], { type: "text/markdown" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "personagem.md";
        link.click();
    });