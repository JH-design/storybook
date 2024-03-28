import React from 'react';

class CalculationApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      result: '',
      isNegative: false,
    };
  }

  handleInputChange = (event, inputName) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9-]/g, '');
    const parsedValue = sanitizedValue.startsWith('-') ? `-${sanitizedValue.replace(/-/g, '')}` : sanitizedValue;

    // 음수 입력 여부 확인
    const isNegative = parsedValue.startsWith('-');

    this.setState({ [inputName]: parsedValue, isNegative });
  };

  handleCalculate = () => {
    const { num1, num2, isNegative } = this.state;

    // 숫자 변환 및 NaN 체크
    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);
    if (Number.isNaN(parsedNum1) || Number.isNaN(parsedNum2)) {
      this.setState({ result: '두 입력값 모두 정수여야 합니다.' });
      return;
    }

    // 음수 표시 처리
    const firstNum = isNegative ? parsedNum1 : parsedNum2;
    const secondNum = isNegative ? parsedNum2 : parsedNum1;

    // 사칙연산 결과 계산 및 문자열 변환
    const sum = (firstNum + secondNum).toString();
    const difference = (firstNum - secondNum).toString();
    const product = (firstNum * secondNum).toString();
    const quotient = (firstNum / secondNum).toString();

    const results = `
      ${firstNum} + ${secondNum} = ${sum}\n
      ${firstNum} - ${secondNum} = ${difference}\n
      ${firstNum} * ${secondNum} = ${product}\n
      ${firstNum} / ${secondNum} = ${quotient}
    `;

    this.setState({ result: results, isNegative: false });
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
