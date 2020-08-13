class GuessInputControl {
  constructor(containerSelector, { callback = function () {}, digitNumber = 3 } = {}) {
    this.inputEl = document.querySelector(containerSelector);

    if (this.inputEl == null) {
      throw Error('컨테이너 아이디를 찾을 수 없습니다.');
    }

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        const values = Array.from(e.target.value).map((v) => Number(v));
        if (values.length != digitNumber) {
          callback([], new Error('자릿수가 맞지 않습니다!'));
          return;
        }
        callback(values);
        this.clear();
        return;
      }
    });
  }

  clear() {
    this.inputEl.value = '';
  }
}

class App {
  constructor() {
    const queryString = new URLSearchParams(location.search);
    this.digit = queryString.get('digit');
    this.inputControl = new GuessInputControl('#guess', {
      callback: this.handleGuess.bind(this),
      digitNumber: this.digit,
    });
  }

  handleGuess(values, error) {
    if (error) {
      alert(error.message);
      return;
    }
    console.log(values);
  }
}

const app = new App();
