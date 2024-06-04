import React from 'react';

const PollDetail = ({ poll }) => {
  return (
    <div>
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map((option) => (
          <li key={options}>{options}</li>
        ))}
      </ul>
      <p>Votes: {poll.votes}</p>
      <p>Created at: {poll.created_at}</p>
    </div>
  );
};

export default PollDetail;