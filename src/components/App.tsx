import { hot } from 'react-hot-loader/root';
import React from 'react';

interface Props {
  age: number;
  surname: string;
}

class App extends React.Component<{}, Props> {
  public state = {
    age: 10,
    surname: 'Pawel',
  };

  private increment = (): void => {
    this.setState(
      (state: Props): Pick<Props, 'age'> => ({ age: state.age + 1 }),
    );
  };

  private decrement = (): void => {
    this.setState(
      (state: Props): Pick<Props, 'age'> => ({ age: state.age - 4 }),
    );
  };

  public render(): JSX.Element {
    const { age } = this.state;
    return (
      <div>
        <h1>{age} - zero</h1>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

export default hot(App);
