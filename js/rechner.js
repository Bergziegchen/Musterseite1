(function() {
    const initCalc = () => {
        const aSlider = document.getElementById('area-slider');
        const pSlider = document.getElementById('price-slider');
        const aVal = document.getElementById('area-val');
        const pVal = document.getElementById('price-val');
        const rMoney = document.getElementById('res-money');
        const rCo2 = document.getElementById('res-co2');

        if(!aSlider || !pSlider) return;

        const update = () => {
            const area = parseInt(aSlider.value);
            const price = parseFloat(pSlider.value);
            
            // UI Update
            aVal.textContent = area;
            pVal.textContent = price.toFixed(2);

            // Logik
            const kwhYear = area * 160; // Etwas konservativerer Wert
            const savings = Math.round(kwhYear * price);
            const co2 = Math.round(kwhYear * 0.45);

            rMoney.textContent = savings.toLocaleString('de-DE') + " €";
            rCo2.textContent = co2.toLocaleString('de-DE') + " kg";
        };

        aSlider.addEventListener('input', update);
        pSlider.addEventListener('input', update);
        update(); // Erstmaliger Aufruf
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalc);
    } else {
        initCalc();
    }
})();