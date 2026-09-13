/**
 * TCS iON GATE Virtual Scientific Calculator Engine
 * Replica for GATE DA 2027 Aspirants
 */

(function () {
  'use strict';

  let currentInput = '0';
  let memoryValue = 0;
  let isRadian = true;
  let isInv = false;
  let isHyp = false;

  function formatDisplay(val) {
    if (typeof val === 'number') {
      if (isNaN(val) || !isFinite(val)) return 'Error';
      // Format cleanly up to 10 decimal digits
      let str = parseFloat(val.toPrecision(10)).toString();
      return str;
    }
    return val || '0';
  }

  function updateDisplay() {
    const disp = document.getElementById('calcDisplay');
    if (disp) disp.textContent = currentInput;
  }

  function getNumber() {
    try {
      return eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**'));
    } catch (e) {
      return parseFloat(currentInput) || 0;
    }
  }

  function setNumber(n) {
    currentInput = formatDisplay(n);
    updateDisplay();
  }

  // Factorial helper
  function fact(n) {
    if (n < 0 || n !== Math.floor(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  window.GateCalc = {
    init: function () {
      updateDisplay();
      
      const degRadio = document.getElementById('calcDeg');
      const radRadio = document.getElementById('calcRad');
      const invCheck = document.getElementById('calcInv');
      const hypCheck = document.getElementById('calcHyp');

      if (degRadio) degRadio.addEventListener('change', () => { isRadian = false; });
      if (radRadio) radRadio.addEventListener('change', () => { isRadian = true; });
      if (invCheck) invCheck.addEventListener('change', (e) => { 
        isInv = e.target.checked; 
        GateCalc.updateLabels();
      });
      if (hypCheck) hypCheck.addEventListener('change', (e) => { 
        isHyp = e.target.checked; 
        GateCalc.updateLabels();
      });
    },

    updateLabels: function () {
      const sinBtn = document.getElementById('btnSin');
      const cosBtn = document.getElementById('btnCos');
      const tanBtn = document.getElementById('btnTan');
      const lnBtn = document.getElementById('btnLn');
      const logBtn = document.getElementById('btnLog');

      if (sinBtn) sinBtn.textContent = isInv ? 'asin' : (isHyp ? 'sinh' : 'sin');
      if (cosBtn) cosBtn.textContent = isInv ? 'acos' : (isHyp ? 'cosh' : 'cos');
      if (tanBtn) tanBtn.textContent = isInv ? 'atan' : (isHyp ? 'tanh' : 'tan');
      if (lnBtn) lnBtn.textContent = isInv ? 'e^x' : 'ln';
      if (logBtn) logBtn.textContent = isInv ? '10^x' : 'log';
    },

    pressNum: function (d) {
      if (currentInput === '0' || currentInput === 'Error') {
        currentInput = d.toString();
      } else {
        currentInput += d.toString();
      }
      updateDisplay();
    },

    pressDot: function () {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
      }
    },

    pressOp: function (op) {
      const lastChar = currentInput.slice(-1);
      if (['+', '-', '×', '÷', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
      } else {
        currentInput += op;
      }
      updateDisplay();
    },

    clear: function () {
      currentInput = '0';
      updateDisplay();
    },

    backspace: function () {
      if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
      } else {
        currentInput = '0';
      }
      updateDisplay();
    },

    equals: function () {
      try {
        let expr = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/\^/g, '**')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E');
        let res = eval(expr);
        currentInput = formatDisplay(res);
      } catch (e) {
        currentInput = 'Error';
      }
      updateDisplay();
    },

    unary: function (fn) {
      let x = parseFloat(currentInput);
      let r = 0;

      // Degree conversion helper
      let radAngle = isRadian ? x : (x * Math.PI) / 180;

      switch (fn) {
        case 'sin':
          if (isInv) {
            r = Math.asin(x);
            if (!isRadian) r = (r * 180) / Math.PI;
          } else if (isHyp) {
            r = Math.sinh(x);
          } else {
            r = Math.sin(radAngle);
          }
          break;
        case 'cos':
          if (isInv) {
            r = Math.acos(x);
            if (!isRadian) r = (r * 180) / Math.PI;
          } else if (isHyp) {
            r = Math.cosh(x);
          } else {
            r = Math.cos(radAngle);
          }
          break;
        case 'tan':
          if (isInv) {
            r = Math.atan(x);
            if (!isRadian) r = (r * 180) / Math.PI;
          } else if (isHyp) {
            r = Math.tanh(x);
          } else {
            r = Math.tan(radAngle);
          }
          break;
        case 'ln':
          r = isInv ? Math.exp(x) : Math.log(x);
          break;
        case 'log':
          r = isInv ? Math.pow(10, x) : Math.log10(x);
          break;
        case 'sqrt':
          r = Math.sqrt(x);
          break;
        case 'cbrt':
          r = Math.cbrt(x);
          break;
        case 'sqr':
          r = x * x;
          break;
        case 'cube':
          r = x * x * x;
          break;
        case 'recip':
          r = 1 / x;
          break;
        case 'fact':
          r = fact(x);
          break;
        case 'abs':
          r = Math.abs(x);
          break;
        case 'neg':
          r = -x;
          break;
        case 'pi':
          r = Math.PI;
          break;
        case 'e':
          r = Math.E;
          break;
      }

      setNumber(r);
    },

    mem: function (action) {
      let x = parseFloat(currentInput) || 0;
      switch (action) {
        case 'MC': memoryValue = 0; break;
        case 'MR': setNumber(memoryValue); break;
        case 'MS': memoryValue = x; break;
        case 'M+': memoryValue += x; break;
        case 'M-': memoryValue -= x; break;
      }
    }
  };
})();
