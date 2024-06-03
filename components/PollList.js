import React, { useState, useEffect } from 'react';

const PollList = ({ supabase }) => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('id, question, options');
      if (error) console.error(error);
      setPolls(data);
    };
    fetchPolls();
  }, []);

  return (
    <ul>
      {polls.map((poll) => (
        <li key={('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeG5na2N5Y2RpbHV3eWJyaG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxMjM4OTQsImV4cCI6MjAzMjY5OTg5NH0.s3CoU5zOuYw7tkaQN3BKRUXiAA0QynIUup1ehi5DXCY')}>
          <h2>{poll.question}</h2>
          <ul>
            {poll.options.map((option) => (
              <li key={options}>{options}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default PollList;