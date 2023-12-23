const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el))




fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const userIp = data.ip;
    console.log(userIp);
    return fetch(`https://ipapi.co/${userIp}/currency/`);
  })
  .then(response => response.text())
  .then(countryCurrency => {
    console.log(countryCurrency);
    return fetch('https://cdn.moneyconvert.net/api/latest.json')
      .then(response => response.json())
      .then(data => {
        const exchangeRate = data.rates[countryCurrency]; // Get the exchange rate
        const T1priceInUSD = document.getElementById('t1-price').textContent; // Your price in USD
        const T2priceInUSD = document.getElementById('t2-price').textContent; // Your price in USD
        const T3priceInUSD = document.getElementById('t3-price').textContent; // Your price in USD

        const T1localPrice = T1priceInUSD * exchangeRate; // Convert the price
        const T2localPrice = T2priceInUSD * exchangeRate; // Convert the price
        const T3localPrice = T3priceInUSD * exchangeRate; // Convert the price

        let T1localPriceRounded = Math.round(T1localPrice * 100) / 100;
        let T2localPriceRounded = Math.round(T2localPrice * 100) / 100;
        let T3localPriceRounded = Math.round(T3localPrice * 100) / 100;

        document.getElementById('t1-price').textContent = T1localPriceRounded;
        document.getElementById('t2-price').textContent = T2localPriceRounded;
        document.getElementById('t3-price').textContent = T3localPriceRounded;

        document.getElementById('t1-price-code').textContent = countryCurrency;
        document.getElementById('t2-price-code').textContent = countryCurrency;
        document.getElementById('t3-price-code').textContent = countryCurrency;

        console.log(`T1 Price in ${countryCurrency}: ${T1localPrice}`);
        console.log(`T2 Price in ${countryCurrency}: ${T2localPrice}`);
        console.log(`T3 Price in ${countryCurrency}: ${T3localPrice}`);
      });
  });




