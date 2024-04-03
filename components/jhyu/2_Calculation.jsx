import React from 'react';

class CalculationApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      result: '',
    };
  }

  handleInputChange = (event, inputName) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9-]/g, '');
    const parsedValue = sanitizedValue.startsWith('-') ? `-${sanitizedValue.replace(/-/g, '')}` : sanitizedValue;

    this.setState({ [inputName]: parsedValue });
  };

  handleCalculate = () => {
    const { num1, num2 } = this.state;

    // 숫자 변환 및 NaN 체크
    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);
    if (Number.isNaN(parsedNum1) || Number.isNaN(parsedNum2)) {
      this.setState({ result: '두 입력값 모두 정수여야 합니다.' });
      return;
    }

    // 사칙연산 결과 계산 및 문자열 변환
    const sum = (parsedNum1 + parsedNum2).toString();
    const difference = (parsedNum1 - parsedNum2).toString();
    const product = (parsedNum1 * parsedNum2).toString();
    const quotient = (parsedNum1 / parsedNum2).toString();

    const results = `
      ${num1} + ${num2} = ${sum}\n
      ${num1} - ${num2} = ${difference}\n
      ${num1} * ${num2} = ${product}\n
      ${num1} / ${num2} = ${quotient}
    `;

    this.setState({ result: results });
  };

  render() {
    const { num1, num2, result } = this.state;

    return (
      <div>
        <input
          type="text"
          value={num1}
          onChange={event => this.handleInputChange(event, 'num1')}
        />
        <input
          type="text"
          value={num2}
          onChange={event => this.handleInputChange(event, 'num2')}
        />
        <button
          type="button"
          onClick={this.handleCalculate}
        >
          계산하기
        </button>
        <pre>{result}</pre>
      </div>
    );
  }
}

export default CalculationApp;
