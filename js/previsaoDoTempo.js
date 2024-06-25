
// Função para buscar dados da API
async function fetchDados() {
    const cep = document.getElementById('cep').value
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    try {
        const response = await fetch(apiUrl);
        const cepData = await response.json();
        displayCep(cepData);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }

    const lat = document.getElementById('latitude').value
    const lon = document.getElementById('longitude').value
    const apiUrlTempo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`

    try {
        const response2 = await fetch(apiUrlTempo)
        const previsaoTempo = await response2.json()
        displayTempo(previsaoTempo)
    } catch (error) {
        console.error('Erro ao buscar dados:', error)
    }
}

// Função para exibir os dados na página
function displayCep(cep) {
    document.getElementById('bairro').value = cep.bairro || '';
    document.getElementById('uf').value = cep.uf || '';
    document.getElementById('localidade').value = cep.localidade;
}

function displayTempo(tempo) {
    const hoje = new Date()
    const dia = hoje.getDate().toString().padStart(2,'0')
    const mes = String(hoje.getMonth() + 1).padStart(2,'0')
    const ano = hoje.getFullYear()
    const hora = hoje.getHours()
    const dataAtual = `${ano}-${mes}-${dia}T${hora}:00`

    var hourlyTime = tempo.hourly.time.indexOf(dataAtual)

    document.getElementById('temperatura').value = `${tempo.hourly.temperature_2m[hourlyTime]}${tempo.hourly_units.temperature_2m}`
}