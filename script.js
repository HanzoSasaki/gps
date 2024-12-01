function getLocation() {
    const locationElement = document.getElementById("location");
    const mapElement = document.getElementById("map");
  
    if (navigator.geolocation) {
      locationElement.textContent = "Obtendo localização...";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Exibe latitude e longitude
          locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
  
          // Exibe mapa
          const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
          mapElement.innerHTML = `<iframe width="100%" height="400" src="${mapUrl}" frameborder="0"></iframe>`;
        },
        (error) => {
          locationElement.textContent = `Erro ao obter localização: ${error.message}`;
        }
      );
    } else {
      locationElement.textContent = "Geolocalização não é suportada pelo navegador.";
    }
  }
  


function getLocation() {
   
   
   
    const locationElement = document.getElementById("location");
    const mapElement = document.getElementById("map");
  
    if (navigator.geolocation) {
      locationElement.textContent = "Obtendo localização...";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Exibe latitude e longitude
          locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
  
          // Exibe mapa
          const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
          mapElement.innerHTML = `<iframe width="100%" height="400" src="${mapUrl}" frameborder="0"></iframe>`;
  
          // Envia os dados ao backend
          fetch("http://localhost:3000/save-location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          })
            .then((response) => response.text())
            .then((data) => console.log(data))
            .catch((error) => console.error("Erro ao salvar localização:", error));
        },
        (error) => {
          locationElement.textContent = `Erro ao obter localização: ${error.message}`;
        }
      );
    } else {
      locationElement.textContent = "Geolocalização não é suportada pelo navegador.";
    }
  }
  document.getElementById("phoneForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recarregar a página
  
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const resultDiv = document.getElementById("result");
  
    // Verifica se o número tem 11 dígitos
    if (!/^\d{11}$/.test(phoneNumber)) {
      resultDiv.style.display = "block";
      resultDiv.innerHTML = "Por favor, insira um número válido com 11 dígitos (Ex: 11987654321).";
      return;
    }
  
    // Extrai o DDD e os 2 primeiros dígitos do número para identificar a operadora
    const ddd = phoneNumber.substring(0, 2);
    const operatorPrefix = phoneNumber.substring(2, 4);
  
    // Mapeamento de DDDs (exemplo)
    const dddMap = {
      "11": "São Paulo",
      "12": "Vale do Paraíba e Litoral Norte",
      "13": "Baixada Santista e Litoral Sul",
      "14": "Centro-Oeste Paulista (Bauru, Marília, Botucatu)",
      "15": "Sorocaba e Região",
      "16": "Ribeirão Preto e Araraquara",
      "17": "São José do Rio Preto e Região",
      "18": "Presidente Prudente e Oeste Paulista",
      "19": "Campinas e Região Metropolitana",
      "21": "Rio de Janeiro",
      "31": "Minas Gerais",
     
    };
  
    const operatorMap = {
    "65": "Vivo", "66": "Vivo", "67": "Vivo", "81": "Vivo", "82": "Vivo", 
    "83": "Vivo", "84": "Vivo", "85": "Vivo", "86": "Vivo", "87": "Vivo", 
    "88": "Vivo", "89": "Vivo", "96": "Vivo", "97": "Vivo", "98": "Vivo", "99": "Vivo",
    "91": "Claro", "92": "Claro", "93": "Claro", "94": "Claro", "95": "Claro", 
    "96": "Claro", "97": "Claro", "98": "Claro", "99": "Claro",
    "41": "TIM", "42": "TIM", "43": "TIM", "44": "TIM", "45": "TIM", 
    "46": "TIM", "51": "TIM", "52": "TIM", "53": "TIM", "54": "TIM", 
    "55": "TIM", "56": "TIM", "57": "TIM", "58": "TIM", "59": "TIM", 
    "61": "TIM", "62": "TIM", "63": "TIM", "64": "TIM",
    "31": "Oi", "32": "Oi", "33": "Oi", "34": "Oi", "35": "Oi", 
    "36": "Oi", "37": "Oi", "38": "Oi", "39": "Oi", "71": "Oi", 
    "72": "Oi", "73": "Oi", "74": "Oi", "75": "Oi", "76": "Oi", 
    "77": "Oi", "78": "Oi", "79": "Oi",
      
    };
  
    const region = dddMap[ddd] || "DDD desconhecido";
    const operator = operatorMap[operatorPrefix] || "Operadora desconhecida";
  
    // Exibe o resultado
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
      <p><strong>DDD:</strong> ${ddd} (${region})</p>
      <p><strong>Operadora:</strong> ${operator}</p>
    `;
  });


document.getElementById("sendMessage").addEventListener("click", function () {
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
  
    if (!/^\d{11}$/.test(phoneNumber)) {
      alert("Por favor, insira um número válido com 11 dígitos.");
      return;
    }
  
    // Mensagem personalizada
    const message = encodeURIComponent(
      "Você está sendo rastreado por sua segurança. Caso tenha dúvidas, entre em contato com o Professor Erick ou a direção."
    );
  
    // Adiciona o código do país para o WhatsApp (Brasil: +55)
    const whatsappNumber = `55${phoneNumber}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  
    // Abre o WhatsApp Web em uma nova aba
    window.open(whatsappUrl, "_blank");
  });