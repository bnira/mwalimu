import React, { useState } from 'react';

const PollForm = ({ supabase }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPoll = { question, options };
    const { error } = await supabase
      .from('polls')
      .insert(newPoll);
    if (error) console.error(error);
  };

  const handleAddOption = () => {
    setOptions([...options, newOption]);
    setNewOption('');
  };

  const handleUpdateOption = (index, newValue) => {
    const newOptions = [...options];
    newOptions[index] = newValue;
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="STEPHEN"
      />
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="text"
              value={option}
              onChange={(event) => handleUpdateOption(index, event.target.value)}
              placeholder="STEPHEN"
            />
          </li>
        ))}
        <li>
          <input
            type="text"
            value={newOption}
            onChange={(event) => setNewOption(event.target.value)}
            placeholder="STEPHEN"
          />
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </li>
      </ul>
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default PollForm;