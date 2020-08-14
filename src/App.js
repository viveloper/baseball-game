import GuessInputControl from './GuessInputControl';
import Baseball from './Baseball';

class App {
  constructor() {
    const queryString = new URLSearchParams(location.search);
    this.digit = queryString.get('digit');
    this.inputControl = new GuessInputControl('#guess', {
      callback: this.handleGuess.bind(this),
      digitNumber: this.digit,
    });
    this.baseball = new Baseball(this.digit);
    console.log(this.baseball.problem);
    this.resultsContainerEl = document.querySelector('.result-container');
  }

  handleGuess(values, error) {
    if (error) {
      alert(error.message);
      return;
    }
    const result = this.baseball.getResult(values);
    this.resultsContainerEl.insertAdjacentHTML('beforeend', this.createResultEl(values, result.toString()));
    if (result.isDone()) {
      alert('정답을 맞추었습니다!');
      this.resetGame();
    }
  }

  resetGame() {
    this.inputControl.disable('정답을 맞추었습니다!');
  }

  createResultEl(guess, result) {
    return `<li class="list-group-item">
              <span class="guess">${guess.join(' ')}</span>
              <span class="badge result">${result}</span>
            </li>`;
  }
}

new App();
