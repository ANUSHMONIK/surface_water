function analyzeWater() {
    let temp = parseFloat(document.getElementById('temp').value);
    let solids = parseFloat(document.getElementById('solids').value);
    let turbidity = parseFloat(document.getElementById('turbidity').value);
    let ph = parseFloat(document.getElementById('ph').value);
    let resultDiv = document.getElementById('result');

    if (isNaN(temp) || isNaN(solids) || isNaN(turbidity) || isNaN(ph)) {
        resultDiv.innerHTML = "<strong style='color: red;'>Error: Please enter valid numeric values.</strong>";
        resultDiv.style.display = "block";
        return;
    }

    let indianPotable = (ph >= 6.5 && ph <= 8.5) && (solids <= 500) && (turbidity <= 5);
    let intlPotable = (ph >= 6.5 && ph <= 8.5) && (solids <= 1000) && (turbidity <= 5);

    let indiaStatus = indianPotable ? "✅ Portable" : "❌ Not Portable";
    let intlStatus = intlPotable ? "✅ Portable" : "❌ Not Portable";

    let healthRisks = [];
    if (!indianPotable || !intlPotable) {
        if (ph < 6.5 || ph > 8.5) healthRisks.push("Acidosis, Skin irritation, Gastrointestinal issues");
        if (solids > 1000) healthRisks.push("Kidney stones, Hypertension, Digestive problems");
        if (turbidity > 5) healthRisks.push("Diarrhea, Cholera, Dysentery");
    }

    let healthRiskText = healthRisks.length > 0 ? `<br><br><strong>⚠️ Health Risks:</strong> ${healthRisks.join(", ")}` : "";

    let icon = indianPotable && intlPotable ? 
        '<img src="https://img.icons8.com/emoji/50/check-mark-emoji.png" class="icon">' : 
        '<img src="https://img.icons8.com/emoji/50/warning-emoji.png" class="icon">';

    resultDiv.innerHTML = `
        ${icon}
        <strong>Indian Standard:</strong> <span class="${indianPotable ? 'safe' : 'unsafe'}">${indiaStatus}</span><br>
        <strong>International Standard:</strong> <span class="${intlPotable ? 'safe' : 'unsafe'}">${intlStatus}</span>
        ${healthRiskText}
    `;
    resultDiv.style.display = "block";
}
