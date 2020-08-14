import GameResult from './GameResult';
import { getRandomInt } from './utils';

class Baseball {
  constructor(digit = 3) {
    this.digit = digit;
    this.problem = this.makeProblem(digit);
  }

  makeProblem() {
    // [Q-5] 이부분을 작성해 보세요!
    const answer = [];
    for (let i = 0; i < this.digit; i++) {
      let randomInt = getRandomInt(1, 9);
      while (answer.indexOf(randomInt) >= 0) {
        randomInt = getRandomInt(1, 9);
      }
      answer.push(randomInt);
    }

    return answer;
  }

  getResult(guess) {
    // [Q-6] 이부분을 작성해 보세요! GameResult를 반환해야 합니다.
    let strike = 0;
    let ball = 0;

    this.problem.forEach((v, i) => {
      if (guess[i] === v) {
        strike++;
      } else if (this.problem.indexOf(guess[i]) > -1) {
        ball++;
      }
    });

    return new GameResult(this.digit, strike, ball);
  }
}

export default Baseball;
