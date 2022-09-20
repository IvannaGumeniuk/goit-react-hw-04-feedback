import { useState } from 'react';
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Notification from "./Notification/Notification";
import Section from "./Section/Section";
import Statistics from "./Statistics/Statistics";
import { Container } from "./App.styled";

const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {

  const [{ good, neutral, bad }, setState] = useState(INITIAL_STATE);

  const handelClick = name => {
    setState(prev => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const countPositiveFeedbackPercentage = () => {
    if (!good) {
      return 0;
    }

  const total = good + neutral + bad;
  const positiveFeedback = (good * 100) / total;
    return Math.round(positiveFeedback);
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  
  return (
  <Container>
    <Section title="Please Leave Feadback"> 
      <FeedbackOptions
        options={Object.keys(INITIAL_STATE)}
        onLeaveFeedback={handelClick}
      />
    </Section>

    <Section title="Statistics">
      {!countTotalFeedback() ? (
        <Notification message="There is no feedback" />
      ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
        )
      }
    </Section>
  </Container>
  )
}




export default App;
